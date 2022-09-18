import { createCalendarArray } from '../../common/help-functions.js'
import { Box } from '@mui/material'
import { dateBox, mainBox, titleBox } from './style.js'

const CalendarSmall = () => {
  const calendar = createCalendarArray()

  const colSize = 100 / 7

  return (
    <Box sx={mainBox}>
      <Box sx={titleBox}>
        <Box>Септември</Box>
        <Box>2022</Box>
      </Box>
      <Box sx={{
        display: 'grid',
        p: 0.5,
        gridTemplateColumns: `${colSize}% ${colSize}% ${colSize}% ${colSize}% ${colSize}% ${colSize}% ${colSize}%`,
        gridTemplateRows: '20% 20% 20% 20% 20%',
        
      }}>
        {
          calendar.map((el, index) => <Box key={index} sx={dateBox}>{el}</Box>)
        }
      </Box>
    </Box>
  )
}

export default CalendarSmall