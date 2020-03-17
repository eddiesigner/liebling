let mix = require('laravel-mix');

mix.webpackConfig({
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: Config.babel()
          }
        ]
      }
    ]
  }
});

mix.js('js/helpers.js', 'js/')
  .js('js/libs/jquery.swiftype.autocomplete.js', 'js/')
  .js('js/libs/jquery.swiftype.search.js', 'js/')
  .js('js/app.js', 'js/')
  .js('js/home.js', 'js/')
  .js('js/post.js', 'js/')
  .js('js/page.js', 'js/')
  .extract()
  .setResourceRoot('/assets')
  .sass('sass/app.scss', 'css/')
  .setPublicPath('../assets')
  .copy('sass/fonts/icomoon/*.*', '../assets/fonts/')
  .copy('js/search/search.js', '../assets/js/')
  .copy('sass/fonts/euclidsquare/*.*', '../assets/fonts/')
  .browserSync({
    proxy: "localhost:2368",
    files: [
      'js/**/*.js',
      'sass/**/*.scss',
      'sass/fonts/*',
      '../**/*.hbs'
    ]
  });