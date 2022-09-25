import React from 'react'
import { Container, Box, CardMedia, Grid } from '@mui/material'


const tempData = [
  {
    _id: 1,
    image: 'https://iili.io/saRaEb.png',
    description: 'Хокейна екипировка',
    link: 'https://hockeycamel.com/'
  },
  {
    _id: 2,
    image: 'https://iili.io/sYyedQ.png',
    description: 'Някакво описание',
    link: 'https://us.ccmhockey.com/'
  },
  {
    _id: 3,
    image: 'https://iili.io/sYbk7I.png',
    description: 'Някакво описание',
    link: 'https://us.ccmhockey.com/'
  },
  {
    _id: 4,
    image: 'https://iili.io/saBwJe.png',
    description: 'Някакво описание',
    link: 'https://us.ccmhockey.com/'
  },
  {
    _id: 5,
    image: 'https://iili.io/saCkYX.png',
    description: 'Някакво описание',
    link: 'https://us.ccmhockey.com/'
  },
  {
    _id: 6,
    image: 'https://iili.io/saaD0u.png',
    description: 'Някакво описание',
    link: 'https://github.com/'
  },
  {
    _id: 7,
    image: 'https://iili.io/sa7dxt.png',
    description: 'Някакво описание',
    link: 'https://www.fightscout.app/'
  },
  {
    _id: 8,
    image: 'https://iili.io/salD9j.png',
    description: 'Някакво описание',
    link: 'https://www.youtube.com/'
  }
]


const BannerPage = () => {
  return (
    <Container sx={{maxWidth: '1366px !important', marginTop: 3, fontFamily: 'CorsaGrotesk'}} disableGutters={true}>
      <Grid container spacing={3}>
        {
          tempData.map(x => (
            <Grid key={x._id} item xs={1.5}>
              <Box sx={{ color: 'gray', fontSize: '12px', textAlign: 'center', cursor: 'pointer' } }onClick={() => window.open(x.link, "_blank")}>
                <CardMedia component='img' image={x.image}/>
                <Box mt={1}>{x.description}</Box>
              </Box>
            </Grid>
          ))
        }
      </Grid>
    </Container>
  )
}
// https://iili.io/salD9j.png
export default BannerPage