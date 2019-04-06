import { convertSnapshotToArr, childSetAndReturnResult } from '../libs/daoUtils'

class InvitationDao {
  constructor(firebase) {
    this.ref = firebase.database().ref('invitations')
  }

  readInvitationsByUserKey = userKey => {
    return this.ref
      .child(userKey)
      .once('value')
      .then(snapshot => Promise.resolve(convertSnapshotToArr(snapshot)))
  }

  createInvitation = invitation => {
    const key = this.ref.child(invitation.to).push().key
    const newInvitation = Object.assign({}, invitation, { key })
    return childSetAndReturnResult(
      this.ref.child(invitation.to),
      key,
      newInvitation
    )
  }

  updateInvitation = (path, data) => {
    return this.ref.child(path).set(data)
  }
}

export default InvitationDao
