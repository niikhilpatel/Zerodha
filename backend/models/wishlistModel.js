import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
    stockName: {
        type: String,
        required: true,
    },
    stockSymbol: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    addedAt: {
        type: Date,
        default: Date.now,
    },
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
export default Wishlist;