import mongoose from 'mongoose'

export const schema = {
  title: {
    type: String,
    required: [true, 'Song must have Title'],
  },
  url: {
    type: String,
    required: [true, 'Song must have URL'],
    unique: true,
  },
  album: String,
  artist: String,
  rating: Number,
  favorite: Boolean,
}

const songSchema = new mongoose.Schema(schema)

export const Song = mongoose.model('song', songSchema)
