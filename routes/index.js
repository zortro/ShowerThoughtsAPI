const router = require('express').Router()

const apiRoutes = require('./api')

router.use('/api', apiRoutes)

router.use((req, res) => {
    res.status(404).send(`<h1>Please load this URL using a program such as <a href="https://insomnia.rest/">Insomnia</a><h1>`)
})

module.exports = router