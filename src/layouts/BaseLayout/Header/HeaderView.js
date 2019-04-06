import React, { useCallback, useEffect } from 'react'
import { PageHeader, Affix, notification, Button, Modal, Icon } from 'antd'
import { convertSnapshotToArr } from '../../../libs/daoUtils'
import { USER_KEY } from '../../../constants/commonConstants'

const HeaderView = ({
  header,
  history,
  headerAction,
  invitations,
  firebase,
  user,
  subscribeAction,
  invitationService,
  userAction
}) => {
  useEffect(() => {
    // user의 초대 내역을 구독
    if (user) {
      firebase
        .database()
        .ref(`invitations/${user.key}`)
        .on('value', snapshot => {
          subscribeAction.receiveSubscribe(
            'invitations',
            convertSnapshotToArr(snapshot)
          )
        })
    }
  }, [])

  const onAcceptInvitation = useCallback(
    invitation => {
      notification.destroy(invitation.key)
      invitationService.putInvitation(
        `${invitation.to}/${invitation.key}/checked`,
        true
      )
      history.push(`/chat/${invitation.chat}`)
    },
    [invitations]
  )

  const onDenyInvitation = useCallback(invitation => {
    notification.destroy(invitation.key)
    invitationService.putInvitation(
      `${invitation.to}/${invitation.key}/checked`,
      true
    )
  })

  const onClickLogout = useCallback(() => {
    Modal.confirm({
      title: '로그아웃',
      content: '정말 로그아웃 하시겠습니까?',
      okText: '예',
      cancelText: '아니오',
      onOk: () => {
        userAction.clearUser()
        localStorage.removeItem(USER_KEY)
      }
    })
  }, [user])

  useEffect(() => {
    const newInvitations = invitations
      ? invitations.filter(invitation => !invitation.checked)
      : null
    if (newInvitations && newInvitations.length > 0) {
      newInvitations.forEach(newInvitation => {
        notification.open({
          duration: 0,
          message: '새로운 초대 도착',
          description: `${newInvitation.fromId}님으로 부터 ${
            newInvitation.chatTitle
          }방에 초대되었습니다.`,
          key: newInvitation.key,
          btn: [
            <Button
              key='deny'
              onClick={() => onDenyInvitation(newInvitation)}
              style={{ marginRight: 5 }}
            >
              거절
            </Button>,
            <Button
              key='accept'
              type='primary'
              onClick={() => onAcceptInvitation(newInvitation)}
            >
              수락
            </Button>
          ]
        })
      })
    }
  }, [invitations])

  const onBack = useCallback(() => {
    if (header.backPath) {
      return () => {
        history.push(header.backPath)
        headerAction.receiveBackPath(null)
      }
    } else {
      return null
    }
  }, [header])

  return (
    <Affix offsetTop={0}>
      <PageHeader
        className='kakao-header'
        onBack={onBack()}
        title={header.title || '까까오톡'}
        extra={
          header.extra ||
          (user && (
            <div style={{ cursor: 'pointer' }} onClick={onClickLogout}>
              <Icon type='logout' />
            </div>
          ))
        }
      />
    </Affix>
  )
}

export default HeaderView
