import React, { useEffect, useState, useCallback } from 'react'
import {
  Alert,
  Upload,
  Affix,
  Input,
  Icon,
  Modal,
  List,
  Divider,
  message as antdMessage,
  Avatar
} from 'antd'
import classNames from 'classnames'
import moment from 'moment'

import { convertSnapshotToArr } from '../../libs/daoUtils'
import ContentContainer from '../../components/ContentContainer/index'
import './index.less'
import MessageImage from '../../components/MessageImage'
import SpinContainer from '../../components/SpinContainer'
import { scrollToBottom } from '../../libs/chatAppUtils'

const ChatView = ({
  firebase,
  subscribeAction,
  match,
  messages,
  chat,
  viewAction,
  chatService,
  headerAction,
  messageService,
  user,
  header,
  storage,
  userService,
  invitationService,
  history
}) => {
  const [message, setMessage] = useState('')
  const [showUserSearchModal, setShowUserSearchModal] = useState(false)
  const [userList, setUserList] = useState(null)

  useEffect(() => {
    const chatKey = match.params.key

    chatService.getChat(chatKey).then(chat => {
      if (!chat) return history.push('/404')
      viewAction.receiveView('chat', chat)
      if (!chat.users[user.key]) {
        chatService.participateChat(chatKey, user.key)
      }
      headerAction.receiveHeader({
        title: chat.title,
        backPath: header.backPath || '/chat-list'
      })
    })

    firebase
      .database()
      .ref(`messages/${chatKey}`)
      .on('value', snapshot => {
        subscribeAction.receiveSubscribe(
          'messages',
          convertSnapshotToArr(snapshot)
        )
      })

    scrollToBottom()
    return () => {
      subscribeAction.clearSubscribe('messages')
    }
  }, [match.params.key])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const onSendMessage = useCallback(() => {
    const newMessage = {
      content: message,
      type: 'text',
      user: user.key,
      userId: user.userId,
      lastUpdate: new Date().toISOString(),
      profileImage: user.profileImage || null
    }
    messageService.postMessage(chat.key, newMessage)
    setMessage('')
  }, [message])

  const onClickInvitation = useCallback(() => {
    userService.getAllUser().then(userList => {
      setUserList(userList)
    })
    setShowUserSearchModal(true)
  }, [userList])

  const beforeImageUpload = useCallback(
    file => {
      const hide = antdMessage.loading('이미지 업로드 중..', 0)
      storage
        .upload('messageImage', file)
        .then(res => {
          const path = res.metadata.fullPath
          return storage.getDownloadUrl(path)
        })
        .then(url => {
          const newMessage = {
            content: url,
            type: 'image',
            user: user.key,
            userId: user.userId,
            lastUpdate: new Date().toISOString()
          }
          messageService.postMessage(chat.key, newMessage)
          hide()
        })
      return false
    },
    [chat]
  )

  const onClickUser = useCallback(
    userToInvite => {
      const newInvitation = {
        from: user.key,
        fromId: user.userId,
        to: userToInvite.key,
        toId: userToInvite.userId,
        chat: chat.key,
        chatTitle: chat.title,
        lastupdate: new Date().toISOString()
      }
      invitationService.postInvitation(newInvitation).then(() => {
        Modal.success({
          title: '초대 성공',
          content: `${userToInvite.userId}님께 초대메시지를 보냈습니다.`,
          okText: '확인',
          onOk: () => {
            setShowUserSearchModal(false)
          }
        })
      })
    },
    [userList]
  )

  return (
    <ContentContainer
      style={{ background: user.backgroundColor || 'rgb(18, 115, 222)' }}
    >
      <div style={{ padding: '12px 12px 68px 12px' }}>
        {messages &&
          messages.map((item, idx) => {
            const isMyMessage = user.key === item.user
            const time = moment(item.lastUpdate).format('HH:mm')
            const prevMessage = idx > 0 ? messages[idx - 1] : null
            const prevDate = prevMessage
              ? moment(prevMessage.lastUpdate).format('YYYY-MM-DD')
              : null
            const date = moment(item.lastUpdate).format('YYYY-MM-DD')
            const nextMessage =
              idx < messages.length - 1 ? messages[idx + 1] : null
            const nextTime = nextMessage
              ? moment(nextMessage.lastUpdate).format('HH:mm')
              : null
            const nextUserId =
              idx < messages.length - 1 ? nextMessage.userId : null

            let showTag = true
            let showDivider = false
            if (nextTime === time && nextUserId === item.userId) showTag = false
            if (prevDate !== date) showDivider = true
            return (
              <div
                key={item.key}
                className={classNames(
                  'message-row',
                  isMyMessage ? 'my-message' : 'other-message'
                )}
              >
                {showDivider && (
                  <Divider className='date-divider'>{date}</Divider>
                )}
                {!isMyMessage && (
                  <Avatar
                    src={item.profileImage}
                    icon={!item.profileImage ? 'user' : null}
                    style={{ marginRight: 5, position: 'absolute' }}
                  />
                )}
                <Alert
                  className={classNames(
                    'message-box',
                    isMyMessage ? 'my-message' : 'other-message'
                  )}
                  message={
                    item.type === 'image' ? (
                      <MessageImage src={item.content} storage={storage} />
                    ) : (
                      item.content
                    )
                  }
                />
                {showTag && (
                  <div className='message-tag'>
                    <span className='fw-700'>{item.userId} · </span>
                    {time}
                  </div>
                )}
              </div>
            )
          })}
      </div>
      <Affix className='chat-input-wrapper' offsetBottom={0}>
        <div
          style={{
            padding: 12,
            backgroundColor: '#fff',
            borderTop: '1px solid #bbbbbb'
          }}
        >
          <Input.Search
            value={message}
            onChange={e => setMessage(e.target.value)}
            addonBefore={[
              <Icon
                key='invitation'
                type='user-add'
                style={{ marginRight: 18, cursor: 'pointer' }}
                onClick={onClickInvitation}
              />,
              <Upload
                key='picture'
                accept='image/*'
                beforeUpload={beforeImageUpload}
              >
                <Icon type='picture' />
              </Upload>
            ]}
            enterButton={<Icon type='arrow-up' />}
            onSearch={message.length > 0 ? onSendMessage : null}
          />
        </div>
      </Affix>
      <Modal
        visible={showUserSearchModal}
        title='대화상대 초대'
        footer={null}
        onCancel={() => setShowUserSearchModal(false)}
      >
        {!userList && <SpinContainer height='30vh' />}
        {userList && (
          <List
            style={{
              padding: '0 12px'
            }}
            itemLayout='horizontal'
            dataSource={userList.filter(
              item => item.key !== user.key && !chat.users[item.key]
            )}
            renderItem={user => {
              moment.locale('ko')
              return (
                <List.Item
                  onClick={() => onClickUser(user)}
                  style={{ cursor: 'pointer' }}
                >
                  <List.Item.Meta title={user.userId} />
                </List.Item>
              )
            }}
          />
        )}
      </Modal>
    </ContentContainer>
  )
}

export default ChatView
