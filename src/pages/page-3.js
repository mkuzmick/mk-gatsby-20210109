/** @jsx jsx */
// import React from "react";
import { Link, withAssetPrefix } from "gatsby";
import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'

const Button = ({children}) => (
  <button css={{
    padding: "32px",
    backgroundColor: "hotpink",
    "font-size": "48px",
    borderRadius: "4px",
    color: "black",
    fontWeight: "bold",
    '&:hover, &:focus': {
      color: 'white'
    }
  }}>
    {children}
  </button>

)

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
    <p>let's try a styled one</p>
    <div>
      <Button>This is my styled button</Button>
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);
    }

export default Page3;