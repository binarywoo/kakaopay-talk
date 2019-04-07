import React from 'react'
import { shallow } from 'enzyme'
import { Input } from 'antd'
import MessageInput from './MessageInput'

describe('MessageInput', () => {
  let wrapper = null

  const props = {
    message: '',
    onChange: () => null,
    onSendMessage: () => null,
    onClickInvitation: () => null,
    sendImageMessage: () => null,
    showHiddenMenu: false,
    setShowHiddenMenu: () => null
  }

  it('정상적으로 렌더링이 된다.', () => {
    wrapper = shallow(<MessageInput {...props} />)
  })

  it('스냅샷과 매칭이 된다.', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('message를 정상적으로 렌더링한다.', () => {
    const newProps = Object.assign({}, props, {
      message: 'test'
    })
    wrapper = shallow(<MessageInput {...newProps} />)
    expect(wrapper.find(Input.Search).prop('value')).toBe('test')
  })

  it('히든메뉴를 정상적으로 보여준다.', () => {
    expect(wrapper.find('.hidden-menu').hasClass('hidden')).toBe(true)
    const newProps = Object.assign({}, props, {
      showHiddenMenu: true
    })
    wrapper = shallow(<MessageInput {...newProps} />)
    expect(wrapper.find('.hidden-menu').hasClass('show')).toBe(true)
  })
})
