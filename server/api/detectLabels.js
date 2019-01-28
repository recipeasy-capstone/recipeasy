const path = require('path')
const router = require('express').Router()
const {detectLabels} = require('../../utils')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const data = await detectLabels(path.join(__dirname, '..', '../public/receipt.jpg'))
        res.json(data)
    }
    catch (err) {
        next(err)
    }
})
