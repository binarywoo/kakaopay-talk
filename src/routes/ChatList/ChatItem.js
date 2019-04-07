import React, { useCallback } from 'react'
import { List, Avatar, Tag } from 'antd'
import moment from 'moment'

const ChatItem = ({ item, goToChat, isParticipated }) => {
  const getDateFormat = useCallback(item => {
    const now = moment()
    const dayDiff = now.diff(item.lastUpdate, 'days')
    if (dayDiff < 1) return 'HH:mm'
    else if (dayDiff < 365) return 'MM-DD'
    else return 'YYYY-MM-DD'
  }, [])

  const countUsers = useCallback(() => {
    const keys = Object.keys(item.users)
    return keys.filter(key => item.users[key]).length
  }, [item])

  return (
    <List.Item
      actions={[moment(item.lastUpdate).format(getDateFormat(item))]}
      onClick={() => goToChat(item)}
      style={{ cursor: 'pointer' }}
    >
      <List.Item.Meta
        avatar={<Avatar>{`${countUsers()}명`}</Avatar>}
        title={
          <div>
            {isParticipated ? <Tag color='green'>참여중</Tag> : null}
            {item.title}
          </div>
        }
        description={item.lastMessage}
      />
    </List.Item>
  )
}

export default ChatItem
