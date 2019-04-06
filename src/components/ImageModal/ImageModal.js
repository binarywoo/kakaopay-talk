import React from 'react'
import { Modal } from 'antd'
import { isScreenSize } from '../../libs/commonUtils'

const MyComponent = ({ title, visible, img, onClose, alt }) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onClose}
      bodyStyle={{
        width: '100%',
        maxWidth: 800
      }}
      footer={null}
      width={isScreenSize.smallerThan(800) ? '100%' : 800}
      centered
    >
      <img src={img} alt={alt} style={{ width: '100%' }} />
    </Modal>
  )
}

export default MyComponent
