import React from "react";

import Head from "next/head";

import { TagManager, GoogleAnalytics, FullStory } from "../config/track";

const Layout = ({ title, ganalytics = true, fullstory = true }) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
    {ganalytics && <TagManager />}
    {ganalytics && <GoogleAnalytics />}
    {fullstory && <FullStory />}
  </>
);

export default Layout;
