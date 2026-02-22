// controllers/contactController.js
import { sendContactEmail } from '../utils/email.js'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1)
})

export const submitContact = async (req, res) => {
  try {
    const data = contactSchema.parse(req.body)
    
    await sendContactEmail(data)

    res.json({ success: true, message: "Message sent successfully" })
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({ success: false, message: error.errors })
    }
    res.status(500).json({ success: false, message: error.message })
  }
}