import mongoose from "mongoose"; // ✅ Correct Import

// ✅ Declare schema first
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    avatar: {
        type: String, // URL to profile picture
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// ✅ Now, define the model after the schema
export const User = mongoose.model("User", userSchema);
