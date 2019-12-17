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
  .js('js/app.js', 'js/')
  .js('js/home.js', 'js/')
  .js('js/post.js', 'js/')
  .js('js/page.js', 'js/')
  .extract()
  .setResourceRoot('/assets')
  .setPublicPath('../assets')
  .sass('sass/app.scss', 'css/')
  .options({
    processCssUrls: false
  })
  .copy('sass/fonts/icomoon/*.*', '../assets/fonts/')
  .browserSync({
    proxy: "localhost:2368",
    files: [
      'js/**/*.js',
      'sass/**/*.scss',
      '../**/*.hbs'
    ]
  });