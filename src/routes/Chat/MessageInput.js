import React, { useCallback } from 'react'
import {
  Avatar,
  Upload,
  Row,
  Col,
  Input,
  Icon,
  message as antdMessage
} from 'antd'
import classNames from 'classnames'
import MessageModal from '../../components/MessageModal/index'

const MessageInput = ({
  message,
  onChange,
  onSendMessage,
  onClickInvitation,
  sendImageMessage,
  showHiddenMenu,
  setShowHiddenMenu
}) => {
  const beforeImageUpload = useCallback(file => {
    setShowHiddenMenu(false)
    const hide = antdMessage.loading('이미지 업로드 중..', 0)
    sendImageMessage(file).then(() => hide())
    return false
  }, [])

  const onClickNotReady = useCallback(() => {
    MessageModal({
      type: 'info',
      title: '준비중',
      content: '준비중인 기능입니다.'
    })
  }, [])

  return (
    <div className='chat-input-wrapper' offsetBottom={0}>
      <div
        style={{
          padding: 12,
          backgroundColor: '#fff',
          borderTop: '1px solid #bbbbbb'
        }}
      >
        <Input.Search
          value={message}
          onChange={onChange}
          addonBefore={
            <Icon
              type={showHiddenMenu ? 'minus' : 'plus'}
              onClick={() => setShowHiddenMenu(!showHiddenMenu)}
            />
          }
          enterButton={<Icon type='arrow-up' />}
          onSearch={message.length > 0 ? onSendMessage : null}
        />
      </div>
      <div
        className={classNames(
          'hidden-menu',
          showHiddenMenu ? 'show' : 'hidden'
        )}
      >
        <Row gutter={12}>
          <Col span={6}>
            <Avatar
              className='invitation'
              icon='user-add'
              onClick={onClickInvitation}
            />
            초대
          </Col>
          <Col span={6}>
            <Upload
              key='picture'
              accept='image/*'
              beforeUpload={beforeImageUpload}
            >
              <Avatar className='image' icon='picture' />
              이미지
            </Upload>
          </Col>
          <Col span={6}>
            <Avatar className='pay' icon='wallet' onClick={onClickNotReady} />
            송금
          </Col>
          <Col span={6}>
            <Avatar
              className='map'
              icon='environment'
              onClick={onClickNotReady}
            />
            지도
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default MessageInput
