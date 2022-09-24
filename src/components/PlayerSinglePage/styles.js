import { redColor } from '../../config/constants'

export const mainPaper = {
  maxHeight: 'calc(100vh - 200px)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  border: '1px solid black',
  p: 2,
}

export const visitCardStyle = {
  ml: 2,
  borderTop: '1px solid #e0e0e0',
  borderRight: '1px solid #e0e0e0',
  fontFamily: 'CorsaGrotesk',
  position: 'relative'
}

export const numberBoxStyle = {
  pt: '5px',
  minHeight: '94px',
  maxHeight: '94px',
  minWidth: '99px',
  maxWidth: '99px',
  backgroundColor: redColor,
  color: 'white',
  borderBottom: '1px solid #e0e0e0',
  borderLeft: '1px solid #e0e0e0',
  // filter: 'drop-shadow(-4px 4px 0px black)',
  fontSize: '55px',
  fontWeight: 'bold',
  letterSpacing: '4px',
  textAlign: 'center',
  textShadow: '3px 3px 0px black',
  position: 'absolute',
  right: 0,
  top: 0
}