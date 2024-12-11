const Menu = require('../models/Menu')
const MenuItem = require('../models/MenuItem'); 

async function getMenuItems(req,res) {
    try {
        const menuId = req.params.menuId
        console.log(menuId);
        const menu = await Menu.findById(menuId).populate('items')
        if (!menu) {
            return res.status(400).json('no items found')
        }
        const msg = {
            menu:menu
        }
        return res.status(201).json(msg)
    } catch (error) {
        console.log(error);
    }
    
}

async function createMenu(req,res) {
    try {
        const menuBody = req.body
        console.log(menuBody);
        const newMenu = await Menu.create(menuBody)
        if (!newMenu) {
            return res.status(400).json('menu not created')
        }
        const msg = {
            menu:newMenu
        }
        return res.status(201).json(msg)
    } catch (error) {
        console.log(error);
    }
    
}

async function getAllMenu(req,res) {
    try {
        const allMenu = await Menu.find({})
        if (!allMenu) {
            return res.status(400).json('No Menu found')
        }
        const msg = {
            menus:allMenu
        }
        return res.status(201).json(msg)
    } catch (error) {
        console.log(error);
        
    }
}

async function createMenuItem(req,res) {
    try {
        const menuId = req.params.menuId
        const menuItemBody = req.body
        menuItemBody.menu=menuId
        const newMenuItem = await MenuItem.create(menuItemBody)
        if (newMenuItem.id) {
          const updatedMenu = await Menu.updateOne(
            { _id: menuId },
            { $push: { items: newMenuItem.id } }
          );
          if (updatedMenu.nModified === 0) {
            return res.status(404).json({ message: "Menu not found or Menu Item already added" });
          }
          const msg ={ 
            msg: "Menu updated successfully" ,
            menuitem:newMenuItem
        }
          return res.status(200).json(msg);
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getMenuItems,
    createMenu,
    getAllMenu,
    createMenuItem
}