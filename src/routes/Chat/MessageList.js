import React from 'react';
import Message from '../../components/Message/index';

const MessageList = ({ messages, user }) => {
  return (
    <div>
      {messages &&
        messages.map((item, idx) => {
          const isMyMessage = user.key === item.user;
          const lastUpdateMoment = window.moment(item.lastUpdate);
          const time = lastUpdateMoment.format('HH:mm');

          const prevMessage = idx > 0 ? messages[idx - 1] : null;
          const prevLastUpdateMoment = prevMessage
            ? window.moment(prevMessage.lastUpdate)
            : null;

          const prevDate = prevMessage
            ? prevLastUpdateMoment.format('YYYY-MM-DD')
            : null;
          const date = lastUpdateMoment.format('YYYY-MM-DD');

          const nextMessage =
            idx < messages.length - 1 ? messages[idx + 1] : null;
          const nextLastUpdateMoment = nextMessage
            ? window.moment(nextMessage.lastUpdate)
            : null;
          const nextTime = nextMessage
            ? nextLastUpdateMoment.format('HH:mm')
            : null;
          const nextDate = nextMessage
            ? nextLastUpdateMoment.format('YYYY-MM-DD')
            : null;
          const nextUserId =
            idx < messages.length - 1 ? nextMessage.userId : null;

          const prevUserId = prevMessage ? prevMessage.userId : null;
          const prevTime = prevMessage
            ? prevLastUpdateMoment.format('HH:mm')
            : null;

          let showTag = true;
          let showDivider = false;
          let showProfile = false;
          if (
            nextTime === time &&
            nextDate === date &&
            nextUserId === item.userId &&
            nextMessage.type !== 'participate'
          )
            showTag = false;
          if (prevDate !== date) showDivider = true;
          if (
            item.userId !== prevUserId ||
            prevTime !== time ||
            prevDate !== date ||
            prevMessage.type === 'participate'
          )
            showProfile = true;

          return (
            <Message
              key={item.key}
              isMyMessage={isMyMessage}
              showDivider={showDivider}
              showTag={showTag}
              showProfile={showProfile}
              date={date}
              time={time}
              item={item}
            />
          );
        })}
    </div>
  );
};

export default MessageList;
