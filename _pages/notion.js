import Layout from "../components/layout";

import Seo from "../components/seo";
import NotionRenderer from '../components/notion';

import { getNotionStaticProps } from '../config/notion';

export const getStaticProps = async () => getNotionStaticProps('Niche-traffic-for-free-09613c1721e6487e8374befe862a2c95')

export default function IndexPage({recordMap}) {
  return (
    <Layout>
      <Seo title={"Landing Page"} description={"Landing Page Description"}/>
      <NotionRenderer recordMap={recordMap}/>
    </Layout>
  );
}
