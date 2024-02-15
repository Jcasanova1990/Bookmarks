require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')

// Signup

const signUp = async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        const token = createJWT(user)
        res.locals.data.user = user
        res.locals.data.token = token
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message})
    }
}

// Login

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user) throw new Error('user not found, invalid email')
        const password = crypto.createHmac('sha256', process.env.SECRET).update(req.body.password).digest('hex').split('').reverse().join('')
        const match = await bcryptjs.compare(password, user.password)
        if(!match) throw new error('Invalid password')
        res.locals.data.user = user
        res.locals.data.token = createJWT(user)
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message})
    }
}

// Index bookmarks by user

const getBookmarksByUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ email:res.locals.data.email}).populate('bookmarks').sort('bookmarks.createdAt').exec()
        const bookmarks = user.bookmarks
        res.locals.data.bookmarks = bookmarks
        next()
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

// Respond With

const respondWithToken = (req, res) => {
    res.json(res.locals.data.token)
}

const respondWithUser = (req, res) => {
    res.json(res.locals.data.user)
}

const respondWithBookmarks = (req, res) => {
    res.json(res.locals.data.bookmarks)
}

// Helper Function

function createJWT(user){
    return jwt.sign({ user }), process.env.SECRET, {expiresIn: '48h'}
}

module.exports = {
    signUp,
    login,
    getBookmarksByUser,
    respondWithToken,
    respondWithBookmarks,
    respondWithUser,
}