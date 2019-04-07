import React, { useEffect, useState, useCallback } from 'react'
import { Modal } from 'antd'

import ContentContainer from '../../components/ContentContainer/index'
import './index.less'
import { scrollToBottom } from '../../libs/chatAppUtils'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import InvitationModal from './InvitationModal'

const ChatView = ({
  messages,
  chat,
  user,
  onSendMessage,
  getUserListToInvite,
  sendInvitation,
  sendImageMessage
}) => {
  const [message, setMessage] = useState('')
  const [showUserSearchModal, setShowUserSearchModal] = useState(false)
  const [userList, setUserList] = useState(null)
  const [showHiddenMenu, setShowHiddenMenu] = useState(false)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    scrollToBottom()
  }, [showHiddenMenu])

  const handleOnSendMessage = useCallback(() => {
    onSendMessage(message)
    setMessage('')
  }, [message])

  const onClickInvitation = useCallback(() => {
    setShowHiddenMenu(false)
    getUserListToInvite().then(userList => {
      setUserList(userList)
    })
    setShowUserSearchModal(true)
  }, [])

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
      sendInvitation(newInvitation).then(() => {
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
      <div
        className={!showHiddenMenu ? 'smooth-padding' : null}
        style={{ padding: `12px 12px ${showHiddenMenu ? 168 : 68}px 12px` }}
      >
        <MessageList messages={messages} user={user} />
      </div>
      <MessageInput
        message={message}
        onChange={e => setMessage(e.target.value)}
        onSendMessage={handleOnSendMessage}
        onClickInvitation={onClickInvitation}
        showHiddenMenu={showHiddenMenu}
        setShowHiddenMenu={setShowHiddenMenu}
        sendImageMessage={sendImageMessage}
      />
      <InvitationModal
        show={showUserSearchModal}
        userList={userList}
        chat={chat}
        user={user}
        onClose={() => setShowUserSearchModal(false)}
        onClickUser={onClickUser}
      />
    </ContentContainer>
  )
}

export default ChatView
