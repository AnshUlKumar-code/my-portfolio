// controllers/profileController.js
import profileModel from '../model/Profile.js'
import fs from 'fs'
import path from 'path'
import { z } from 'zod'

const profileSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  bio: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  location: z.string().min(1),
  social: z.string().optional()
})

export const addProfile = async (req, res) => {
  try {
    const validated = profileSchema.parse(req.body)
    const { name, title, bio, email, phone, location, social } = validated

    const profileData = {
      name,
      title,
      bio,
      email,
      phone,
      location,
      social: JSON.parse(social || '{}')
    }

    if (req.files?.photo?.[0]) {
      profileData.photo = `/uploads/${req.files.photo[0].filename}`
    }

    if (req.files?.resume?.[0]) {
      profileData.resume = {
        url: `/uploads/${req.files.resume[0].filename}`,
        filename: req.files.resume[0].originalname,
        updatedAt: new Date()
      }
    }

    const profile = new profileModel(profileData)
    await profile.save()

    res.json({ success: true, message: "Profile Added", data: profile })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const validated = profileSchema.parse(req.body)
    const { name, title, bio, email, phone, location, social } = validated

    const profileData = {
      name,
      title,
      bio,
      email,
      phone,
      location,
      social: JSON.parse(social || '{}')
    }

    if (req.files?.photo?.[0]) {
      profileData.photo = `/uploads/${req.files.photo[0].filename}`
    }

    if (req.files?.resume?.[0]) {
      profileData.resume = {
        url: `/uploads/${req.files.resume[0].filename}`,
        filename: req.files.resume[0].originalname,
        updatedAt: new Date()
      }
    }

    const profile = await profileModel.findOneAndUpdate({}, profileData, { new: true })

    res.json({ success: true, message: "Profile Updated", data: profile })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const deleteProfile = async (req, res) => {
  try {
    const profile = await profileModel.findOne()
    
    // Delete files
    if (profile?.photo) {
      const photoPath = path.join(process.cwd(), profile.photo)
      if (fs.existsSync(photoPath)) fs.unlinkSync(photoPath)
    }
    if (profile?.resume?.url) {
      const resumePath = path.join(process.cwd(), profile.resume.url)
      if (fs.existsSync(resumePath)) fs.unlinkSync(resumePath)
    }

    await profileModel.deleteOne({})
    res.json({ success: true, message: "Profile Deleted" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const downloadResume = async (req, res) => {
  try {
    const profile = await profileModel.findOne()

    if (!profile?.resume?.url) {
      return res.status(404).json({ success: false, message: "Resume not found" })
    }

    const filePath = path.join(process.cwd(), profile.resume.url)

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: "File not found" })
    }

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${profile.resume.filename || 'resume.pdf'}"`)

    fs.createReadStream(filePath).pipe(res)

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getProfileController = async (req, res) => {
  try {
    const profile = await profileModel.findOne()
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" })
    }
    res.status(200).json({ message: "Profile fetched", profile })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}