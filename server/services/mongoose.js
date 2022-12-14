import mongoose from 'mongoose'

// import config from '../config'

mongoose.connection.on('connected', () => {
  // eslint-disable-next-line
  console.log('DB is connected')
})

mongoose.connection.on('error', (err) => {
  // eslint-disable-next-line
  console.log("DB isn't connected")
  // eslint-disable-next-line
  console.log(err)
  process.exit(1)
})

const mongoUrl = 'mongodb+srv://username:password@book.mftwazr.mongodb.net/test?retryWrites=true&w=majority'

exports.connect = async () => {
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  return mongoose.connection
}
