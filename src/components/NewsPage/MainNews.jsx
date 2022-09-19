import { Box, CardMedia, Stack } from '@mui/material'
import { newsTime } from '../../common/help-functions'
import { dateNewsStyle, mainNewsImage, mainTextStyle, mainTitleStyle } from './styles'
import sanitizeHtml from 'sanitize-html'
import parse from 'html-react-parser'


const MainNews = ({data}) => {
  const cleanHTML = sanitizeHtml(data.text, { allowedTags: ['p', 'br', 'strong', 'a'] })

  return (
    <Box width='100%' maxHeight='270px'>
      <Stack direction='row' sx={{maxWidth: '1300px'}}>
        <CardMedia component='img' image={data.coverPhoto.address} sx={mainNewsImage}/>
        <Box ml={2}>
          <Box sx={mainTitleStyle}>{data.title}</Box>
          <Box sx={mainTextStyle}> { parse(cleanHTML) }</Box>
          <Box mt={1} sx={dateNewsStyle}>{newsTime(data.createdAt)}</Box>
        </Box>
      </Stack>
    </Box>
  )
}

export default MainNews