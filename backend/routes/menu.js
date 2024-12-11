const express = require('express')
const { getMenuItems, createMenu, getAllMenu } = require('../controllers/menu')

const router = express.Router()

router.get('/menu/:menuId',getMenuItems)


router.post('/menu',createMenu)
router.get('/menu',getAllMenu)

module.exports = router