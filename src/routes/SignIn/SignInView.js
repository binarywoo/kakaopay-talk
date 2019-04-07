import React, { useState, useCallback } from 'react'
import { Input, Form, Layout, Button } from 'antd'

const SignInView = ({ form, onSubmit }) => {
  const [isLoading, setLoading] = useState(false)

  const handleOnSubmit = useCallback(() => {
    form.validateFields((err, values) => {
      if (!err) {
        setLoading(true)
        onSubmit(values.userId).finally(() => {
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
            })(<Input onPressEnter={handleOnSubmit} />)}
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              block
              loading={isLoading}
              onClick={handleOnSubmit}
            >
              로그인
            </Button>
          </Form.Item>
        </Form>
      </Layout.Content>
    </Layout>
  )
}

export default SignInView
