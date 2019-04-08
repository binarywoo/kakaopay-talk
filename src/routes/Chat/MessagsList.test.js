import React from 'react'
import { mount } from 'enzyme'
import moment from 'moment'
import MessageList from './MessageList'

describe('MessageList', () => {
  let wrapper = null
  moment.locale('ko')
  window.moment = moment
  const props = {
    messages: [
      {
        content: 'in',
        key: '-Lbx1_i6H-tlYr5-aDI2',
        lastUpdate: '2019-04-08T13:01:49.169Z',
        type: 'participate',
        user: '-Lbwm5PmrybLY2e12Mrt',
        userId: '이도희'
      },
      {
        content: '하이',
        key: '-Lbx1aoKWd_CgVTaKF43',
        lastUpdate: '2019-04-08T13:01:53.660Z',
        type: 'text',
        user: '-Lbwm5PmrybLY2e12Mrt',
        userId: '이도희'
      },
      {
        content: 'in',
        key: '-Lbx1d2RZBsTmPm8P6qF',
        lastUpdate: '2019-04-08T13:02:02.822Z',
        type: 'participate',
        user: '-Lbw8B8lmV9hY19pgs9o',
        userId: '이웅희'
      },
      {
        content: '하이',
        key: '-Lbx1eC3NVnHGd6DkaeZ',
        lastUpdate: '2019-04-08T13:02:07.532Z',
        type: 'text',
        user: '-Lbw8B8lmV9hY19pgs9o',
        userId: '이웅희'
      },
      {
        content: 'out',
        key: '-Lbx1lQl_Op0X1yXmgj-',
        lastUpdate: '2019-04-08T13:02:36.399Z',
        type: 'participate',
        user: '-Lbw8B8lmV9hY19pgs9o',
        userId: '이웅희'
      }
    ],
    user: {
      key: '-Lbwm5PmrybLY2e12Mrt',
      userId: '이도희'
    }
  }
  it('정상적으로 렌더링이 된다.', () => {
    wrapper = mount(<MessageList {...props} />)
  })

  it('스냅샷과 일치한다.', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('date divider를 정상적으로 렌더링한다.', () => {
    expect(wrapper.find('.ant-divider-inner-text').text()).toBe('2019-04-08')
  })

  it('시간 tag를 정상적으로 렌더링한다.', () => {
    expect(wrapper.find('.message-tag').length).toBe(2)
    expect(
      wrapper
        .find('.message-tag')
        .at(0)
        .text()
    ).toBe('이도희 · 22:01')
    expect(
      wrapper
        .find('.message-tag')
        .at(1)
        .text()
    ).toBe('이웅희 · 22:02')
  })

  it('참여/퇴장 메시지를 정상적으로 렌더링한다.', () => {
    expect(wrapper.find('.participate-message').length).toBe(3)
  })
})
