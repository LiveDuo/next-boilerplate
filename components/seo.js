import React from "react";

import Head from "next/head";

import { TagManager, GoogleAnalytics, FullStory } from "../config/track";

const twitterUsername = process.env.NEXT_PUBLIC_TWITTER_USERNAME || null;

const Layout = ({ title, description, image, ganalytics = true, fullstory = true }) => (
  <>
    <Head>
      <title>{title}</title>
      {image && <meta name="image" content={image} />}
      {description && <meta name="description" content={description} />}
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/favicon.ico" />

      <meta property="og:title" content={title} />
			{description && <meta property="og:description" content={description} />}
			{image && <meta property="og:image" content={image} />}
			<meta name="twitter:card" content="summary_large_image" />
			{twitterUsername && <meta name="twitter:creator" content={twitterUsername} />}
			<meta name="twitter:title" content={title} />
			{description && <meta name="twitter:description" content={description} />}
			{image && <meta name="twitter:image" content={image} />}
    </Head>
    {ganalytics && <TagManager />}
    {ganalytics && <GoogleAnalytics />}
    {fullstory && <FullStory />}
  </>
);

export default Layout;
