import { redColor } from '../../config/constants'

export const menuBarStyle = {
  minWidth: '100%',
  height: '36px',
  maxHeight: '36px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  filter: 'drop-shadow(2px 2px 2px rgb(0 0 0 / 0.8))',
  backgroundColor: redColor,
  fontFamily: 'CorsaGrotesk',
  color: 'white',
  letterSpacing: '1px',
  fontWeight: 'bold',
  fontSize: '14px',
  zIndex: 100,
}

export const separatorStyle = {
    minWidth: '1px',
    width: '1px',
    borderLeft: `1px solid white`,
    minHeight: '20px'
}

export const buttonStyle = {
  height: '18px',
  p: '6.5px 16px 11.5px 16px',
  cursor: 'pointer',
  position: 'relative',
  '&:hover': { backgroundColor: '#a4181d' }
}

export const dropDown = {
  backgroundColor: '#b2b2b2',
  color: '#666666',
  fontWeight: 'normal',
  position: 'absolute',
  left: 0,
  top: 36,
  zIndex: 100,
}

export const menuItem = {
  height: '18px',
  fontSize: '14px',
  p: '6.5px 16px 11.5px 16px',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
  '&:hover': { color: 'black' }
}

export const titleStyle = {
  maxHeight: '64px',
  fontFamily: 'Dusha',
  color: 'white',
  fontSize: '60px',
  textShadow: '3px 3px 3px black',
  letterSpacing: '1px',
}