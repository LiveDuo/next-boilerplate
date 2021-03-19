import NLink from "next/link";

import { Heading, Text } from "@chakra-ui/react";

import Layout from "../components/layout";

import Seo from "../components/seo";

import cover from "../public/cover.jpg"

export default function IndexPage() {
  return (
    <Layout>
      <Seo title={"Landing Page"} description={"Landing Page Description"} image={cover}/>
      <Heading>Landing</Heading>
      <Text>Welcome to your new Next site</Text>
      <NLink href="/app">App Link</NLink>
    </Layout>
  );
}
