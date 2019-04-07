import React from 'react'
import moment from 'moment'
import Message from '../../components/Message/index'

const MessageList = ({ messages, user }) => {
  return (
    <div>
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
          const nextDate = nextMessage
            ? moment(nextMessage.lastUpdate).format('YYYY-MM-DD')
            : null
          const nextUserId =
            idx < messages.length - 1 ? nextMessage.userId : null
          const prevUserId = prevMessage ? prevMessage.userId : null
          const prevTime = prevMessage
            ? moment(prevMessage.lastUpdate).format('HH:mm')
            : null

          let showTag = true
          let showDivider = false
          let showProfile = false
          if (
            nextTime === time &&
            nextDate === date &&
            nextUserId === item.userId
          )
            showTag = false
          if (prevDate !== date) showDivider = true
          if (
            item.userId !== prevUserId ||
            prevTime !== time ||
            prevDate !== date
          )
            showProfile = true
          return (
            <Message
              isMyMessage={isMyMessage}
              showDivider={showDivider}
              showTag={showTag}
              showProfile={showProfile}
              date={date}
              time={time}
              item={item}
            />
          )
        })}
    </div>
  )
}

export default MessageList
