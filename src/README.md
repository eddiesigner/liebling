## Development Instructions

#### Setting up watch development
The recommended method of watch development is spinning up a Ghost Docker container
using the provided Docker Compose file. Ensure you have Docker Compose installed,
install all dependencies with `npm install`, then launch the environment with 
`npm run docker-watch`. Webpack will watch changes made to the repository and
update the theme (+ refresh your browser) accordingly.

#### Setting up watch development **Without Docker**
0. Install [NodeJS](https://nodejs.org/en/download/)
1. Install Ghost's CLI `npm install -g ghost-cli@latest` (Windows) or `sudo npm install -g ghost-cli@latest`
2. Verify Ghost's installation by running `ghost --version`
3. Install BrowserSync `npm install -g browser-sync`
4. Verify BrowserSync's installation by running `browser-sync --version`
5. Create an empty directory for Ghost
6. cd into the empty directory
7. Run `ghost install local --no-start`
8. From within the Ghost directory `cd content/themes/`
9. Clone this repository inside of the themes folder
10. `cd ieee-ghost/src`
11. Run `npm install`
12. cd out into the Ghost directory
13. Run `ghost start --development`
14. From the ghost directory, `cd contents/themes/ieee-ghost/src/`
15. Run `npm run watch`
16. Follow the procedures to [Selecting Theme](#selecting-theme) (ieee-ghost)
17. Follow the procedures to [Importing Content](#importing-content)

#### Selecting Theme
1. Head to your local Ghost Admin portal (usually found at [http://localhost:2368/ghost](http://localhost:2368/ghost))
2. Go to `Design`, scroll down, and activate `ieee-ghost`

#### Importing Content
1. Head to the Ghost Admin portal on IEEE
2. Go to `Labs -> Export Content` and click on `Export` (This will save a JSON file)
3. Head to your local Ghost Admin portal (usually found at [http://localhost:2368/ghost](http://localhost:2368/ghost))
4. Go to `Labs -> Import Content` and import your JSON file

*Note: Images do not get transfered*

#### Setting up push deployment
You should follow these instructions if you plan to deploy to a live site.
To deploy, ensure that you have a .env setup from .env.example.

You can retrieve values needed for .env easily by going into your Ghost admin panel,
clicking on 'Integrations', and adding a new integration. Copy the Admin API key
and URL values, as these will be used by the deploy script to upload the new theme.

From there, you can launch the `npm run deploy` command, which will zip up a build
of the full theme (including built assets) and push it to the site. You will need to 
activate the theme from the admin panel yourself.
