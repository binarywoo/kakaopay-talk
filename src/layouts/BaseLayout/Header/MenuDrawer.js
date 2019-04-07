import React, { useCallback, useState } from 'react'
import { Drawer, Button, message } from 'antd'
import PictureWall from '../../../components/PictureWall/PictureWall'
import { GithubPicker } from 'react-color'

const MenuDrawer = ({
  show,
  user,
  onChangeBackgroundColor,
  onClose,
  form,
  onApplyProfileImage
}) => {
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
  const normFile = useCallback(e => {
    if (Array.isArray(e)) return e
    return e && e.fileList
  }, [])

  const onClickApply = useCallback(() => {
    form.validateFields(err => {
      if (!err) {
        if (
          profileImage &&
          profileImage.fileList &&
          profileImage.fileList.length > 0
        ) {
          setIsLoading(true)
          const profileFileObj = profileImage.fileList[0].originFileObj
          onApplyProfileImage(profileFileObj).then(() => {
            message.success('저장되었습니다.')
            setIsLoading(false)
          })
        }
      }
    })
  }, [profileImage])

  const onChangeProfileImage = useCallback(e => {
    setProfileImage(e)
  }, [])

  return (
    <Drawer
      placement='right'
      closable={true}
      visible={show}
      onClose={onClose}
      className='menu-drawer'
      title={
        <div>
          <span className='fw-7000'>{user ? user.userId : null}</span>님 로그인
          중
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
          프로필 사진 저장
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
  )
}

export default MenuDrawer
