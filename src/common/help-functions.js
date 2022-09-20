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
export const createCalendarArray = () => {
  const firstDay = Number(moment().startOf('month').format('d').toString())
  const bigDate = Number(moment().endOf('month').format('DD').toString())
  const calendar = Array.apply(null, {length: firstDay - 1}).map(x => x = null)
  for (let i = 1; i <= bigDate; i++) calendar.push(i)
  while (calendar.length < 35) calendar.push(null)

  return calendar
}