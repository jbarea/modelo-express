import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, //este ObjectId es un atributo que nos proporciona mongoose entre otros
        ref: 'User',
    },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;