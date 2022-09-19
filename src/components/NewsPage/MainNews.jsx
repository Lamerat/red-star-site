import { Box, CardMedia, Stack } from '@mui/material'
import { newsTime } from '../../common/help-functions'
import { redColor } from '../../config/constants'
import { dateNewsStyle, mainNewsImage, mainTextStyle, mainTitleStyle } from './styles'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import sanitizeHtml from 'sanitize-html'
import parse from 'html-react-parser'


const MainNews = ({data}) => {
  const cleanHTML = sanitizeHtml(data.text, { allowedTags: ['p', 'br', 'strong', 'a'] })

  return (
    <Box width='100%' maxHeight='275px'>
      <Stack direction='row' sx={{maxWidth: '1300px'}}>
        <CardMedia component='img' image={data.coverPhoto.address} sx={mainNewsImage}/>
        <Box ml={2}>
          <Box sx={mainTitleStyle}>{data.title}</Box>
          <Box sx={mainTextStyle}> { parse(cleanHTML) }</Box>
          <Box mt={1} display='flex' alignItems='center'>
            <AccessTimeIcon sx={{fontSize: '16px', mr: '2px', color: redColor}} />
            <Box sx={dateNewsStyle}>{newsTime(data.createdAt)}</Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}

export default MainNews