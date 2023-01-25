import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Button, Fab, useScrollTrigger, Zoom } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { useHistory } from 'react-router'
import axios from 'axios'
import { useEffect } from 'react'
import AddIcon from '@material-ui/icons/Add'
import Input from '@material-ui/core/Input'
import MuiAlert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: 0,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${0}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 0,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  extendedIcon: {
    margin: '0 1rem 1rem auto',
  },
}))

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

function Dashboard(props) {
  const { window } = props
  const classes = useStyles()
  const [products, setProducts] = React.useState([])
  const [quantity, setQuantity] = React.useState()
  const [selected, setSelected] = React.useState()
  const [selectedProduct, setSelectedProduct] = React.useState([])
  const [invoice, setInvoice] = React.useState([])
  const [tab, setTab] = React.useState(false)

  const handleProducts = async () => {
    try {
      const token = localStorage.getItem('myToken')
      const response = await axios({
        method: 'get',
        url: 'https://6bba-180-191-67-246.ap.ngrok.io/app/product',
        headers: { Authorization: `Bearer ${token}` },
      })
      setProducts(response.data.products)
    } catch (error) {
      error.response.status === 400 && alert('Error')
    }
  }

  //function for adding products
  const handleAddProduct = async (item) => {
    try {
      const token = localStorage.getItem('myToken')
      const response = await axios({
        method: 'post',
        url: 'https://6bba-180-191-67-246.ap.ngrok.io/app/product_acquisition',
        headers: { Authorization: `Bearer ${token}` },
        data: {
          product_id: item._id,
          quantity: quantity,
        },
      })
      setSelectedProduct([
        ...selectedProduct,
        response.data.populated_product_acquisition,
      ])
    } catch (error) {
      console.log(error)
    }
  }

  // console.log(selectedProduct)

  const handleAddInvoice = async (item) => {
    try {
      const token = localStorage.getItem('myToken')
      const response = await axios({
        method: 'post',
        url: 'https://6bba-180-191-67-246.ap.ngrok.io/app/invoice',
        headers: { Authorization: `Bearer ${token}` },
        data: {
          products_acquisition: selectedProduct.map((item) => item._id),
        },
      })
      handleGetInvoice()
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetInvoice = async () => {
    try {
      const token = localStorage.getItem('myToken')
      const response = await axios({
        method: 'get',
        url: 'https://6bba-180-191-67-246.ap.ngrok.io/app/invoice',
        headers: { Authorization: `Bearer ${token}` },
      })
      setInvoice(response.data.invoices)
    } catch (error) {
      error.response.status === 400 && alert('Error')
    }
  }

  useEffect(() => {
    handleProducts()
    handleGetInvoice()
  }, [])

  const history = useHistory()

  const container =
    window !== undefined ? () => window().document.body : undefined

  console.log(invoice[0])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
          <Button
            style={{ marginLeft: 'auto', color: 'white' }}
            onClick={() => {
              localStorage.removeItem('myToken')
              history.push('./')
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Button onClick={() => setTab(false)} variant="default">
          Products
        </Button>
        <Button onClick={() => setTab(true)} variant="default">
          Invoice
        </Button>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {tab
            ? invoice?.map((item) => (
                <div style={{ flex: '1 1 300px' }}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        <p>Invoice Number: {item.invoice_number}</p>
                      </Typography>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        <p>Customer: {item.invoice_user.name}</p>
                      </Typography>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        <p>Products:</p>
                        {item.products_acquisition?.map((data) => (
                          <div style={{ marginLeft: '1rem' }}>
                            <p>Name: {data.product?.name}</p>
                            <p>Quantity: {data.quantity}</p>
                            <p>Sub total: {data.price}</p>
                            <hr />
                          </div>
                        ))}
                      </Typography>
                      <hr />
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        <p>Total Amount: PHP {item.total_amount}</p>
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              ))
            : products.map((item) => (
                <div style={{ flex: '1 1 300px' }}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        <p>Name: {item.name}</p>
                      </Typography>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        <p>Quantity: {item.quantity}</p>
                      </Typography>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        <p>Price: PHP {item.price}</p>
                      </Typography>
                    </CardContent>
                    {selected === item._id ? (
                      <Alert severity="success">
                        This is a success message!
                      </Alert>
                    ) : (
                      <div
                        style={{
                          display: 'flex',
                          margin: '1rem',
                          alignItems: 'center',
                        }}
                      >
                        <Input
                          type="number"
                          style={{ flex: '1 1 70%' }}
                          placeholder="Quantity to add in Invoice"
                          onChange={(e) =>
                            setQuantity(parseInt(e.target.value))
                          }
                        />
                        <Button
                          onClick={() => {
                            handleAddProduct(item)
                            setSelected(item._id)
                          }}
                          style={{ padding: '0 1rem' }}
                          variant="default"
                        >
                          Add
                        </Button>
                      </div>
                    )}
                  </Card>
                </div>
              ))}
        </div>
      </main>
      <div
        style={{
          margin: '2rem',
          display: 'flex',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          gap: '2rem',
        }}
      >
        {selectedProduct &&
          selectedProduct.map((item) => (
            <Card style={{ width: '50%' }}>
              <CardContent style={{ display: 'flex', gap: '1rem' }}>
                <Typography>Name: {item.product.name}</Typography>
                <Typography>Quantity: {item.quantity}</Typography>
                <Typography>Subtotal Price: {item.price}</Typography>
              </CardContent>
            </Card>
          ))}
      </div>

      <Fab
        className={classes.extendedIcon}
        color="secondary"
        aria-label="scroll back to top"
        variant="extended"
        onClick={() => handleAddInvoice()}
      >
        <AddIcon /> Invoice
      </Fab>
    </div>
  )
}
export default Dashboard
