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

export const mainTitleStyle = {
  fontFamily: 'CorsaGrotesk',
  fontWeight: 'bold',
  letterSpacing: '0.5px',
  fontSize: '20px',
  maxWidth: '100%',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  }
}

export const mainNewsImage = {
  maxWidth: '398px',
  minHeight: '273px',
  maxHeight: '273px',
  border: '1px solid #e0e0e0'
}

export const mainTextStyle = {
  fontFamily: 'CorsaGrotesk',
  fontSize: '13px',
  maxWidth: '884px',
  maxHeight: '180px',
  display: '-webkit-box',
  lineHeight: '1.5',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: 8,
  WebkitBoxOrient: 'vertical'
}

export const dateNewsStyle = {
  fontFamily: 'CorsaGrotesk',
  fontSize: '13px',
  color: redColor,
  pb: 0.2,
}

export const smallNewsImage = {
  maxWidth: '299px',
  minWidth: '299px',
  minHeight: '190px',
  maxHeight: '190px',
  border: '1px solid #e0e0e0',
  mb: 1
}

export const smallTitleStyle = {
  fontFamily: 'CorsaGrotesk',
  fontSize: '14px',
  maxWidth: '301px',
  display: '-webkit-box',
  lineHeight: '1.5',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  fontWeight: 'bold',
  letterSpacing: '0.5px',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  }
}