import { redColor } from '../../config/constants'

export const mainPaper = {
  maxHeight: 'calc(100vh - 200px)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  border: '1px solid black',
  p: 2,
  fontFamily: 'CorsaGrotesk',
}

export const numberStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  minWidth: '49px',
  minHeight: '45px',
  color: 'white',
  backgroundColor: redColor,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'CorsaGrotesk',
  fontWeight: 'bold',
  fontSize: '28px',
  pb: '4px',
  letterSpacing: '1px',
  borderLeft: '1px solid #e0e0e0',
  borderBottom: '1px solid #e0e0e0',
  textShadow: '2px 2px 1px black',
}

export const infoStyle = {
  maxWidth: '100%',
  minHeight: '95px',
  p: 1
}