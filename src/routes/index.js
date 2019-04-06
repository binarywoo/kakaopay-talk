import Loadable from 'react-loadable'
import SpinContainer from '../components/SpinContainer'

export const SignIn = Loadable({
  loader: () => import('./SignIn'),
  loading: SpinContainer
})

export const ChatList = Loadable({
  loader: () => import('./ChatList'),
  loading: SpinContainer
})

export const Chat = Loadable({
  loader: () => import('./Chat'),
  loading: SpinContainer
})

export const NotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: SpinContainer
})
