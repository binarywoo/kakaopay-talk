import React from 'react'
import { shallow } from 'enzyme'
import Message from './index'
import { Divider, Avatar } from 'antd'
import { DUMMY_IMG_URL } from '../../constants/testConstants'
import { fromJS } from 'immutable'

describe('Message', () => {
  let wrapper = null
  const dummyProps = {
    isMyMessage: false,
    showDivider: true,
    showTag: true,
    showProfile: true,
    date: '2019-01-01',
    time: '10:10',
    item: {
      profileImage: null,
      content: 'test',
      userId: 'test'
    }
  }

  it('정상적으로 렌더링이 된다.', () => {
    wrapper = shallow(<Message {...dummyProps} />)
  })

  it('스냅샷과 매칭이 된다.', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('divider를 정상적으로 표현', () => {
    it('showDivider가 true일 경우 divider를 렌더링한다.', () => {
      expect(wrapper.find(Divider).length).toBe(1)
    })

    it('Divider 내부에 date가 정상적으료 표현된다.', () => {
      expect(
        wrapper
          .find(Divider)
          .children()
          .text()
      ).toBe('2019-01-01')
    })

    it('showDivider가 false일 경우 divider를 렌더링하지 않는다.', () => {
      wrapper = shallow(
        <Message {...Object.assign({}, dummyProps, { showDivider: false })} />
      )
      expect(wrapper.find(Divider).length).toBe(0)
    })
  })

  describe('타인의 메시지를 정상적으로 표현', () => {
    it('프로필 이미지를 보여준다.', () => {
      expect(wrapper.find(Avatar).length).toBe(1)
    })

    it('profileImage가 null일 경우 이미지 대신 아이콘을 보여준다.', () => {
      expect(wrapper.find(Avatar).prop('src')).toBeNull()
      expect(wrapper.find(Avatar).prop('icon')).toBe('user')
    })

    it('profileImage가 null이 아닐 경우 아이콘 대신 이미지를 보여준다.', () => {
      wrapper = shallow(
        <Message
          {...fromJS(dummyProps)
            .setIn(['item', 'profileImage'], DUMMY_IMG_URL)
            .toJS()}
        />
      )
      expect(wrapper.find(Avatar).prop('src')).toBe(DUMMY_IMG_URL)
      expect(wrapper.find(Avatar).prop('icon')).toBeNull()
    })
  })

  it('showTag 가 false일 때 message tag를 보여주지 않는다.', () => {
    wrapper = shallow(
      <Message {...Object.assign({}, dummyProps, { showTag: false })} />
    )
    expect(wrapper.find('.message-tag').length).toBe(0)
  })

  describe('나의 메시지를 정상적으로 표현', () => {
    it('나의 메시지일 때 프로필사진을 보여주지 않는다.', () => {
      wrapper = shallow(
        <Message {...Object.assign({}, dummyProps, { isMyMessage: true })} />
      )
      expect(wrapper.find(Avatar).length).toBe(0)
    })

    it('나의 메시지일 때에는 우측에 보여준다.', () => {
      wrapper = shallow(
        <Message {...Object.assign({}, dummyProps, { isMyMessage: true })} />
      )
      expect(wrapper.find('.message-row').hasClass('my-message')).toBe(true)
    })
  })
})
