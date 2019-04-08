import React from 'react'
import { mount } from 'enzyme'
import ChatItem from './ChatItem'
import { fromJS } from 'immutable'
import { Avatar, List, Tag } from 'antd'
import moment from 'moment'
import { DUMMY_CHAT } from '../../constants/testConstants'

describe('ChatItem', () => {
  moment.locale('ko')
  window.moment = moment
  let wrapper = null
  const now = new Date()
  let fiveDaysAgo = new Date()
  let twoYearsAgo = new Date()
  fiveDaysAgo.setTime(now.getTime() - 5 * 24 * 60 * 60 * 1000)
  twoYearsAgo.setTime(now.getTime() - 365 * 2 * 24 * 60 * 60 * 1000)
  const nowISOString = now.toISOString()
  const fiveDaysAgoISOString = fiveDaysAgo.toISOString()
  const twoYearsAgoISOString = twoYearsAgo.toISOString()

  const props = {
    item: Object.assign({}, DUMMY_CHAT, {
      users: {
        '1': {
          userId: 'a'
        },
        '2': {
          userId: 'b'
        },
        '3': {
          userId: 'c'
        },
        '4': {
          userId: 'd'
        }
      },
      lastUpdate: nowISOString
    }),
    goToChat: jest.fn(),
    isParticipated: true
  }

  it('정상적으로 렌더링이 된다.', () => {
    wrapper = mount(<ChatItem {...props} />)
  })

  it('하위 컴포넌트들을 정상적으로 렌더링한다.', () => {
    expect(wrapper.find(Avatar).length).toBe(1)
    expect(wrapper.find(List.Item).length).toBe(1)
    expect(wrapper.find(List.Item.Meta).length).toBe(1)
    expect(wrapper.find(Tag).length).toBe(1)
  })

  it('참여중 태그를 정상적으로 렌더링한다.', () => {
    expect(wrapper.find(Tag).length).toBe(1)
    const newProps = Object.assign({}, props, {
      isParticipated: false
    })
    wrapper = mount(<ChatItem {...newProps} />)
    expect(wrapper.find(Tag).length).toBe(0)
  })

  it('참여자 목록을 정상적으로 렌더링한다.', () => {
    expect(wrapper.find('.chat-users').text()).toBe('a, b, c 외 1명 참여중')
    const newProps = fromJS(props)
      .deleteIn(['item', 'users', '4'])
      .deleteIn(['item', 'users', '3'])
      .toJS()
    wrapper = mount(<ChatItem {...newProps} />)
    expect(wrapper.find('.chat-users').text()).toBe('a, b 참여중')
  })

  it('마지막 업데이트 시간을 정상적으로 렌더링한다.', () => {
    expect(
      wrapper
        .find('.ant-list-item-action')
        .at(0)
        .text()
    ).toBe(moment(nowISOString).fromNow())

    let newProps = fromJS(props)
      .setIn(['item', 'lastUpdate'], fiveDaysAgoISOString)
      .toJS()
    wrapper = mount(<ChatItem {...newProps} />)
    expect(
      wrapper
        .find('.ant-list-item-action')
        .at(0)
        .text()
    ).toBe(moment(fiveDaysAgoISOString).format('MM-DD'))

    newProps = fromJS(props)
      .setIn(['item', 'lastUpdate'], twoYearsAgoISOString)
      .toJS()
    wrapper = mount(<ChatItem {...newProps} />)
    expect(
      wrapper
        .find('.ant-list-item-action')
        .at(0)
        .text()
    ).toBe(moment(twoYearsAgoISOString).format('YYYY-MM-DD'))
  })
})
