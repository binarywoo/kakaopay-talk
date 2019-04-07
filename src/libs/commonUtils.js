export const isEmpty = value => {
  return (
    value === '' ||
    value === null ||
    value === undefined ||
    (value != null && typeof value === 'object' && !Object.keys(value).length)
  )
}

export const getParameterByName = (name, url) => {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, '\\$&')
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2])
}

export const isScreenSize = {
  smallerThan: size => {
    return window.innerWidth < size
  },
  largerThan: size => {
    return window.innerWidth > size
  }
}

export const ellipsis = (string, length) => {
  if (!string) return null
  if (string.length > length) {
    return `${string.slice(0, length)}...`
  } else {
    return string
  }
}

export const dataURItoBlob = dataURI => {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1])
  else byteString = unescape(dataURI.split(',')[1])

  // separate out the mime component
  let mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split('')[0]

  // write the bytes of the string to a typed array
  let ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new Blob([ia], { type: mimeString })
}
