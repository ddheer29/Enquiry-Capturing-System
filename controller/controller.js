import { ZodError } from 'zod'
import { enquirySchema } from '../helper/validator.js'
import { sheets } from '../service/googleSheet.js'
import appConfig from '../config/appConfig.js'
import dayjs from 'dayjs'

const { GOOGLE_SHEET_ID } = appConfig

export const enquiryController = async (req, res) => {
  try {
    const body = enquirySchema.parse(req.body)
    const { name, email, category, message } = body
    console.log(name, email, category, message)
    const currentDate = dayjs().format('DD-MM-YYYY')
    sheets.spreadsheets.values
      .append({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: 'Sheet1!A:E',
        insertDataOption: 'INSERT_ROWS',
        valueInputOption: 'RAW',
        requestBody: {
          values: [[name, email, category, message, currentDate]]
        }
      })
      .catch((err) => {
        console.error(err.response.data.error)
      })
    res.status(201).json({
      success: true,
      message: 'Success'
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(422).json({
        success: false,
        message: error.errors
      })
    }
    res.sendStatus(500)
  }
}

