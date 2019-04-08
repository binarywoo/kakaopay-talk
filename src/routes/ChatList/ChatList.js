import React from 'react'
import { List } from 'antd'
import { orderBy } from 'lodash'
import ChatItem from './ChatItem'

const ChatList = ({ list, goToChat, user }) => {
  return (
    <List
      className='chat-list'
      locale={{
        emptyText: '채팅방이 없습니다.'
      }}
      style={{
        padding: '0 12px'
      }}
      itemLayout='horizontal'
      dataSource={orderBy(list, ['lastUpdate'], ['desc'])}
      renderItem={item => {
        return (
          <ChatItem
            item={item}
            goToChat={goToChat}
            isParticipated={item.users[user.key]}
          />
        )
      }}
    />
  )
}

export default ChatList
