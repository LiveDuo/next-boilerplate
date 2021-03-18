import { NotionRenderer as Renderer } from 'react-notion-x'

import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css' // code highlighting
import 'rc-dropdown/assets/index.css' // collection views
import 'katex/dist/katex.min.css' // rendering equations

const NotionRenderer = ({recordMap}) => {
    return <Renderer recordMap={recordMap} fullPage={true} darkMode={false} className="notion-header-hide" bodyClassName="notion-header-hide"/>
}
export default NotionRenderer
