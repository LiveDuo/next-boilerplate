import React from "react";
import Layout from "../components/layout";

import { Heading, Box, Text } from "@chakra-ui/react";

import Seo from "../components/seo";

const company = process.env.NEXT_PUBLIC_COMPANY_NAME || "Company";
const url = process.env.NEXT_PUBLIC_COMPANY_URL || "https://newdomain.com";
const email = process.env.NEXT_PUBLIC_COMPANY_EMAIL || "contact@newdomain.com";

const Section = () => (
  <Box margin="40px 60px 20px 60px">
    <Heading as="h1">Privacy Policy</Heading>
    <br />
    <Text>
      At {company}, accessible from {url}, one of our main priorities is the
      privacy of our visitors. This Privacy Policy document contains types of
      information that is collected and recorded by {company} and how we use it.
    </Text>
    <br />
    <Text>
      If you have additional questions or require more information about our
      Privacy Policy, do not hesitate to contact us through email at
      {email}
    </Text>
    <br />

    <Heading as="h3" size="lg">
      Log Files
    </Heading>
    <br />
    <Text>
      Front follows a standard procedure of using log files. These files log
      visitors when they visit websites. All hosting companies do this and a
      part of hosting services' analytics. The information collected by log
      files include internet protocol (IP) addresses, browser type, Internet
      Service Provider (ISP), date and time stamp, referring/exit pages, and
      possibly the number of clicks. These are not linked to any information
      that is personally identifiable. The purpose of the information is for
      analyzing trends, administering the site, tracking users' movement on the
      website, and gathering demographic information.
    </Text>
    <br />

    <Heading as="h3" size="lg">
      Cookies and Web Beacons
    </Heading>
    <br />
    <Text>
      Like any other website, {company} uses 'cookies'. These cookies are used
      to store information including visitors' preferences, and the pages on the
      website that the visitor accessed or visited. The information is used to
      optimize the users' experience by customizing our web page content based
      on visitors' browser type and/or other information.
    </Text>
    <br />

    <Heading as="h3" size="lg">
      Privacy Policies
    </Heading>
    <br />
    <Text>
      You may consult this list to find the Privacy Policy for each of the
      advertising partners of {company}. Our Privacy Policy was created with the
      help of the Privacy Policy Generator.
    </Text>
    <br />
    <Text>
      Third-party ad servers or ad networks uses technologies like cookies,
      JavaScript, or Web Beacons that are used in their respective
      advertisements and links that appear on {company}, which are sent directly
      to users' browser. They automatically receive your IP address when this
      occurs. These technologies are used to measure the effectiveness of their
      advertising campaigns and/or to personalize the advertising content that
      you see on websites that you visit.
    </Text>
    <br />
    <Text>
      Note that {company} has no access to or control over these cookies that
      are used by third-party advertisers.
    </Text>
    <br />

    <Heading as="h3" size="lg">
      Third Party Privacy Policies
    </Heading>
    <br />
    <Text>
      {company}'s Privacy Policy does not apply to other advertisers or
      websites. Thus, we are advising you to consult the respective Privacy
      Policies of these third-party ad servers for more detailed information. It
      may include their practices and instructions about how to opt-out of
      certain options. You may find a complete list of these Privacy Policies
      and their links here: Privacy Policy Links.
    </Text>
    <br />
    <Text>
      You can choose to disable cookies through your individual browser options.
      To know more detailed information about cookie management with specific
      web browsers, it can be found at the browsers' respective websites. What
      Are Cookies?
    </Text>
    <br />

    <Heading as="h3" size="lg">
      Children's Information
    </Heading>
    <br />
    <Text>
      Another part of our priority is adding protection for children while using
      the internet. We encourage parents and guardians to observe, participate
      in, and/or monitor and guide their online activity.
    </Text>
    <br />
    <Text>
      {company} does not knowingly collect any Personal Identifiable Information
      from children under the age of 13. If you think that your child provided
      this kind of information on our website, we strongly encourage you to
      contact us immediately and we will do our best efforts to promptly remove
      such information from our records.
    </Text>
    <br />

    <Heading as="h3" size="lg">
      Online Privacy Policy Only
    </Heading>
    <br />
    <Text>
      This Privacy Policy applies only to our online activities and is valid for
      visitors to our website with regards to the information that they shared
      and/or collect in {company}. This policy is not applicable to any
      information collected offline or via channels other than this website.
    </Text>
    <br />

    <Heading as="h3" size="lg">
      Consent
    </Heading>
    <br />
    <Text>
      By using our website, you hereby consent to our Privacy Policy and agree
      to its Terms and Conditions.
    </Text>
  </Box>
);

export default function Privacy() {
  return (
    <Layout>
      <Seo title={"Privacy Policy"} />
      <Section />
    </Layout>
  );
}
