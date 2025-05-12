// routes/wishlistRoutes.js
import express from 'express';
import Wishlist from '../models/wishlistModel.js';
import auth from '../middleware/auth.js';


const router = express.Router();


router.post('/add', auth, async (req, res) => {
    const {
        stockName,
        stockSymbol,
        price
    } = req.body;
    try {
        const item = new Wishlist({
            stockName,
            stockSymbol,
            price,
            user: req.user, // link to logged-in user
        });
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({
            message: 'Failed to add item'
        });
    }
});

// Add stock to wishlist
// router.post('/add', async (req, res) => {
//     const {
//         stockName,
//         stockSymbol
//     } = req.body;
//     try {
//         const newStock = new Wishlist({
//             stockName,
//             stockSymbol
//         });
//         await newStock.save();
//         res.status(201).json({
//             success: true,
//             message: 'Stock added to wishlist.'
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Failed to add stock.'
//         });
//     }
// });

// Get all wishlist items
// router.get('/', async (req, res) => {
//     try {
//         const wishlist = await Wishlist.find();
//         res.status(200).json(wishlist);
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Failed to fetch wishlist.'
//         });
//     }
// });

// Search wishlist items by stock name
router.get('/search', async (req, res) => {
    const query = req.query.q;
    try {
        const results = await Wishlist.find({
            stockName: new RegExp(query, 'i')
        });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Search failed.'
        });
    }
});

// routes/wishlistRoutes.js
router.get('/', auth, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const skip = (page - 1) * limit;

    try {
        const [items, total] = await Promise.all([
            Wishlist.find({
                user: req.user
            }).skip(skip).limit(limit).sort('-addedAt'),
            Wishlist.countDocuments({
                user: req.user
            })
        ]);
        res.json({
            items,
            total,
            page,
            pages: Math.ceil(total / limit)
        });
    } catch (err) {
        res.status(500).json({
            message: 'Fetch failed'
        });
    }
});


export default router;