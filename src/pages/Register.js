/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Button, Grid, Link, TextField, Typography } from '@material-ui/core'
import { useHistory } from 'react-router'
import axios from 'axios'
import jsonwebtoken from 'jsonwebtoken'
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      width: '60vh',
      height: '72vh',
      margin: '20vh 0',
      minWidth: '20vh',
    },
  },
}))
const Register = () => {
  const history = useHistory()
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const myStorage = window.localStorage
    const decodedToken = jsonwebtoken.decode(myStorage.myToken)
    const expired = Date.parse(new Date()) - decodedToken?.exp
  }, [])

  const onSubmit = async () => {
    setIsLoading(true)
    console.log(email, username, password)
    // try {
    const response = await axios({
      method: 'post',
      url: 'https://6bba-180-191-67-246.ap.ngrok.io/app/authentication/register',
      data: {
        email: email,
        username: username,
        name: name,
        password: password,
      },
    })
    localStorage.setItem('myToken', response.data.token)
    response.status === 201 && history.push('./dashboard')
    // }
    // catch (error) {}
    setIsLoading(false)
  }

  return (
    <div style={{ backgroundColor: '#b2bec3' }}>
      <Grid container justify="center">
        <div className={classes.root}>
          <Paper elevation={4}>
            <Grid container>
              <Grid item xs={12} container justify="center">
                <Typography variant="h5" style={{ margin: '2rem' }}>
                  INVOICE
                </Typography>
              </Grid>
              <Grid item xs={12} container justify="center">
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  style={{ margin: '2rem 2rem 1rem' }}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  value={email}
                />
              </Grid>
              <Grid item xs={12} container justify="center">
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  style={{ margin: '2rem 2rem 1rem' }}
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                  value={name}
                />
              </Grid>
              <Grid item xs={12} container justify="center">
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  style={{ margin: '2rem 2rem 1rem' }}
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}
                  value={username}
                />
              </Grid>
              <Grid item xs={12} container justify="center">
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  style={{ margin: '1rem 2rem 2rem' }}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  value={password}
                />
                <p style={{ marginTop: '0', opacity: '0.8' }}>
                  Password must contain atleast a number and an upper case
                  character
                </p>
              </Grid>
              {errorMessage && errorMessage}
              <Grid item xs={12} container justify="center">
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  style={{ margin: '2rem' }}
                  onClick={() => onSubmit()}
                  disabled={isLoading}
                >
                  {isLoading ? 'Registering...' : 'Register'}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Grid>
    </div>
  )
}

export default Register
