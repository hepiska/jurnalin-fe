
// import dayjs from 'dayjs'

export const queryStringToObject = (str) => {
  return str.replace("?","").split("&").reduce((acc, _dat) => {
      const newAcc= {...acc}
      const[key, val] = _dat.split("=")
      newAcc[key]= val
      return newAcc
  },{})
}




const currencyNum = inp => {
  const a = inp
    .split('')
    .reverse()
    .join('')
    .match(/.{1,3}/g)
    .join('.')
    .split('')
    .reverse()
    .join('')
  return a
}

export const formatRupiah = value => {
  if (!value) {
    return 'Rp 0'
  }
  return `Rp ${currencyNum(String(value))}`
}

export const formatCur = value => {
  if (!value) {
    return '0'
  }
  return `${currencyNum(String(value))}`
}

export const moveToFront = (a , fn) => {
  let non_matches = []
  var matches = a.filter(function(e ,i, a) {
    let match = fn(e, i, a)
    if (!match) non_matches.push(e)
    return match
  })
  return matches.concat(non_matches)
}

export const capitalEachWord = str =>
  str
    .split(' ')
    .map(word => {
      let firstChar = word[0].toUpperCase()

      return firstChar + word.substring(1, word.length)
    })
    .join(' ')

export const checkHex = hex => /^#[0-9A-F]{6}$/i.test(hex)

export const setImage = (uri, size, params) => {
  const defaultParams = '&fit=clamp'
  let queryString = `?`
  if (size.width) {
    queryString += `&width=${Math.round(size.width)}`
  }
  if (size.height) {
    queryString += `&height=${Math.round(size.height)}`
  }
  if (params) {
    queryString += `${params}`
  } else {
    queryString += defaultParams
  }

  const res =
    uri
      .replace(Config.SHONET_AWS_IMAGE_BASE, Config.SHONET_IMGIX_IMAGE_BASE)
      .replace(/(\?.*)/, '') + queryString
  return res
}

export const textElipsis = (val, maxLimit) => {
  if (val.length > maxLimit) {
    return val.substring(0, maxLimit - 3) + '...'
  }
  return val
}



export const deepClone = obj => JSON.parse(JSON.stringify(obj))

export const removeLineBreak = text => text.replace(/(\r\n|\n|\r)/gm, ' ')

export const splitCamelCaseToString = s => {
  return s
    .split(/(?=[A-Z])/)
    .map(function(p) {
      return p.charAt(0).toUpperCase() + p.slice(1)
    })
    .join(' ')
}





export const queryStringToObj = qs => {
  qs = qs.replace('?', '')

  const result = qs.split('&').reduce((obj, keyvalue) => {
    const [key, value] = keyvalue.split('=')
    obj[key] = value
    return obj
  }, {})
  return result
}


export const getNotLoginCart = () => {
  if (global.store) {
    const allCarts = global.store.getState().carts.data
    const unSyncId = Object.keys(allCarts).filter(v => {
      if (allCarts[v].remark === 'offline') return allCarts[v]
    })
    const unSyncData = unSyncId.map(v => allCarts[v])
    return unSyncData
  }
}

export const countdown = (date, callback, onEndCallback) => {
  return setInterval(() => {
    const now = new Date()
    const distance = date.getTime() - now.getTime()

    if (distance <= 1 && onEndCallback) {
      onEndCallback()
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)
    if (distance >= 1) {
      callback({ days, hours, minutes, seconds })
    }
  }, 1000)
}



export const calculateYear = year => {
  const now = dayjs()
  const min_dob = now.subtract(year, 'year')
  return min_dob.toISOString()
}

export const calculateDay = day => {
  const now = dayjs()
  const _day = dayjs(day)

  let convertion = ''
  let res = 0
  let year = now.diff(_day, 'year')
  let month = now.diff(_day, 'month')
  let days = now.diff(_day, 'day')
  let hour = now.diff(_day, 'hour')
  let minute = now.diff(_day, 'minute')
  let second = now.diff(_day, 'second')

  if (year < 1) {
    if (month < 1) {
      if (days < 1) {
        if (hour < 1) {
          if (minute < 0) {
            res = second
            convertion = 'seconds'
          } else {
            res = minute
            convertion = 'minutes'
          }
        } else {
          res = hour
          convertion = 'hours'
        }
      } else {
        res = days
        convertion = 'days'
      }
    } else {
      res = month
      convertion = 'months'
    }
  } else {
    res = year
    convertion = 'years'
  }

  return 'about ' + res + ' ' + convertion + ' ago'
}

export const countlongCreate = time => {
  const timeDif = calculateTimeDifference(time)
  if (timeDif.year) {
    return timeDif.year + ' years ago'
  }
  if (timeDif.month) {
    return timeDif.month + ' months ago'
  }
  if (timeDif.week) {
    return timeDif.week + ' weeks ago'
  }
  if (timeDif.days) {
    return timeDif.days + ' days ago'
  }
  if (timeDif.hours) {
    return timeDif.hours + ' hours ago'
  }
  if (timeDif.minutes) {
    return timeDif.minutes + ' minutes ago'
  } else {
    return ' Less than a minutes ago'
  }
}

export const calculateTimeDifference = date => {
  const now = dayjs()
  const _day = dayjs(date)

  let year = now.diff(_day, 'year')
  let month = now.diff(_day, 'month')
  let week = now.diff(_day, 'week')
  let days = now.diff(_day, 'day')
  let hours = now.diff(_day, 'hour')
  let minutes = now.diff(_day, 'minute')

  return { year, month, week, days, hours, minutes, now }
}

export const removeHeaderWebviewScript = `(function() {
  var header = document.getElementsByClassName("header-container");
  header[0].remove();
  var mainWrapper = document.getElementsByClassName("main-wrapper");
  if(mainWrapper[0]){
    mainWrapper[0].style.paddingTop = "15px";
  }
  var footer = document.getElementsByClassName("footer-nav"); 
  if( footer[0]){
    footer[0].remove();

  }
})()
true;
`

export const removeHeaderWebviewCreateJurnalScript = `(function() {
  var header = document.getElementsByClassName("header-container");
  header[0].remove();
 
  header[0].style.paddingTop="16px"
  if(mainWrapper[0]){
    mainWrapper[0].style.paddingTop = "8px";
  }
  var footer = document.getElementsByClassName("footer-nav"); 
  if( footer[0]){
    footer[0].remove();

  }
})()
true;
`
function paramsToObject(str) {
  return str.split('&').reduce((acc, _data) => {
    const [key, data] = _data.split('=')
    if (data.split(',').length > 1) {
      console.log('masuk sini')
      acc[key] = data.split(',')
    } else {
      acc[key] = data
    }
    return acc
  }, {})
}

export const getQueryParamObj = (queryparams) => {
  const params = paramsToObject(queryparams)
  // console.log('[[[[[[', params)
  return params
}

export const urlScreenMap = url => {
  const clearUrl = url.replace(Config.SHONET_URI, '')
  const arrUrl = clearUrl.split('/').filter(a => Boolean(a))
  return arrUrl
}



