import React from 'react'
import { Alert, Divider, Avatar, Icon } from 'antd'
import MessageImage from '../MessageImage'
import './index.less'
import { linkify } from '../../libs/commonUtils'

const Message = ({
  isMyMessage,
  showDivider,
  showProfile,
  showTag,
  date,
  time,
  item
}) => {
  const renderInnerContent = () => {
    if (item.type === 'image') {
      return <MessageImage src={item.content} />
    } else if (item.type === 'text') {
      return <div dangerouslySetInnerHTML={{ __html: linkify(item.content) }} />
    } else if (item.type === 'loading') {
      return <Icon type='loading' />
    }
  }

  if (item.type === 'participate') {
    return (
      <div>
        {showDivider && <Divider className='date-divider'>{date}</Divider>}
        <div className='participate-message'>
          <b>{item.userId}</b>님이{' '}
          {item.content === 'in'
            ? '대화방에 참여했습니다.'
            : '대화방을 나갔습니다.'}
        </div>
      </div>
    )
  } else {
    return (
      <div
        className={`message-row ${
          isMyMessage ? 'my-message' : 'other-message'
        }`}
      >
        {showDivider && <Divider className='date-divider'>{date}</Divider>}
        {!isMyMessage && showProfile && (
          <Avatar
            src={item.profileImage}
            icon={!item.profileImage ? 'user' : null}
            style={{ marginRight: 5, position: 'absolute' }}
          />
        )}
        <Alert className='message-box' message={renderInnerContent()} />
        {showTag && (
          <div className='message-tag'>
            <span className='fw-700'>{item.userId} · </span>
            {time}
          </div>
        )}
      </div>
    )
  }
}

export default Message
