import dotenv from 'dotenv'
dotenv.config()

export default Object.freeze({
  PORT: process.env.PORT,
  GOOGLE_SHEET_CLIENT_EMAIL: process.env.GOOGLE_SHEET_CLIENT_EMAIL,
  GOOGLE_SHEET_PRIVATE_KEY: process.env.GOOGLE_SHEET_PRIVATE_KEY
})

