# MK GATSBY FOR 20210109
another daily gatsby project.


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
* today let's use emotion instead of theme-ui. so install with
    ```
    npm install gatsby-plugin-emotion @emotion/react @emotion/styled
    ```
* then add the plugin to the `gatsby-config`
    ```
    plugins: [`gatsby-plugin-emotion`],
    ```
* then create a sample emotion page (from the [docs here](https://www.gatsbyjs.com/docs/how-to/styling/emotion/))
    ```
    import React from "react"
    import styled from "@emotion/styled"
    import { css } from "@emotion/react"

    const Container = styled.div`
      margin: 3rem auto;
      max-width: 600px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    `

    const UserWrapper = styled.div`
      display: flex;
      align-items: center;
      margin-top: 0;
      margin-right: auto;
      margin-bottom: 12px;
      margin-left: auto;
      &:last-child {
        margin-bottom: 0;
      }
    `

    const Avatar = styled.img`
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: 96px;
      width: 96px;
      height: 96px;
      margin: 0;
    `

    const Description = styled.div`
      flex: 1;
      margin-left: 18px;
      padding: 12px;
    `

    const Username = styled.h2`
      margin: 0 0 12px 0;
      padding: 0;
    `

    const Excerpt = styled.p`
      margin: 0;
    `
    // Using css prop provides a concise and flexible API to style the components. //
    const underline = css`
      text-decoration: underline;
    `

    const User = props => (
      <UserWrapper>
        <Avatar src={props.avatar} alt="" />
        <Description>
          <Username>{props.username}</Username>
          <Excerpt>{props.excerpt}</Excerpt>
        </Description>
      </UserWrapper>
    )

    export default function UsersList() {
      return (
        <Container>
          <h1 css={underline}>About Emotion</h1>
          <p>Emotion is uber cool</p>
          <User
            username="Jane Doe"
            avatar="https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg"
            excerpt="I'm Jane Doe. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
          />
          <User
            username="Bob Smith"
            avatar="https://s3.amazonaws.com/uifaces/faces/twitter/vladarbatov/128.jpg"
            excerpt="I'm Bob smith, a vertically aligned type of guy. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
          />
        </Container>
      )
    }
    ```

today I'm hitting errors with this . . . . uninstalling and doing again:

* this time
```
npm i gatsby-plugin-emotion @emotion/core
```
only? not also `@emotion/react`? why?
in any case. next add `gatsby-plugin-emotion` to list of plugins in `gatsby-config.js` and create a page:
```
import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

const IndexPage = () => (
  <Layout>
    <SEO
      title="Home"
      keywords={[`gatsby`, `application`, `react`]}
    />
    <h1
      css={{
        fontFamily: 'Fantasy'
      }}
    >Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div
      css={{ maxWidth: `300px`, marginBottom: `1.45rem` }}
    >
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;
```
the `css={}` prop just works now.

* now let's try adding in `@emotion/react` again:

```
/** @jsx jsx */
// import React from "react";
import { Link, withAssetPrefix } from "gatsby";
import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import { css, jsx } from '@emotion/react'


const Page3 = () => {
    const color = "white" 
    return (
  <Layout>
    <SEO
      title="Home"
      keywords={[`gatsby`, `application`, `react`]}
    />
    <h1
      css={{
        fontFamily: 'Fantasy'
      }}
    >Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div
        css={css`
        padding: 32px;
        background-color: hotpink;
        font-size: 24px;
        border-radius: 4px;
        &:hover {
            color: ${color};
        }
        `}
    >
    Hover to change color.
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);
    }

export default Page3;
```

works now.

what else? how about `styled`?
```
npm i @emotion/styled
```

THIS is the one that's giving me trouble. Says it can't find `@emotion/styled/base` . . . in `node_modules` I can see `@emotion/styled-base`, but this is supposed deprecated in favor of `@emotion/styled/base` . . . haven't found anyone else with this problem though.

So sometimes let's just do this.



### NEXT

the above is basically the most solid step by step log I have. Tomorrow let's start with this so that I don't have to retype (maybe just edit while waiting for any long installations).


* add pages for content
* add theme-ui back in
* add base style (even just reset) to body
* create ideal mdx provider (with style and key components)
* create a grid, columns and stick-divs
* log all steps
* use useContext again while it's fresh (to pick colors of div elements or keyboard keys)
* connect to Airtable
* write a "color contrast" resource with that Gatsby shot and some waveform and vectorscope images
* make that the starter resource

### THEME UI FOR LATER

* install [gatsby-plugin-theme-ui](https://www.gatsbyjs.com/plugins/gatsby-plugin-theme-ui/?=theme-ui) 
    ```
    npm i theme-ui gatsby-plugin-theme-ui @theme-ui/presets
    ```
    or just tailwind with

    ```
    npm i @theme-ui/preset-tailwind
    ```
* then add it to `gatsby-config.js`
    ```
    plugins: ['gatsby-plugin-theme-ui'],
    ```
    or

    ```
    {
      resolve: `gatsby-plugin-theme-ui`,
      options: {
        preset: "@theme-ui/preset-tailwind",
      },
    },
    ```
* make the shadow dir
```
mkdir src/gatsby-plugin-theme-ui
```
and add index
```
echo "export default {}" > src/gatsby-plugin-theme-ui/index.js
```


## LINKS
* [react hooks article](https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext)
* [typescript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)



next = google fonts: https://www.gatsbyjs.com/plugins/gatsby-plugin-google-fonts/
