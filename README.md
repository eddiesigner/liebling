# nrdliebling

`nrdliebling` is my personal fork of [eddiesigner's liebling theme](https://github.com/eddiesigner/liebling/releases). My version of the theme offers some granular adjustments to meet my personal preferences, as well as a better photography-portfolio section to work in conjunction with my own writings.



## Development
*Steps to set up development environment.*

### WSL2
1. Clone theme repo: 

	`git clone https://github.com/nathanrdodson/nrdliebling.git`


2. In a separate directory: 

	`mkdir ghost-dev && cd ghost-dev`

3. Make sure Ghost is installed and up-to-date, 

	`[sudo] npm install ghost-cli@latest`

4. *Within `ghost-dev/`* -- 

	`ghost install local`

5. *Note:* Must have `unzip` installed
```
wget https://go.nrdnas.net/web/client/pubshares/qt7wmNFn5WaVy45akg2vxS && \
unzip qt7wmNFn5WaVy45akg2vxS && \
mv .permalinks/ghost_images_sample.v5.62/* ./content/images/ && \
mv .permalinks/ghost_posts_sample.v5.62.json . && \
rm -r .permalinks qt7wmNFn5WaVy45akg2vxS
```

6. Enable nrdliebling theme within the ghost environment

	`ln -s ../../../nrdliebling content/themes/nrdliebling`

7. Restart ghost

	`ghost restart`
