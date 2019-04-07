import React, { useCallback, useEffect, useState } from 'react'
import {
  PageHeader,
  Affix,
  notification,
  Button,
  Modal,
  Icon,
  Drawer,
  message
} from 'antd'
import { GithubPicker } from 'react-color'
import { convertSnapshotToArr } from '../../../libs/daoUtils'
import { USER_KEY } from '../../../constants/commonConstants'
import PictureWall from '../../../components/PictureWall/index'

const HeaderView = ({
  header,
  history,
  headerAction,
  invitations,
  firebase,
  user,
  subscribeAction,
  invitationService,
  userAction,
  userService,
  form,
  storage
}) => {
  const [showDrawer, setShowDrawer] = useState(false)

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

  const [profileImage, setProfileImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getProfileInfoFromUser = useCallback(() => {
    if (user && user.profileImage) {
      const splitFileInfo = user.profileImage.split('/')
      const userProfileImage = [
        {
          uid: -1,
          name: splitFileInfo[splitFileInfo.length - 1],
          status: 'done',
          url: user.profileImage
        }
      ]
      return userProfileImage
    } else {
      return null
    }
  }, [user])

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

  const onClickMyMenu = useCallback(() => {
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

  const onClickMenu = useCallback(path => {
    setShowDrawer(false)
    history.push(path)
  }, [])

  const onChangeBackgroundColor = useCallback(color => {
    const hex = color.hex
    const newUser = Object.assign({}, user, {
      backgroundColor: hex
    })
    userAction.receiveUser(newUser)
    userService.putUser(`${user.key}/backgroundColor`, hex)
  }, [])

  const onChangeProfileImage = useCallback(e => {
    setProfileImage(e)
  }, [])

  const onClickApply = useCallback(() => {
    form.validateFields((err, values) => {
      if (!err) {
        if (
          profileImage &&
          profileImage.fileList &&
          profileImage.fileList.length > 0
        ) {
          setIsLoading(true)
          const profileFileObj = profileImage.fileList[0].originFileObj
          storage
            .upload('messageImage', profileFileObj)
            .then(res => {
              const path = res.metadata.fullPath
              return storage.getDownloadUrl(path)
            })
            .then(url => {
              userService.putUser(`${user.key}/profileImage`, url)
              userAction.receiveUser(
                Object.assign({}, user, { profileImage: url })
              )
              message.success('저장되었습니다.')
              setIsLoading(false)
            })
        }
      }
    })
  }, [profileImage])

  const normFile = useCallback(e => {
    if (Array.isArray(e)) return e
    return e && e.fileList
  }, [])

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
              onClick={onClickLogout}
            >
              <Icon type='logout' />
            </div>,
            <div
              key='settings'
              style={{ cursor: 'pointer', display: 'inline-block' }}
              onClick={onClickMyMenu}
            >
              <Icon type='setting' />
            </div>
          ])
        }
      />
      <Drawer
        placement='right'
        closable={true}
        visible={showDrawer}
        onClose={() => setShowDrawer(false)}
        className='menu-drawer'
        title={
          <div>
            <span className='fw-7000'>{user ? user.userId : null}</span>님
            로그인 중
          </div>
        }
      >
        <div className='setting-zone'>
          <h4>프로필 사진</h4>
          {form.getFieldDecorator('profileImage', {
            valuePropName: 'fileList',
            getValueFromEvent: normFile,
            initialValue: getProfileInfoFromUser()
          })(<PictureWall onChange={onChangeProfileImage} max={1} useCrop />)}
          <Button
            onClick={onClickApply}
            loading={isLoading}
            disabled={
              !profileImage ||
              !profileImage.fileList ||
              profileImage.fileList.length === 0
            }
            style={{ marginBottom: 24 }}
          >
            프로필사진 저장
          </Button>
          <h4>채팅방 배경색</h4>
          <GithubPicker
            colors={[
              '#B80000',
              '#DB3E00',
              '#FCCB00',
              '#008B02',
              '#006B76',
              '#1273DE',
              '#004DCF',
              '#5300EB'
            ]}
            triangle='hide'
            onChange={onChangeBackgroundColor}
          />
        </div>
      </Drawer>
    </Affix>
  )
}

export default HeaderView
