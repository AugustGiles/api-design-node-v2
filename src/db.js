import mongoose from 'mongoose'
mongoose.Promise = global.Promise

export const connect = () => {
  return mongoose.connect('mongodb://@ds139939.mlab.com:39939/test-database', {
    useMongoClient: true
  })
}
