import React from 'react'
import { Alert, Divider, Avatar } from 'antd'
import MessageImage from '../MessageImage'
import './index.less'

const Message = ({
  isMyMessage,
  showDivider,
  showProfile,
  showTag,
  date,
  time,
  item
}) => {
  return (
    <div
      className={`message-row ${isMyMessage ? 'my-message' : 'other-message'}`}
    >
      {showDivider && <Divider className='date-divider'>{date}</Divider>}
      {!isMyMessage && showProfile && (
        <Avatar
          src={item.profileImage}
          icon={!item.profileImage ? 'user' : null}
          style={{ marginRight: 5, position: 'absolute' }}
        />
      )}
      <Alert
        className='message-box'
        message={
          item.type === 'image' ? (
            <MessageImage src={item.content} />
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
}

export default Message
