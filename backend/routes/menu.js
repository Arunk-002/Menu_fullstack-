const express = require('express')
const { getMenuItems, createMenu, getAllMenu, createMenuItem } = require('../controllers/menu')

const router = express.Router()

router.get('/menu/:menuId',getMenuItems)
router.post('/menu/:menuId',createMenuItem)

router.post('/menu',createMenu)
router.get('/menu',getAllMenu)

module.exports = router