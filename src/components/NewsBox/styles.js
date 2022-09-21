import { redColor } from '../../config/constants'

export const loaderBox = {
  width: '978px',
  maxWidth: '978px',
  height: '495px',
  maxHeight: '495px',
  border: '1px solid black',
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'CorsaGrotesk',
  fontSize: '30px',
  filter: 'drop-shadow(2px 2px 2px rgb(0 0 0 / 0.8))',
}

export const stackStyle = {
  width: '978px',
  minWidth: '978px',
  maxWidth: '978px',
  height: '495px',
  maxHeight: '495px',
  border: '1px solid black',
  backgroundColor: 'white',
  filter: 'drop-shadow(2px 2px 2px rgb(0 0 0 / 0.8))',
}

export const titleStyle = {
  color: redColor,
  mb: 0.5,
  fontFamily: 'CorsaGrotesk',
  fontSize: '13px'
}

export const activeTitleStyle = {
  color: 'white',
  mb: 0.5,
  fontFamily: 'CorsaGrotesk',
  fontSize: '13px'
}

export const contentStyle = {
  fontFamily: 'CorsaGrotesk',
  fontSize: '14px',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline'
  }
}

export const dateBoxStyle = {
  width: '99px',
  minWidth: '99px',
  maxWidth: '99px',
  height: '100%',
  backgroundColor: redColor,
  display: 'flex',
  flexDirection: 'column'
}

export const dateNumberStyle = {
  display: 'flex',
  justifyContent: 'center',
  fontFamily: 'CorsaGrotesk',
  color: 'white',
  height: 'calc(100% - 30px)',
  fontSize: '40px'
}

export const dateMonthStyle = {
  fontFamily: 'CorsaGrotesk',
  backgroundColor: '#a4181d',
  pt: '6px',
  color: 'white',
  fontSize: '12px',
  textAlign: 'center',
  letterSpacing: '1px',
  minHeight: '24px'
}

export const currentTitleStyle = {
  fontWeight: 'bold',
  mb: 0.5,
  fontFamily: 'CorsaGrotesk',
  fontSize: '14px'
}

export const currentContentStyle = {
  fontFamily: 'CorsaGrotesk',
  fontSize: '13px',
  lineHeight: 1.5
}

export const leftSideStyle = {
  width: '650px',
  minWidth: '650px',
  height: '495px',
  maxHeight: '495px',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative'
}

export const activeMarkerStyle = {
  borderRight: '24.75px solid red',
  borderLeft: '24.75px solid transparent',
  borderTop: '49.5px solid transparent',
  borderBottom: '49.5px solid transparent'
}

export const markerStyle = {
  borderRight: '24.75px solid transparent',
  borderLeft: '24.75px solid transparent',
  borderTop: '49.5px solid transparent',
  borderBottom: '49.5px solid transparent'
}

export const newsTab = {
  height: '99px',
  maxHeight: '99px',
  borderLeft: '1px solid #e0e0e0',
  display: 'flex',
  flexDirection: 'column'
}

export const currentNewsTab = {
  height: '99px',
  maxHeight: '99px',
  borderLeft: `1px solid transparent`,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'red'
}