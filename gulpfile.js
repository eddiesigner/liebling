const { watch, series } = require('gulp')
const GhostAPI = require('@tryghost/admin-api')
const fs = require('fs')

function deploy(cb) {
	console.info("re-building and re-deploying to local instance")
	if (!fs.existsSync('deploy.json')) {
		console.error('You must create a deploy.json (example found in deploy.example.json) for deployment to work.')
	}

	const { API_URL, API_KEY } = JSON.parse(fs.readFileSync('deploy.json'))

	try {
		const api = new GhostAPI({
			url: API_URL,
			key: API_KEY
		})

		return api.themes.upload({
			file: 'liebling.zip'
		});
	} catch (err) {
		console.error(err);
		return;
	}
}

function restartDeploy(cb) {
	console.info("detected file add, deletion: need to restart deploy");
}

const THEME_SRC = [
	'*.hbs',
	'partials/**/*.hbs',
	'assets/**/*',
	'locales/*.json',
	'routes.yaml',
	'src/sass/**/*.scss',
	'src/js/**/*.js'
]

exports.default = function() {
	// Watch for any changes
	watch(THEME_SRC, { events: ['add', 'unlink', 'addDir', 'unlinkDir'] }, series(restartDeploy, deploy))
	watch(THEME_SRC, { events: ['change'] }, deploy)
}
