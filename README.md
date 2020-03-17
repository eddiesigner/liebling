# WonderProxy Blog theme

## Liebling Theme 

[Liebling](https://github.com/eddiesigner/liebling) is the theme we've chosen to build upon since it has a lot of neat features and a slick layout.

## Local development 

### To get set up with Docker, follow these docs:

[Theme development with Docker](https://github.com/eddiesigner/liebling/wiki/Theme-development-with-Docker)

If you're already all set up, you can pop into /src and run:

`npm run docker-watch` 

The blog will be available at `http://localhost:3000`.

## Building a zip to upload to Ghost 

Go to /src directory and build the theme for production by running:

`npm run production`

This command will generate the file liebling.zip in the root of the theme directory. Now you can upload this file to Ghost 😎.