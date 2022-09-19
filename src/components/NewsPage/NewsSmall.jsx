import { Box, CardMedia } from '@mui/material'
import { newsTime } from '../../common/help-functions'
import { redColor } from '../../config/constants'
import { smallTitleStyle, smallNewsImage, dateNewsStyle } from './styles'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

const NewsSmall = ({data}) => {
  return (
    <Box minHeight='280px' display='grid' mt={0}>
      <Box>
        <CardMedia component='img' image={data.coverPhoto.address} sx={smallNewsImage}/>
        <Box sx={smallTitleStyle}>{data.title}</Box>
      </Box>
      <Box mt={1} display='flex' alignItems='center'>
        <AccessTimeIcon sx={{fontSize: '16px', mr: '2px', color: redColor}} />
        <Box sx={dateNewsStyle}>{newsTime(data.createdAt)}</Box>
      </Box>
    </Box>
  )
}

export default NewsSmall