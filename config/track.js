import axios from "../config/http";

import { Route } from "react-router-dom";

import Head from "next/head";

const ganalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;  // UA-xxxxxxxx-xx or G-xxxxxxxxxx
const fullstoryId = process.env.NEXT_PUBLIC_FULL_STORY_ID; // xxxxxx

const identify = async (token) => {
  try {
    const { userId } = JSON.parse(atob(token.split(".")[1]));
    const { data } = await axios.get(`/api/auth/user`);
    if (window.FS) {
      window.FS.identify(userId, {
        displayName: `${data.name} ${data.surname}`,
        email: data.email
      });
    }

    if (window.gtag) {
      window.gtag("config", "GA_MEASUREMENT_ID", {
        user_id: userId
      });
    }
  } catch (e) {}
};
export { identify };

const pageView = () => {
  try {
    if (typeof window.gtag === "function") {
      window.gtag("config", ganalyticsId, {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    }
  } catch (e) {}
};

const RouterAnalytics = () => (
  <Route
    path="/"
    render={() => {
      pageView();
      return null;
    }}
  />
);
export { RouterAnalytics };

const ganalyticsSrc = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  
  gtag('config', '${ganalyticsId}');
`;

const GoogleAnalytics = () => (
  <Head>
    <script dangerouslySetInnerHTML={{ __html: ganalyticsSrc }} />
  </Head>
);
export { GoogleAnalytics };

const TagManager = () => (
  <Head>
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${ganalyticsId}`}
    />
  </Head>
);
export { TagManager };

const fullstorySrc = `
window['_fs_debug'] = false;
window['_fs_host'] = 'fullstory.com';
window['_fs_script'] = 'edge.fullstory.com/s/fs.js';
window['_fs_org'] = '${fullstoryId}';
window['_fs_namespace'] = 'FS';
(function(m,n,e,t,l,o,g,y){
  if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
  g=m[e]=function(a,b,s){g.q?g.q.push([a,b,s]):g._api(a,b,s);};g.q=[];
  o=n.createElement(t);o.async=1;o.crossOrigin='anonymous';o.src='https://'+_fs_script;
  y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
  g.identify=function(i,v,s){g(l,{uid:i},s);if(v)g(l,v,s)};g.setUserVars=function(v,s){g(l,v,s)};g.event=function(i,v,s){g('event',{n:i,p:v},s)};
  g.anonymize=function(){g.identify(!!0)};
  g.shutdown=function(){g("rec",!1)};g.restart=function(){g("rec",!0)};
  g.log = function(a,b){g("log",[a,b])};
  g.consent=function(a){g("consent",!arguments.length||a)};
  g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
  g.clearUserCookie=function(){};
  g.setVars=function(n, p){g('setVars',[n,p]);};
  g._w={};y='XMLHttpRequest';g._w[y]=m[y];y='fetch';g._w[y]=m[y];
  if(m[y])m[y]=function(){return g._w[y].apply(this,arguments)};
  g._v="1.3.0";
})(window,document,window['_fs_namespace'],'script','user');
`;

const FullStory = () => (
  <Head>
    <script dangerouslySetInnerHTML={{ __html: fullstorySrc }} />
  </Head>
);
export { FullStory };
