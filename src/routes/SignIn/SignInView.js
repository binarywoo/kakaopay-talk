import React, { useState, useCallback, useEffect } from 'react'
import { Input, Form, Layout, Button } from 'antd'
import { USER_KEY } from '../../constants/commonConstants'

const SignInView = ({
  userService,
  firebase,
  form,
  userAction,
  history,
  headerAction
}) => {
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    headerAction.receiveTitle('로그인')
  }, [])

  const onSubmit = useCallback(() => {
    form.validateFields((err, values) => {
      if (!err) {
        setLoading(true)
        userService
          .getUserByUserId(values.userId)
          .then(user => {
            if (!user) {
              return userService
                .postUser({ userId: values.userId })
                .then(user => {
                  localStorage.setItem(USER_KEY, user.key)
                  history.push('/chat-list')
                })
            } else {
              localStorage.setItem(USER_KEY, user.key)
              history.push('/chat-list')
            }
          })
          .finally(() => {
            setLoading(false)
          })
      }
    })
  }, [])

  return (
    <Layout className='bg-yellow sign-in-layout'>
      <Layout.Content className='middle-center'>
        <Form>
          <Form.Item label='아이디' colon={false} required>
            {form.getFieldDecorator('userId', {
              rules: [
                {
                  required: true,
                  message: '아이디를 입력해주세요.'
                },
                {
                  min: 1,
                  max: 8,
                  message: '1~8자리의 아이디를 입력해주세요.'
                }
              ]
            })(<Input onPressEnter={onSubmit} />)}
          </Form.Item>
          <Form.Item>
            <Button type='primary' block loading={isLoading} onClick={onSubmit}>
              로그인
            </Button>
          </Form.Item>
        </Form>
      </Layout.Content>
    </Layout>
  )
}

export default SignInView
