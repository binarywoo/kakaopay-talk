import React, { useCallback, useEffect, useState } from 'react'
import { PageHeader, Affix, notification, Button, Modal, Icon } from 'antd'
import MenuDrawer from './MenuDrawer'

const HeaderView = ({
  header,
  invitations,
  user,
  form,
  onAcceptInvitation,
  onDenyInvitation,
  onLogout,
  onBack,
  onChangeBackgroundColor,
  onApplyProfileImage
}) => {
  const [showDrawer, setShowDrawer] = useState(false)

  const handleOnAcceptInvitation = useCallback(
    invitation => {
      notification.destroy(invitation.key)
      onAcceptInvitation(invitation)
    },
    [invitations]
  )

  const handleOnDenyInvitation = useCallback(invitation => {
    notification.destroy(invitation.key)
    onDenyInvitation(invitation)
  })

  const handleOnClickLogout = useCallback(() => {
    Modal.confirm({
      title: '로그아웃',
      content: '정말 로그아웃 하시겠습니까?',
      okText: '예',
      cancelText: '아니오',
      onOk: () => {
        onLogout()
      }
    })
  }, [user])

  const handleOnClickMyMenu = useCallback(() => {
    setShowDrawer(true)
  }, [])

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
              onClick={() => handleOnDenyInvitation(newInvitation)}
              style={{ marginRight: 5 }}
            >
              거절
            </Button>,
            <Button
              key='accept'
              type='primary'
              onClick={() => handleOnAcceptInvitation(newInvitation)}
            >
              수락
            </Button>
          ]
        })
      })
    }
  }, [invitations])

  return (
    <Affix offsetTop={0}>
      <PageHeader
        className='kakao-header'
        onBack={onBack()}
        title={header.title || '까까오톡'}
        extra={
          header.extra ||
          (user && [
            <div
              key='logout'
              style={{
                cursor: 'pointer',
                display: 'inline-block',
                marginRight: 24
              }}
              onClick={handleOnClickLogout}
            >
              <Icon type='logout' />
            </div>,
            <div
              key='settings'
              style={{ cursor: 'pointer', display: 'inline-block' }}
              onClick={handleOnClickMyMenu}
            >
              <Icon type='setting' />
            </div>
          ])
        }
      />
      <MenuDrawer
        show={showDrawer}
        user={user}
        form={form}
        onChangeBackgroundColor={onChangeBackgroundColor}
        onClose={() => setShowDrawer(false)}
        onApplyProfileImage={onApplyProfileImage}
      />
    </Affix>
  )
}

export default HeaderView
