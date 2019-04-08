import React, { useCallback } from 'react'
import { List, Avatar, Tag } from 'antd'

const ChatItem = ({ item, goToChat, isParticipated }) => {
  const getDateFormat = useCallback(lastMoment => {
    const now = window.moment()
    const dayDiff = now.diff(lastMoment, 'days')
    if (dayDiff < 3) return lastMoment.fromNow()
    else if (dayDiff < 365) return lastMoment.format('MM-DD')
    else return lastMoment.format('YYYY-MM-DD')
  }, [])

  const countUsers = useCallback(() => {
    const keys = Object.keys(item.users)
    return keys.filter(key => item.users[key]).length
  }, [item])

  const getUsers = useCallback(() => {
    const keys = Object.keys(item.users)
    const userIds = keys.map(key => item.users[key] && item.users[key].userId)
    const userCnt = countUsers()
    if (userCnt > 3) {
      return `${userIds.slice(0, 3).join(', ')} 외 ${userCnt - 3}명 참여중`
    } else {
      return `${userIds.join(', ')} 참여중`
    }
  }, [item])

  return (
    <List.Item
      actions={[getDateFormat(window.moment(item.lastUpdate))]}
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
        description={
          <div>
            <p style={{ marginBottom: 0 }}>{item.lastMessage}</p>
            <small className='chat-users'>{getUsers()}</small>
          </div>
        }
      />
    </List.Item>
  )
}

export default ChatItem
