// import { redColor } from '../../config/constants'

export const mainPaper = {
  maxHeight: 'calc(100vh - 200px)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  border: '1px solid black',
  p: 2,
}

export const calendarGrid = {
  display: 'grid',
  gridTemplateColumns: `${100 / 7}% ${100 / 7}% ${100 / 7}% ${100 / 7}% ${100 / 7}% ${100 / 7}% ${100 / 7}%`,
  gridTemplateRows: '20% 20% 20% 20% 20%',
}

export const downMark = (color) => {
  return {
    borderRight: `5px solid transparent`,
    borderLeft: `5px solid ${color}`,
    borderTop: `5px solid transparent`,
    borderBottom: `5px solid ${color}`,
    position: 'absolute',
    bottom: '0px',
    left: '0px',
    minHeight: '0px',
    minWidth: '0px'
  }
}

export const logoStyle = {
  maxHeight: '80px',
  maxWidth: '80px',
  alignSelf: 'center',
  justifySelf: 'center'
}

export const versusStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'CorsaGrotesk',
  fontWeight: 'bold',
  fontSize: '18px',
  pb: '5px'
}