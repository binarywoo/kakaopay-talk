import SweetScroll from 'sweet-scroll'
import { message } from 'antd'

export default () => {
  const scroller = new SweetScroll({ quickMode: false, duration: 500 })
  window.scroller = scroller

  message.config({
    top: 100
  })
}
