import React, { useCallback, useState, useEffect } from 'react'
import { Affix, Button, Modal, Form, Input } from 'antd'
import 'moment/locale/ko'
import './index.less'

import ContentContainer from '../../components/ContentContainer'
import SpinContainer from '../../components/SpinContainer'
import ChatList from './ChatList'

const ChatListView = ({ form, user, chatList, createChat, goToChat }) => {
  const [showTitleModal, setShowTitleModal] = useState(false)

  useEffect(() => {
    window.quickScroller.to(0)
  }, [])

  const openChatTitleModal = useCallback(() => {
    setShowTitleModal(true)
    setTimeout(() => document.getElementById('title').focus())
  }, [])

  const handleOnCreateChat = useCallback(() => {
    form.validateFields((err, values) => {
      if (!err) {
        const newChat = {
          title: values.title,
          users: {
            [user.key]: user.userId
          },
          lastUpdate: new Date().toISOString()
        }
        createChat(newChat)
      }
    })
  }, [])

  return (
    <ContentContainer>
      {!chatList && <SpinContainer />}
      {chatList && <ChatList list={chatList} goToChat={goToChat} user={user} />}
      <Affix offsetBottom={0}>
        <div
          style={{
            padding: 12,
            background: '#fff',
            borderTop: '1px solid #dddddd'
          }}
        >
          <Button
            icon='plus'
            block
            type='primary'
            size='large'
            onClick={openChatTitleModal}
          >
            채팅방 만들기
          </Button>
        </div>
      </Affix>
      <Modal
        title='채팅방 제목을 입력해주세요.'
        visible={showTitleModal}
        onCancel={() => setShowTitleModal(false)}
        okText='만들기'
        cancelText='취소'
        onOk={handleOnCreateChat}
      >
        <Form>
          <Form.Item>
            {form.getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '제목을 입력해주세요.'
                },
                {
                  min: 1,
                  max: 20,
                  message: '1~20자리의 제목을 입력해주세요.'
                }
              ]
            })(
              <Input
                addonAfter={`${
                  form.getFieldValue('title')
                    ? form.getFieldValue('title').length
                    : 0
                }/20`}
                onPressEnter={handleOnCreateChat}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    </ContentContainer>
  )
}

export default ChatListView
