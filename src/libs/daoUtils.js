export const convertSnapshotToArr = snapshot => {
  const arr = []
  const snapshotVal = snapshot.val()
  for (const key in snapshot.val()) {
    arr.push(snapshotVal[key])
  }
  return arr
}

export const childSetAndReturnResult = (ref, key, value) => {
  return ref
    .child(key)
    .set(value)
    .then(() => {
      return ref
        .child(key)
        .once('value')
        .then(snapshot => {
          return Promise.resolve(snapshot.val())
        })
    })
}
