import React from 'react'
import { Modal, List } from 'antd'
import moment from 'moment'
import SpinContainer from '../../components/SpinContainer/index'

const InvitationModal = ({
  show,
  userList,
  chat,
  user,
  onClose,
  onClickUser
}) => {
  return (
    <Modal
      visible={show}
      title='대화상대 초대'
      footer={null}
      onCancel={onClose}
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
  )
}

export default InvitationModal
