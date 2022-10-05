import { redColor } from '../../config/constants'
import { isMobile } from 'react-device-detect'

export const loaderBox = {
  maxWidth: isMobile ? '100%' : '328px',
  minWidth: '328px',
  minHeight: '152px',
  maxHeight: '152px',
  border: '1px solid black',
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  filter: 'drop-shadow(2px 2px 2px rgb(0 0 0 / 0.8))',
}

export const mainBox = {
  maxWidth: isMobile ? '100%' : '328px',
  minWidth: '328px',
  backgroundColor: 'white',
  border: isMobile ? null : '1px solid black',
  display: 'flex',
  flexDirection: 'column',
  filter: isMobile ? null : 'drop-shadow(2px 2px 2px rgb(0 0 0 / 0.8))',
  minHeight: isMobile ? null : '152px',
  maxHeight: isMobile ? null : '152px',
}

export const titleBox = {
  backgroundColor: redColor,
  width: 'calc(100% - 16px)',
  maxWidth: 'calc(100% - 16px)',
  borderBottom: isMobile ? null : '1px solid black',
  color: 'white',
  fontFamily: 'CorsaGrotesk',
  minHeight: '17px',
  fontSize: '13.5px',
  letterSpacing: '0.5px',
  fontWeight: 'bold',
  display: 'flex',
  justifyContent: 'space-between',
  p: '5.5px 8px 10.5px 8px',
}

export const dateTextStyle = {
  fontSize: '12px',
  m: '2px 0px 0px 0px'
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

export const logoStyle = {
  maxHeight: '82px',
  maxWidth: '82px',
  alignSelf: 'center',
  justifySelf: 'center'
}