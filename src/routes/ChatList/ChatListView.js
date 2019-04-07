import React, { useCallback, useState, useEffect } from 'react'
import { Affix, Button, Modal, Form, Input, List } from 'antd'
import moment from 'moment'
import 'moment/locale/ko'
import './index.less'

import ContentContainer from '../../components/ContentContainer'
import SpinContainer from '../../components/SpinContainer'

const ChatListView = ({
  form,
  chatService,
  user,
  history,
  location,
  headerAction,
  chatList
}) => {
  const [showTitleModal, setShowTitleModal] = useState(false)

  useEffect(() => {
    headerAction.receiveHeader({ title: '채팅방 목록', backPath: null })
  }, [])

  const getDateFormat = useCallback(item => {
    const now = moment()
    const dayDiff = now.diff(item.lastUpdate, 'days')
    if (dayDiff < 1) return 'HH:mm'
    else if (dayDiff < 365) return 'MM-DD'
    else return 'YYYY-MM-DD'
  }, [])

  const onCreateChat = useCallback(() => {
    form.validateFields((err, values) => {
      if (!err) {
        const newChat = {
          title: values.title,
          users: {
            [user.key]: user.profile || true
          },
          lastUpdate: new Date().toISOString()
        }
        chatService.postChat(newChat).then(chat => {
          onClickChat(chat)
        })
      }
    })
  }, [])

  const onClickChat = useCallback(chat => {
    headerAction.receiveBackPath(`${location.pathname}${location.search}`)
    history.push(`/chat/${chat.key}`)
  })

  return (
    <ContentContainer>
      {!chatList && <SpinContainer />}
      {chatList && (
        <List
          className='chat-list'
          locale={{
            emptyText: '채팅방이 없습니다.'
          }}
          style={{
            padding: '0 12px'
          }}
          itemLayout='horizontal'
          dataSource={chatList.slice().reverse()}
          renderItem={item => {
            moment.locale('ko')
            return (
              <List.Item
                actions={[moment(item.lastUpdate).format(getDateFormat(item))]}
                onClick={() => onClickChat(item)}
                style={{ cursor: 'pointer' }}
              >
                <List.Item.Meta
                  title={item.title}
                  description={item.lastMessage}
                />
              </List.Item>
            )
          }}
        />
      )}
      <Affix
        offsetBottom={0}
        // style={{ position: 'absolute', width: '100%', bottom: 0 }}
      >
        <div
          style={{
            padding: 12
          }}
        >
          <Button
            icon='plus'
            block
            type='primary'
            size='large'
            onClick={() => setShowTitleModal(true)}
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
        onOk={onCreateChat}
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
                onPressEnter={onCreateChat}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    </ContentContainer>
  )
}

export default ChatListView
