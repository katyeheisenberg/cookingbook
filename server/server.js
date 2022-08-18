/* eslint-disable no-console */
import express from 'express'
import http from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import favicon from 'serve-favicon'
import io from 'socket.io'
import axios from 'axios'
import translate from 'translate-google'

import config from './config'
import mongooseService from './services/mongoose'

import foodModel from './mongodb/models/foodModel'

import Html from '../client/html'

const { resolve } = require('path')

const server = express()
const httpServer = http.createServer(server)

const PORT = config.port

const middleware = [
  cors(),
  cookieParser(),
  express.json({ limit: '50kb' }),
  express.static(resolve(__dirname, '../dist')),
  favicon(`${__dirname}/public/favicon.ico`),
]

middleware.forEach((it) => server.use(it))

const url = 'https://trackapi.nutritionix.com/v2/natural/nutrients'

const headers = {
  'x-app-id': config['x-app-id'],
  'x-app-key': config['x-app-key'],
  'x-remote-user-id': config['x-remote-user-id'],
}

server.get('/api/v1/:product', async (req, res) => {
  const { product } = req.params
  console.log('Product: ', product)

  const translatedProduct = await translate(product, { to: 'en' })
    .then((r) => {
      console.log('Translated product: ', r)
      return r.toLowerCase()
    })
    .catch((err) => {
      console.log(err)
      res.json({
        status: 'error',
        data: err,
      })
    })

  try {
    const foodCard = await foodModel.findOne({ 'name': translatedProduct })
    if (!foodCard) {
      throw Error('Unknown food')
    }
    console.log('FOOD: ', foodCard)
    res.json({
      status: 'success',
      data: foodCard
    })
  } catch (e) {
    console.log(e)
    console.log(`Unknown food. Looking for ${translatedProduct} in API...`)
    await axios({
      method: 'post',
      url,
      headers,
      data: {
        query: `${translatedProduct} 100g`
      }
    })
      .then(({ data }) => data.foods[0])
      .then((prodObj) => ({
        nutritionix_iddb: prodObj.ndb_no,
        name: prodObj.food_name,
        calories: prodObj.nf_calories,
        fat: prodObj.nf_total_fat,
        carbohydrate: prodObj.nf_total_carbohydrate,
        protein: prodObj.nf_protein,
      }))
      .then(async (foodFromApi) => {
        try {
          const data = await foodModel.create(foodFromApi)
          console.log('Food added')
          res.json({
            status: 'success',
            data,
          })
        } catch (err) {
          console.log(err)
          res.json({
            status: 'error',
            data: err,
          })
        }
      })
      .catch((err) => {
        console.log(err)
        res.json({
          status: 'error',
          data: err,
        })
      })
  }
})

server.get('/', (req, res) => {
  res.send('Express Server')
})

// MongoDB
if (config.mongoEnabled) {
  // eslint-disable-next-line
  console.log('MongoDB Enabled: ', config.mongoEnabled)
  mongooseService.connect()
}

// SocketsIO
if (config.socketsEnabled) {
  // eslint-disable-next-line
  console.log('Sockets Enabled: ', config.socketsEnabled)
  const socketIO = io(httpServer, {
    path: '/ws'
  })

  socketIO.on('connection', (socket) => {
    console.log(`${socket.id} login`)

    socket.on('disconnect', () => {
      console.log(`${socket.id} logout`)
    })
  })
}

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

httpServer.listen(PORT)
// eslint-disable-next-line
console.log(`Serving at http://localhost:${PORT}`)
