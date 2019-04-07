import React from 'react'
import { shallow } from 'enzyme'
import ChatView from './ChatView'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import InvitationModal from './InvitationModal'
import {
  DUMMY_MESSAGE,
  DUMMY_IMAGE_MESSAGE,
  DUMMY_CHAT,
  DUMMY_USER
} from '../../constants/testConstants'

describe('ChatView', () => {
  let wrapper = null

  const props = {
    messages: [DUMMY_MESSAGE, DUMMY_IMAGE_MESSAGE],
    chat: DUMMY_CHAT,
    user: DUMMY_USER,
    onSendMessage: () => null,
    getUserListToInvite: () => null,
    sendInvitation: () => null,
    sendImageMessage: () => null
  }

  it('정상적으로 렌더링이 된다.', () => {
    wrapper = shallow(<ChatView {...props} />)
  })

  it('스냅샷과 매칭이 된다.', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('하위 컴포넌트들을 정상적으로 렌더링한다.', () => {
    expect(wrapper.find(MessageList).length).toBe(1)
    expect(wrapper.find(MessageInput).length).toBe(1)
    expect(wrapper.find(InvitationModal).length).toBe(1)
  })
})
