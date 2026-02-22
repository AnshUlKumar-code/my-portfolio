// routes/contact.js
import express from 'express'
import { submitContact } from '../controllers/contactController.js'

const contactRouter = express.Router()

contactRouter.post('/', submitContact)

export default contactRouter