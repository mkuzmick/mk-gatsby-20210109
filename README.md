# MK GATSBY FOR 20210109
another daily gatsby project. Today let's
* add emotion/styled instead of styled-components
* create a grid, columns and stick-divs
* log all steps
* use useContext again while it's fresh (to pick colors of div elements or keyboard keys)
* connect to Airtable
* write a "color contrast" resource with that Gatsby shot and some waveform and vectorscope images
* make that the starter resource


## STEPS
to create this repository.

* we now have the initial build and github repo going with a script like so
    ```
    #! /usr/bin/env zsh

    PROJECT_NAME=$1
    gatsby new $PROJECT_NAME $2
    DATA_STRING="{\"name\":\"$PROJECT_NAME\",\"private\":false}"
    curl -u "mkuzmick:$GITHUB_TOKEN" https://api.github.com/user/repos -d $DATA_STRING
    code $PROJECT_NAME
    cd $PROJECT_NAME
    git remote add origin "https://github.com/mkuzmick/$PROJECT_NAME.git"
    git branch -M main
    git push -u origin main
    open -a "Firefox Developer Edition" "http://localhost:8000"
    open -a "Firefox Developer Edition" "http://localhost:8000/___graphql"
    gatsby develop
    ```
* install all the markdown and mdx plugins: [gatsby-transformer-remark](https://www.gatsbyjs.com/plugins/gatsby-transformer-remark/?=gatsby%20transformer%20remark), [gatsby-remark-images](https://www.gatsbyjs.com/plugins/gatsby-remark-images/?=remark%20images) and [gatsby-plugin-mdx](https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/?=mdx):
    ```
    npm install gatsby-transformer-remark
    npm install gatsby-remark-images gatsby-plugin-sharp
    npm install gatsby-plugin-mdx @mdx-js/mdx @mdx-js/react
    ```
* in `gatsby-config.js`, hook the `gatsby-transformer-remark` plugin up and add the `gatsby-remark-images` plugin to it 
    ```
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
            },
          },
        ],
      },
    },
    ```
* If you want something other than the simplest of mdx layouts, start by creating a simple `mdx-layout.js` file for now that you'll link to in the config file. Let's imagine that for this project we want two layouts, one for "Resources" that will live in `content/resources` and one for other `.mdx` files that live elsewhere in the content folder or in the `src/pages` folder. In `src/components/mdx/mdx-resource-layout.js` add this simple code.
    ```
    import React from 'react';

    export default ({ children }) => (
        <div>
          <h1>My Resource Layout</h1>
          <div>{children}</div>
        </div>
      )
    ```
* then add the `gatsby-plugin-mdx` code to your `gatsby-config.js`, specifying the layouts for `resources` and for :
    ```
    {
          resolve: `gatsby-plugin-mdx`,
          options: {
            defaultLayouts: {
              default: require.resolve("./src/components/mdx/mdx-layout.js"),
            },
            gatsbyRemarkPlugins: [
              {
                resolve: `gatsby-remark-images`,
                options: {
                  maxWidth: 960,
                },
              },
            ],
          },
        },
    ```

* create the content folders (moving images from `src/images` to `content/images`) and initial files (if you don't want to just use the `src/pages` folder for all your mdx)
    ```
    mkdir content content/resources
    mv src/images content/images
    curl -o content/images/gatsby.jpg "https://i.guim.co.uk/img/media/cc5ff87a032ce6e4144e63a2a1cbe476dbc7cd5a/273_0_3253_1952/master/3253.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=d8da5fd430d3983dc50543a44b3979d4"
    echo "# MDX RESOURCE\ncontent goes here\n\![Gatsby](../images/gatsby.jpg)" > content/resources/sample-resource.mdx
    echo "# MDX PAGE\ncontent goes here\n\![Gatsby](../../content/images/gatsby.jpg)" > src/pages/sample-mdx-page.mdx
    ```
* then in the `gatsby-config.js` let's connect the `gatsby-source-filesystem` plugin to these new folders for mdx posts and images. We'll delete or modify the current `gatsby-source-filesystem` element, and instead have these two:
```
{
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `resources`,
        path: `${__dirname}/content/resources`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/content/images`,
      },
    },
```
* install [gatsby-plugin-theme-ui](https://www.gatsbyjs.com/plugins/gatsby-plugin-theme-ui/?=theme-ui) 
```
npm i theme-ui gatsby-plugin-theme-ui
```
* then add it to `gatsby-config.js`
```
plugins: ['gatsby-plugin-theme-ui'],
```



## LINKS
* [react hooks article](https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext)
* [typescript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)



