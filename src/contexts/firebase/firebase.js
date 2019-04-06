import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCeplGickk-EGWfj0Ix4EYfY3J8IAeijjA',
  authDomain: 'kakaopay-talk.firebaseapp.com',
  databaseURL: 'https://kakaopay-talk.firebaseio.com',
  projectId: 'kakaopay-talk',
  storageBucket: 'kakaopay-talk.appspot.com',
  messagingSenderId: '38984586289'
}

class Firebase {
  constructor() {
    return firebase.initializeApp(config)
  }
}

export default Firebase
