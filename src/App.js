import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Firebase, { FirebaseContext } from './contexts/firebase'
import './App.less'
import { SignIn, ChatList, Chat, NotFound } from './routes'
import BaseLayout from './layouts/BaseLayout/BaseLayout'

const App = ({ store }) => (
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <Router>
        <BaseLayout>
          <Switch>
            <Route path='/sign-in' component={SignIn} />
            <Route path='/chat-list' component={ChatList} />
            <Route path='/chat/:key' component={Chat} />
            <Route exact path='/' component={ChatList} />
            <Route path='/404' component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </BaseLayout>
      </Router>
    </FirebaseContext.Provider>
  </Provider>
)

export default App
