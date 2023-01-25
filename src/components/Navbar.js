import { Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router'

const Navbar = () => {
  const history = useHistory()
  return (
    <div style={{ color: 'black' }}>
      <Grid
        container
        justify="flex-end"
        style={{ height: '7vh', backgroundColor: '#636e72' }}
      >
        <Grid container item md={3} alignContent="center">
          <Typography
            variant="h6"
            style={{
              color: 'white',
              fontWeight: 'bold',
              textShadow: '5px 2px 5px black',
              marginRight: 'auto',
            }}
          >
            INVOICE
          </Typography>
        </Grid>
        <Grid container justify={'center'} item md={3} alignContent="center">
          <Button
            variant="outlined"
            style={{ color: 'white', borderColor: 'white' }}
            onClick={() => history.push('/login')}
          >
            LOGIN
          </Button>
        </Grid>{' '}
        <Grid container justify={'center'} item md={3} alignContent="center">
          <Button
            variant="outlined"
            style={{ color: 'white', borderColor: 'white' }}
            onClick={() => history.push('/register')}
          >
            REGISTER
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default Navbar
