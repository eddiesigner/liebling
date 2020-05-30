## Development Instructions

#### Setting up watch development
The recommended method of watch development is spinning up a Ghost Docker container
using the provided Docker Compose file. Ensure you have Docker Compose installed,
install all dependencies with `npm install`, then launch the environment with 
`npm run docker-watch`. Webpack will watch changes made to the repository and
update the theme (+ refresh your browser) accordingly.

#### Setting up push deployment
You should follow these instructions if you plan to deploy to a live site.
To deploy, ensure that you have a .env setup from .env.example.

You can retrieve values needed for .env easily by going into your Ghost admin panel,
clicking on 'Integrations', and adding a new integration. Copy the Admin API key
and URL values, as these will be used by the deploy script to upload the new theme.

From there, you can launch the `npm run deploy` command, which will zip up a build
of the full theme (including built assets) and push it to the site. You will need to 
activate the theme from the admin panel yourself.
