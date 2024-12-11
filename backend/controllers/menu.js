const Menu = require('../models/Menu')
const MenuItem = require('../models/MenuItem'); 

async function getMenuItems(req,res) {
    try {
        const menuId = req.params.menuId
        console.log(menuId);
        const curMenu = await Menu.findById(menuId).populate('items')
        const menuItems = curMenu.items
        if (!menuItems) {
            return res.status(400).json('no items found')
        }
        const msg = {
            menuItems:menuItems,
            description:curMenu.description
        }
        return res.status(201).json(msg)
    } catch (error) {
        console.log(error);
    }
    
} 

// async function createMenu(req,res) {
//     try {
//         const menuBodyArray =  req.body.menu
//         const menuItems = req.body.items
//         const menuBody = {
//             name:menuBodyArray[0].name,
//             descrription:menuBodyArray[0].description,
//             items:[]
//         }
//         console.log(menuBody);
        
//         const newMenu = await Menu.create(menuBody)
//         if (!newMenu) {
//             return res.status(400).json('menu not created')
//         }
//         menuItems.forEach(async(item) => {
//             const newMenuItem = await MenuItem.create(item)
//             newMenu.items.push(newMenuItem._id)
//         });
//         newMenu.save()
//         const msg ={ 
//                 msg: "Menu updated successfully" ,
//                 menu:newMenu,
//             }
//         return res.status(200).json(msg);
//     } catch (error) {
//         console.log(error);
//     }
    
// }
async function createMenu(req, res) {
    try {
        const menuBodyArray = req.body.data.menu;
        const menuItems = req.body.data.selecteditems;
        const menuBody = {
            name: menuBodyArray?.name,
            description: menuBodyArray?.description,
            items: [], 
        };

        const newMenu = await Menu.create(menuBody);
        if (!newMenu) {
            return res.status(400).json('Menu not created');
        }

        const menuItemPromises = menuItems.map(async (item) => {
            item.menu=newMenu._id
            const newMenuItem = await MenuItem.create(item);
            return newMenuItem._id; 
        });
        const menuItemIds = await Promise.all(menuItemPromises);
        console.log(menuItemIds);
        newMenu.items.push(...menuItemIds);
        await newMenu.save();
        const msg = {
            msg: 'Menu updated successfully',
            menu: newMenu,
        };
        return res.status(200).json(msg);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'An error occurred while creating the menu' });
    }
}


async function getAllMenu(req,res) {
    try {
    
        const allMenu = await Menu.find()
        if (!allMenu) {
            return res.status(400).json('No Menu found')
        }
       
        return res.status(201).json(allMenu)
    } catch (error) {
        console.log(error);
        
    }
}


module.exports = {
    getMenuItems,
    createMenu,
    getAllMenu,
}