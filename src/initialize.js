import SweetScroll from 'sweet-scroll'
import { message } from 'antd'

export default () => {
  const scroller = new SweetScroll({ quickMode: false, duration: 500 })
  const quickScroller = new SweetScroll({ quickMode: true, duration: 0 })
  window.scroller = scroller
  window.quickScroller = quickScroller

  message.config({
    top: 80
  })
}
