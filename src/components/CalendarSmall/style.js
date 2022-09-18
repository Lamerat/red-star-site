import { redColor } from '../../config/constants'

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
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'CorsaGrotesk',
  color: 'white',
  fontSize: '14px',
  letterSpacing: '0.5px',
}