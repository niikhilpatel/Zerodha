// models/wishlistModel.js
import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
    stockName: String,
    stockSymbol: String,
    price: String,
    addedAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

export default mongoose.model('Wishlist', wishlistSchema);