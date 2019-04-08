import { Modal } from 'antd'

export default ({ title, content, okText = '예', cancelText = '아니오', onOk }) => {
  return Modal.confirm({
    title, content, okText, cancelText, onOk
  })
}
