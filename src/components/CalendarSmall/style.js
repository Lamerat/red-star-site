import { redColor } from '../../config/constants'

export const loaderBox = {
  minWidth: 'calc(100% - 2px)',
  height: '495px',
  maxHeight: '274px',
  border: '1px solid black',
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  filter: 'drop-shadow(2px 2px 2px rgb(0 0 0 / 0.8))',
}

export const mainBox = {
  minWidth: 'calc(100% - 2px)',
  backgroundColor: 'white',
  border: '1px solid black',
  display: 'flex',
  flexDirection: 'column',
  filter: 'drop-shadow(2px 2px 2px rgb(0 0 0 / 0.8))'
}

export const titleBox = {
  backgroundColor: redColor,
  width: 'calc(100% - 16px)',
  maxWidth: 'calc(100% - 16px)',
  borderBottom: '1px solid black',
  color: 'white',
  fontFamily: 'CorsaGrotesk',
  minHeight: '17px',
  fontSize: '13.5px',
  letterSpacing: '0.5px',
  fontWeight: 'bold',
  display: 'flex',
  justifyContent: 'space-between',
  p: '5.5px 8px 10.5px 8px',
  textTransform: 'uppercase'
}

export const dateBox = {
  aspectRatio: '1/1',
  backgroundColor:'#9e9e9e',
  m: '0.5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'CorsaGrotesk',
  color: 'white',
  fontSize: '14px',
  letterSpacing: '0.5px',
}


export const dateBoxActive = {
  ...dateBox,
  backgroundColor: '#424242',
  cursor: 'pointer'
}

export const popoverPaper = {
  borderRadius: 0,
  p: 0.5,
  filter: 'drop-shadow(2px 0px 2px rgb(0 0 0 / 0.8))',
  minWidth: '328px',
  border: '1px solid black',
  zIndex: 100,
  backgroundColor: '#eeeeee'
}

export const popoverTitle = {
  display: 'grid',
  gridTemplateColumns:'20% 40% 40%',
  backgroundColor: redColor,
  color: 'white',
  fontFamily: 'CorsaGrotesk',
  minHeight: '50px'
}

export const logoStyle = {
  maxHeight: '82px',
  maxWidth: '82px',
  alignSelf: 'center',
  justifySelf: 'center'
}

export const versusStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'CorsaGrotesk',
  fontWeight: 'bold',
  fontSize: '35px',
  pb: '5px'
}

export const overTimeStyle = {
  fontFamily: 'CorsaGrotesk',
  fontSize: '10px',
  minHeight: '15px'
}

export const partsStyle = {
  fontFamily: 'CorsaGrotesk',
  fontSize: '10px',
  justifyContent: 'space-between',
  letterSpacing: '1px',
  minHeight: '15px'
}

export const popupDateStyle= {
  alignSelf: 'top',
  justifySelf: 'center',
  fontSize: '35px',
  pb: 0.5,
  letterSpacing: '1px',
}

export const elementsBox = {
  display: 'grid',
  p: 0.5,
  gridTemplateColumns: `${100 / 7}% ${100 / 7}% ${100 / 7}% ${100 / 7}% ${100 / 7}% ${100 / 7}% ${100 / 7}%`,
  gridTemplateRows: '20% 20% 20% 20% 20%',
}