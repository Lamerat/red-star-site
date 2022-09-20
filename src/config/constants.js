import { Autoplay, Pagination } from 'swiper'

export const API = 'https://hockey-site-dev.herokuapp.com'
// export const API = 'http://localhost:5000'

export const TEAM_ID = '62f77ca15f4578ea5efbed89'

export const redColor = '#e31e24'

export const trainingImage = 'https://lamerat.github.io/ChervenaZvezda/images/training.png'

export const overtimeTranslate = {
  draw: 'равен',
  penalties: 'наказателни удари',
  overtime: 'продължение'
}

export const mainPageSwiper = {
  loop: true,
  slidesPerView: 5,
  spaceBetween: 24,
  autoplay: { delay: 2500, disableOnInteraction: false },
  style: { maxHeight: '109px', maxWidth: '980px' },
  modules: [Autoplay]
}

export const singNewsPageSwiper = {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 0,
  autoplay: { delay: 10000, disableOnInteraction: true },
  style: { maxHeight: '400px', maxWidth: '634px' },
  modules: [Autoplay, Pagination]
}