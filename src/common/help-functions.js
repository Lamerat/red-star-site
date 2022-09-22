import moment from 'moment-timezone'
import 'moment/locale/bg'

export const formatDate = (date) => moment(date).format('DD MMMM YYYY').toString()

export const getDayNumber = (date) => moment(date).format('DD').toString()

export const getMonth = (date) => moment(date).format('MMMM').toString()

export const getYear = (date) => moment(date).format('YYYY').toString()

export const getDayName = (date) => moment(date).format('dddd').toString()

export const getTime = (date) => moment(date).format('HH:mm').toString()

export const newsTime = (date) => {
  const today = moment()
  if (moment(date).isSame(today, 'd')) return moment(date).format('Днес - HH:mm ч.').toString()
  return moment(date).format('DD MMMM YYYY - HH:ss ч.')
}

export const playerBirthDate = (date) => moment(date).format('DD.MM.YYYY г.')

/**
 * Create calendar
 * @returns {Array}
 */
export const createCalendarArray = (date) => {
  
  const firstDay = Number(moment(date || new Date()).startOf('month').format('d').toString())
  const bigDate = Number(moment(date || new Date()).endOf('month').format('DD').toString())
  const calendar = Array.apply(null, {length: firstDay - 1}).map(x => x = null)
  for (let i = 1; i <= bigDate; i++) calendar.push(i)
  while (calendar.length < 35) calendar.push(null)
  
  if (calendar.length > 35) {
    const lastDates = calendar.slice(35)
    lastDates.forEach((x, index) => calendar[index] = x)
  }

  return calendar.slice(0, 35)
}