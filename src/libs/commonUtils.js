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

export const linkify = inputText => {
  let replacedText, replacePattern1, replacePattern2, replacePattern3

  //URLs starting with http://, https://, or ftp://
  replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim
  replacedText = inputText.replace(
    replacePattern1,
    '<a href="$1" target="_blank">$1</a>'
  )

  //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim
  replacedText = replacedText.replace(
    replacePattern2,
    '$1<a href="http://$2" target="_blank">$2</a>'
  )

  //Change email addresses to mailto:: links.
  replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim
  replacedText = replacedText.replace(
    replacePattern3,
    '<a href="mailto:$1">$1</a>'
  )

  return replacedText
}

export const toArray = object => {
  const keys = Object.keys(object)
  return keys.map(key => object[key])
}
