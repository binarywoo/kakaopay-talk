import InvitationDao from '../dao/InvitationDao'

class InvitationService {
  constructor(firebase) {
    this.firebase = firebase
    this.dao = new InvitationDao(firebase)
  }

  getInvitationsByUserKey = userKey => {
    return this.dao.readInvitationsByUserKey(userKey)
  }

  postInvitation = invitation => {
    return this.dao.createInvitation(invitation)
  }

  putInvitation = (path, data) => {
    return this.dao.updateInvitation(path, data)
  }
}

export default InvitationService
