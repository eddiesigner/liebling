const mix = require('laravel-mix');

mix.options({
  terser: {
    extractComments: false,
  }
});

mix
  .setPublicPath('../assets')
  .js('js/helpers.js', 'js/')
  .js('js/app.js', 'js/')
  .js('js/home.js', 'js/')
  .js('js/post.js', 'js/')
  .js('js/page.js', 'js/')
  .extract()
  .sass('sass/app.scss', 'css/')
  .sass('sass/home.scss', 'css/')
  .sass('sass/listing.scss', 'css/')
  .sass('sass/post.scss', 'css/')
  .sass('sass/newsletter.scss', 'css/')
  .sass('sass/tags.scss', 'css/')
  .sass('sass/404.scss', 'css/')
  .options({
    processCssUrls: false
  })
  .browserSync({
    proxy: 'localhost:2368',
    files: [
      '../assets/js/**/*.js',
      '../assets/css/**/*.css',
      '../**/*.hbs'
    ]
  })
  .copyDirectory('sass/fonts/source-sans-pro/', '../assets/fonts/source-sans-pro/')
  .copy('sass/fonts/icomoon/*.*', '../assets/fonts/icomoon/');
