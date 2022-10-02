export const titleStyleMobile = {
  fontFamily: 'Dusha',
  color: 'white',
  fontSize: '2rem',
  letterSpacing: '1px',
  pl: 2,
  width: '100%',
  pt: 1.2,
  textShadow: '1.5px 1.5px 1.5px black'
}


export const mobileMenuRow = {
  ml: 1.5,
  mr: 1.5,
  pt: 1.5,
  pb: 1.5,
  borderBottom: '1px solid rgb(255, 255, 255, 0.4)'
}

export const mobileMenuRowWithSub = (open) => {
  return {
    ml: 1.5,
    mr: 1.5,
    pt: '11px',
    pb: open ? 0 : '11px',
    borderBottom: '1px solid rgb(255, 255, 255, 0.4)'
  }
}

export const rotateAngle = (direction) => {
  return {
    color: 'white',
    transform: `rotate(${ direction ? 90 : 0}deg)`,
    fontSize: '29px'
  }
}