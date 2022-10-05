import React, { useState, useEffect, useRef } from 'react'
import { isMobile } from 'react-device-detect'
import { Box, Stack, CardMedia } from '@mui/material'
import { activeMarkerStyle, activeTitleStyle, contentStyle, currentContentStyle, currentNewsTab, currentTitleStyle, dateBoxStyle, dateMonthStyle,
  dateNumberStyle, leftSideStyle, loaderBox, markerStyle, newsTab, stackStyle, titleStyle, mobileTitleBox, mobileImageStyle
} from './styles'
import { formatDate, getDayNumber, getMonth } from '../../common/help-functions'
import { listNewsRequest } from '../../api/news'
import { useNavigate } from 'react-router-dom'
import sanitizeHtml from 'sanitize-html'
import CircularProgress from '@mui/material/CircularProgress'
import { ENV, redColor } from '../../config/constants'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const NewsBox = () => {
  const firstRenderRef = useRef(true)

  const [news, setNews] = useState(null)
  const [currentNews, setCurrentNews] = useState(0)

  const history = useNavigate()

  useEffect(() => {
    if (!news || isMobile) return
    const checkForMessages = setInterval(() => {
      if (currentNews >= news.length - 1) {
        setCurrentNews(0);
      } else {
        setCurrentNews(currentNews + 1)
      }
    }, 5000)

    return () => clearInterval(checkForMessages);
  }, [currentNews, news])


  useEffect(() => {
    if (firstRenderRef.current && ENV === 'development') {
      firstRenderRef.current = false
      return
    }

    listNewsRequest({ pageSize: 5 })
      .then(x => x.json())
      .then(result => {
        if (!result.success) throw new Error(result.message)
        setNews(result.payload.docs)
      })
      .catch(e => console.log(e.message))
  }, [])


  const htmlTextFix = (htmlText) => {
    const simpleText = sanitizeHtml(news[currentNews].text, { allowedTags: []})
    if (simpleText.length > 180) {
      return `${simpleText.slice(0, 180)} ...`
    }
    return simpleText
  }


  if (isMobile && !news) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '230px' }}><CircularProgress size='100px' /></Box>

  if (isMobile) return (
    <React.Fragment>
      <Swiper
        loop={false}
        autoplay={{delay: 5000, disableOnInteraction: false}}
        modules={[Autoplay]}
        pagination={{ clickable: true }}
        onRealIndexChange={index => setCurrentNews(index.activeIndex)}
      >
        {
          news.map((el, index) => 
            <SwiperSlide key={el._id} style={{width: '100vh'}}>
              <Box>
                <Box sx={{position: 'relative'}}>
                  <CardMedia component='img' image={el.coverPhoto.address} sx={mobileImageStyle}/>
                  <Box sx={mobileTitleBox}>
                    {el.title}
                  </Box>
                </Box>
              </Box>
            </SwiperSlide>
          )
        }
      </Swiper>
      <Stack sx={{ minHeight: '3px', mt: 0.5}} direction='row' spacing={0.5}>
        {
          Array(news.length).fill(0).map((_, index) => 
            <Box key={index} sx={{ minWidth: `calc((100% - ${news.length - 1} * 4px)/${news.length})`, backgroundColor: 'gray', position: 'relative' }}>
              {
                index <= currentNews
                  ? index === currentNews ?  <Box className='loader'></Box> : <Box sx={{ backgroundColor: redColor, width: '100%', height: '3px' }}></Box>
                  : null
              }
            </Box>
          )
        }
      </Stack>
    </React.Fragment>
  )


  if (!news) return <Box sx={loaderBox}><CircularProgress size='200px' /></Box>

  if (!news.length) return <Box sx={loaderBox}>НЯМА НАМЕРЕНИ НОВИНИ</Box>

  return (
    <Stack direction='row' spacing={0} sx={stackStyle}>
      <Box sx={leftSideStyle}>
        <Box position='absolute' right={0}>
          { news.map((el, index) => <Box key={el._id} sx={index === currentNews ? activeMarkerStyle : markerStyle } />) }
        </Box>
        <CardMedia component='img' image={news[currentNews].coverPhoto.address} sx={{maxHeight: 'calc(100% - 100px)', height: 'calc(100% - 100px)', borderBottom: '1px solid #e0e0e0'}}/>
        <Box sx={{ height: '99px', minHeight: '99px', backgroundColor: 'white', display: 'flex' }}> 
          <Box sx={dateBoxStyle}>
            <Box sx={dateNumberStyle}>{getDayNumber(news[currentNews].createdAt)}</Box>
            <Box sx={dateMonthStyle}>{getMonth(news[currentNews].createdAt)}</Box>
          </Box>
          <Box p={1}>
            <Box sx={currentTitleStyle}>{ news[currentNews].title.length > 60 ? `${news[currentNews].title.slice(0, 60)} ...` : news[currentNews].title }</Box>
            <Box sx={currentContentStyle}>{ htmlTextFix(news[currentNews].text) }</Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: '100%' }}>
        {
          news.map((el, index) => (
            <Box key={el._id} sx={index === currentNews ? currentNewsTab : newsTab}>
              <Box sx={{ p: '10px', maxHeight: 'calc(100% - 21px)', height: '100%' }}>
                <Box sx={index === currentNews ? activeTitleStyle : titleStyle}>{ formatDate(el.createdAt) }</Box>
                <Box sx={contentStyle} onClick={() => history(`/news/${el._id}`)}>{ el.title.length > 95 ? `${el.title.slice(0, 95)} ...` : el.title }</Box>
              </Box>
              {
                index < news.length - 1 && index !== currentNews
                  ? <Box sx={{ ml: '10px', mr: '10px', borderBottom: '1px solid #e0e0e0', justifySelf: 'flex-end'}} />
                  : null
              }
            </Box>
          ))
        }
      </Box>
    </Stack>
  )
}

export default NewsBox