import { redColor } from "../../config/constants"

export const mainPaper = {
  maxHeight: 'calc(100vh - 200px)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  border: '1px solid black',
  p: 2,
}

export const newsBox = {
  columnCount: 2,
  columnGap: 4,
  position: 'relative',
  pt: '432px',
  fontFamily: 'CorsaGrotesk',
  fontSize: '14px',
  textAlign: 'justify',
}

export const imageWrapper = {
  minWidth: '634px',
  minHeight: '432px',
  maxHeight: '432px',
  position: 'absolute',
  top: 0,
  right: 0
}


export const dateStyle = {
  mt: 1,
  color: redColor,
  fontWeight: 'bold'
}


export const dividerWrapper = {
  position: 'absolute',
  pb: 2,
  left: '50%',
  height: '100%',
  width: '1px',
  marginTop: '-432px',
  display: 'flex',
  justifyContent: 'center'
}