import { Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router'

const Navbar = () => {
  const history = useHistory()
  return (
    <div style={{ color: 'black' }}>
      <Grid container justify='flex-end' style={{ height: '7vh', backgroundColor: '#636e72' }}>
        <Grid container item md={3} justify='center' alignContent='center'>
          <Typography
            variant='h6'
            style={{
              color: 'white',
              fontWeight: 'bold',
              textShadow: '5px 2px 5px black'
            }}>
            INVOICE
          </Typography>
        </Grid>
        <Grid item container md={6} style={{ textAlign: 'center' }} alignItems='center' justify={'center'}>
          <Grid item md={3} xs={12}>
            <a
              style={{
                textDecoration: 'none',
                color: 'white',
                textShadow: '1px 2px 5px black'
              }}
              href='#home'>
              HOME
            </a>
          </Grid>
          <Grid item md={3} xs={12}>
            <a
              style={{
                textDecoration: 'none',
                color: 'white',
                textShadow: '1px 2px 5px black'
              }}
              href='#portfolio'>
              PORTFOLIO
            </a>
          </Grid>
          <Grid item md={3}>
            <a
              style={{
                textDecoration: 'none',
                color: 'white',
                textShadow: '1px 2px 5px black'
              }}
              href='#chart'>
              CONTACT US
            </a>
          </Grid>
        </Grid>
        <Grid container justify={'center'} item md={3} alignContent='center'>
          <Button variant='outlined' style={{ color: 'white', borderColor: 'white' }} onClick={() => history.push('/login')}>
            LOGIN
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default Navbar
