import moment from 'moment-timezone'
import 'moment/locale/bg'

export const formatDate = (date) => moment(date).format('DD MMMM YYYY').toString()

export const getDayNumber = (date) => moment(date).format('DD').toString()

export const getMonth = (date) => moment(date).format('MMMM').toString()