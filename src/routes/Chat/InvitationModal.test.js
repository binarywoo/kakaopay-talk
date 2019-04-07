import React from 'react'
import { shallow, mount } from 'enzyme'
import InvitationModal from './InvitationModal'
import SpinContainer from '../../components/SpinContainer/index'
import { List } from 'antd'

describe('InvitationModal', () => {
  let wrapper = null

  const props = {
    show: true,
    userList: ['a', 'b', 'c', 'd', 'e', 'f'].map(item => ({
      key: item,
      userId: item
    })),
    chat: {
      users: {
        a: true,
        b: true,
        c: true
      }
    },
    user: { key: 'a', userId: 'a' },
    onClose: () => null,
    onClickUser: () => null
  }

  it('정상적으로 렌더링이 된다.', () => {
    wrapper = shallow(<InvitationModal {...props} />)
  })

  it('스냅샷과 매칭이 된다.', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('유저 목록이 로딩 되었을 때 자신을 제외하고, 현재 방에 없는 유저 List를 보여준다.', () => {
    wrapper = mount(<InvitationModal {...props} />)
    expect(wrapper.find(List).length).toBe(1)
    expect(wrapper.find(List.Item).length).toBe(3)
  })

  it('유저 목록이 아직 로딩되지 않았을 때 SpinContainer를 보여준다.', () => {
    const newProps = Object.assign({}, props, {
      userList: null
    })
    wrapper = shallow(<InvitationModal {...newProps} />)
    expect(wrapper.find(SpinContainer).length).toBe(1)
  })
})
