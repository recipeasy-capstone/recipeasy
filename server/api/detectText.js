const path = require('path')
const router = require('express').Router()
const {detectText} = require('../../utils')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const data = await detectText(path.join(__dirname, '..', '../public/receipt.jpg'))
        res.send(data)
    }
    catch (err) {
        next(err)
    }
})
