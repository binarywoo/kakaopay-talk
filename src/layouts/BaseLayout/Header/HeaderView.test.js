import React from 'react'
import { shallow } from 'enzyme'
import HeaderView from './HeaderView'
import { fromJS } from 'immutable'
import { Icon, Affix, PageHeader } from 'antd'
import { DUMMY_USER } from '../../../constants/testConstants'
import MenuDrawer from './MenuDrawer'

describe('HeaderView', () => {
  let wrapper = null

  const props = {
    header: {
      title: 'test',
      extra: <Icon type='export' />
    },
    invitations: [],
    user: DUMMY_USER,
    form: {},
    onAcceptInvitation: jest.fn(),
    onDeynyInvitation: jest.fn(),
    onLogout: jest.fn(),
    onBack: jest.fn(),
    onChangeBackgroundColor: jest.fn(),
    onApplyProfileImage: jest.fn()
  }

  it('정상적으로 렌더링이 된다.', () => {
    wrapper = shallow(<HeaderView {...props} />)
  })

  it('스냅샷과 일치한다.', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('하위 컴포넌트들을 정상적으로 렌더링한다.', () => {
    expect(wrapper.find(Affix).length).toBe(1)
    expect(wrapper.find(PageHeader).length).toBe(1)
    expect(wrapper.find(MenuDrawer).length).toBe(1)
  })

  it('추가 컴포넌트를 정상적으로 렌더링한다.', () => {
    expect(wrapper.find(PageHeader).prop('extra').length).toBe(3)
    let newProps = fromJS(props)
      .setIn(['header', 'extra'], null)
      .toJS()
    wrapper = shallow(<HeaderView {...newProps} />)
    expect(wrapper.find(PageHeader).prop('extra').length).toBe(2)
    newProps = Object.assign({}, newProps, {
      user: null
    })
    wrapper = shallow(<HeaderView {...newProps} />)
    expect(wrapper.find(PageHeader).prop('extra').length).toBe(0)
  })

  it('타이틀을 정상적으로 렌더링한다.', () => {
    expect(wrapper.find(PageHeader).prop('title')).toBe('test')
    const newProps = fromJS(props)
      .setIn(['header', 'title'], null)
      .toJS()
    wrapper = shallow(<HeaderView {...newProps} />)
    expect(wrapper.find(PageHeader).prop('title')).toBe('까까오톡')
  })
})
