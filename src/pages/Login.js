/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Button, Grid, Link, TextField, Typography } from '@material-ui/core'
import { useHistory } from 'react-router'
import axios from 'axios'
import jsonwebtoken from 'jsonwebtoken'
const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      width: '60vh',
      height: '60vh',
      margin: '20vh 0',
      minWidth: '20vh'
    }
  }
}))
const Login = () => {
  const history = useHistory()
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const myStorage = window.localStorage
    const decodedToken = jsonwebtoken.decode(myStorage.myToken)
    const expired = Date.parse(new Date()) - decodedToken?.exp

    if (expired <= 0 || !myStorage.myToken) {
      history.push('./login')
    } else {
      history.push('./dashboard')
    }
  }, [])

  const onSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await axios({
        method: 'post',
        url: 'https://6bba-180-191-67-246.ap.ngrok.io/app/authentication/login',
        data: {
          email: email,
          password: password
        }
      })
      localStorage.setItem('myToken', response.data.token)
      response.status === 200 && history.push('./dashboard')
    } catch (error) {
      error.response.status === 400 && alert('Error')
    }
    setIsLoading(false)
  }

  return (
    <div style={{ backgroundColor: '#b2bec3' }}>
      <Grid container justify='center'>
        <div className={classes.root}>
          <Paper elevation={4}>
            <Grid container>
              <Grid item xs={12} container justify='center'>
                <Typography variant='h5' style={{ margin: '2rem' }}>
                  INVOICE
                </Typography>
              </Grid>
              <Grid item xs={12} container justify='center'>
                <TextField
                  label='Email'
                  variant='outlined'
                  fullWidth
                  style={{ margin: '2rem 2rem 1rem' }}
                  onChange={e => {
                    setEmail(e.target.value)
                  }}
                  value={email}
                />
              </Grid>
              <Grid item xs={12} container justify='center'>
                <TextField
                  id='outlined-basic'
                  label='Password'
                  variant='outlined'
                  type='password'
                  fullWidth
                  style={{ margin: '1rem 2rem 2rem' }}
                  onChange={e => {
                    setPassword(e.target.value)
                  }}
                  value={password}
                />
              </Grid>
              <Grid item xs={12} container justify='center'>
                <Button variant='contained' fullWidth color='primary' style={{ margin: '1rem 2rem 2rem' }} onClick={() => onSubmit()} disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </Grid>
              <Grid item xs={12} container justify='center'>
                <hr style={{ width: '90%' }} />
              </Grid>
              <Grid item xs={12} container justify='center'>
                <Link onClick={() => history.push('/forgot-password')}>Reset Password</Link>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Grid>
    </div>
  )
}

export default Login
