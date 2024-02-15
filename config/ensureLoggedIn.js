module.exports = (req, res, next) => {
    if(!req.user) return res.status(401).json({ msg: 'Hey! Listen!, Unauthorized' })
    next()
}