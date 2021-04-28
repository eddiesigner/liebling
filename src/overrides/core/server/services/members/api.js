const settingsCache = require('../settings/cache');
const MembersApi = require('@tryghost/members-api');
const logging = require('../../../shared/logging');
const mail = require('../mail');
const models = require('../../models');
const signinEmail = require('./emails/signin');
const signupEmail = require('./emails/signup');
const subscribeEmail = require('./emails/subscribe');
const updateEmail = require('./emails/updateEmail');
const SingleUseTokenProvider = require('./SingleUseTokenProvider');
const urlUtils = require('../../../shared/url-utils');

const MAGIC_LINK_TOKEN_VALIDITY = 24 * 60 * 60 * 1000;

const ghostMailer = new mail.GhostMailer();

module.exports = createApiInstance;

function createApiInstance(config) {
    const membersApiInstance = MembersApi({
        tokenConfig: config.getTokenConfig(),
        auth: {
            getSigninURL: config.getSigninURL.bind(config),
            allowSelfSignup: config.getAllowSelfSignup(),
            tokenProvider: new SingleUseTokenProvider(models.SingleUseToken, MAGIC_LINK_TOKEN_VALIDITY)
        },
        mail: {
            transporter: {
                sendMail(message) {
                    if (process.env.NODE_ENV !== 'production') {
                        logging.warn(message.text);
                    }
                    let msg = Object.assign({
                        from: config.getAuthEmailFromAddress(),
                        subject: 'Signin',
                        forceTextContent: true
                    }, message);

                    return ghostMailer.send(msg);
                }
            },
            getSubject(type) {
                const siteTitle = settingsCache.get('title');
                switch (type) {
                case 'subscribe':
                    return `Confirma tu suscripción a la Newsletter de Henry 🚀`;
                case 'signup':
                    return `Complete your sign up to ${siteTitle}! 🚀`;
                case 'updateEmail':
                    return `Confirm your email update for ${siteTitle}! 🚀`;
                case 'signin':
                default:
                    return `Inicie sesión de forma segura en ${siteTitle} 🚀`;
                }
            },
            getText(url, type, email) {
                const siteTitle = settingsCache.get('title');
                const nameUser = email.split("@", 1);
                switch (type) {
                case 'subscribe':
                    return `
                        Hola, ${nameUser},

                        Estás a un paso de suscribirte a la Newsletter de Henry. Por favor, confirma tu correo en el siguiente link:

                        ${url}

                        Por tu seguridad, el link expirará en las próximas 24 horas.

                        Un abrazo
                        Equipo Henry

                        ---

                        Enviado a ${email}
                        Si no hiciste este pedido, puedes simplemente ignorar este mensaje. No estarás suscripto.
                        `;
                case 'signup':
                    return `
                        Hey there!

                        Thanks for signing up for ${siteTitle} — use this link to complete the sign up process and be automatically signed in:

                        ${url}

                        For your security, the link will expire in 24 hours time.

                        See you soon!
                        The team at ${siteTitle}

                        ---

                        Sent to ${email}
                        If you did not make this request, you can simply delete this message. You will not be signed up, and no account will be created for you.
                        `;
                case 'updateEmail':
                    return `
                            Hey there,

                            Please confirm your email address with this link:

                            ${url}

                            For your security, the link will expire in 24 hours time.

                            ---

                            Sent to ${email}
                            If you did not make this request, you can simply delete this message. This email address will not be used.
                            `;
                case 'signin':
                default:
                    return `
                        Hola, ${nameUser},

                        ¡Bienvenido de nuevo! Utilizá este enlace para iniciar sesión de forma segura en tu cuenta de ${siteTitle}:

                        ${url}

                        Por tu seguridad, el link expirará en las próximas 24 horas.

                        Un abrazo
                        Equipo Henry


                        ---

                        Enviado a ${email}
                        Si no hiciste este pedido, puedes simplemente ignorar este mensaje.
                        `;
                }
            },
            getHTML(url, type, email) {
                const siteTitle = settingsCache.get('title');
                const siteUrl = urlUtils.urlFor('home', true);
                const domain = urlUtils.urlFor('home', true).match(new RegExp('^https?://([^/:?#]+)(?:[/:?#]|$)', 'i'));
                const siteDomain = (domain && domain[1]);
                const accentColor = settingsCache.get('accent_color');
                const nameUser = email.split("@", 1);
                switch (type) {
                case 'subscribe':
                    return subscribeEmail({url, email, siteTitle, accentColor, siteDomain, siteUrl, nameUser});
                case 'signup':
                    return signupEmail({url, email, siteTitle, accentColor, siteDomain, siteUrl, nameUser});
                case 'updateEmail':
                    return updateEmail({url, email, siteTitle, accentColor, siteDomain, siteUrl, nameUser});
                case 'signin':
                default:
                    return signinEmail({url, email, siteTitle, accentColor, siteDomain, siteUrl, nameUser});
                }
            }
        },
        paymentConfig: {
            stripe: config.getStripePaymentConfig()
        },
        models: {
            /**
             * Settings do not have their own models, so we wrap the webhook in a "fake" model
             */
            StripeWebhook: {
                async upsert(data, options) {
                    const settings = [{
                        key: 'members_stripe_webhook_id',
                        value: data.webhook_id
                    }, {
                        key: 'members_stripe_webhook_secret',
                        value: data.secret
                    }];
                    await models.Settings.edit(settings, options);
                }
            },
            StripeCustomer: models.MemberStripeCustomer,
            StripeCustomerSubscription: models.StripeCustomerSubscription,
            Member: models.Member,
            MemberSubscribeEvent: models.MemberSubscribeEvent,
            MemberPaidSubscriptionEvent: models.MemberPaidSubscriptionEvent,
            MemberLoginEvent: models.MemberLoginEvent,
            MemberEmailChangeEvent: models.MemberEmailChangeEvent,
            MemberPaymentEvent: models.MemberPaymentEvent,
            MemberStatusEvent: models.MemberStatusEvent,
            StripeProduct: models.StripeProduct,
            StripePrice: models.StripePrice,
            Product: models.Product
        },
        logger: logging
    });

    return membersApiInstance;
}
