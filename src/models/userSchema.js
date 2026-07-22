import moongoose from "mongoose";

const userSchema = new moongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim:true
    },
    last_name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim:true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true,
        default: 'user'
    }
},
{
    timestamps: true
});

export const UserModel = moongoose.model('user', userSchema);