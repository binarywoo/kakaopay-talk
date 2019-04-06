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
