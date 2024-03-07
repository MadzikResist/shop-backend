require('dotenv').config()

const express = require("express");
const mongoose = require('mongoose')
const productRoutes = require('./routes/products')

//express app
const app = express()

app.use(express.json())

//routes
app.use('/api/products',productRoutes)

//connect do db
mongoose.connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT)
    } )
  })
  .catch((error) => {
    console.error(error)
  })

