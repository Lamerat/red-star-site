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

export const otherEventBoxStyle = {
  mt: 2.5,
  p: 1,
  fontSize: '11px',
  display: '-webkit-box',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  letterSpacing: '0.5px',
  maxHeight: '45px',
  maxWidth: '162px',
  lineHeight: '1.5',
  textAlign: 'justify'
}

export const otherEventRowStyle = {
  p: '12px',
  fontSize: '13px',
  display: '-webkit-box',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: 4,
  WebkitBoxOrient: 'vertical',
  letterSpacing: '0.5px',
  width: '960px',
  lineHeight: '1.6',
  textAlign: 'justify',
  maxHeight: '76px'
}

export const boxMainStyle = {
  minHeight: '85px',
  maxHeight: '85px',
  border: '1px solid lightgray',
  backgroundColor: '#eeeeee',
  m: 0.5, position: 'relative',
  fontFamily: 'CorsaGrotesk',
  cursor: 'pointer'
}

export const boxDayNumber = {
  position: 'absolute',
  top: '4px',
  left: '8px',
  fontSize: '12px',
  color: 'darkgray'
}

export const outMontBox = {
  minHeight: '85px',
  maxHeight: '85px',
  border: '1px dashed #ebeff2',
  m: 0.5
}

export const rowTimeStyle = {
  fontFamily: 'CorsaGrotesk',
  fontSize: '13px',
  pb: 0.2,
}

export const detailPreviewMain = {
  backgroundColor: 'white',
  backgroundImage: 'url(../../wp.jpg)',
  backgroundSize: 'cover',
  color: 'white'
}

export const detailPreviewWhite = {
  backgroundColor: 'white',
  color: 'black',
  fontSize: '14px'
}


export const topPreview = {
  display: 'grid',
  gridTemplateColumns: '90px calc((100% - 90px) / 2) calc((100% - 90px) / 2)',
  minHeight: '69px',
  p: 1.5,
  pb: 1,
  backgroundColor: 'white',
}

export const detailTrainingImage =  {
  maxHeight: '150px',
  minHeight: '150px',
  maxWidth: '150px',
  minWidth: '150px',
  ml: -2,
  float: 'left'
}