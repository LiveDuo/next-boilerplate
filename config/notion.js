import { NotionAPI } from 'notion-client'

const notion = new NotionAPI()

const getNotionStaticProps = async (pageId) => {
  const recordMap = await notion.getPage(pageId)
  return { props: { recordMap }, revalidate: 10 }
}
export { getNotionStaticProps }
