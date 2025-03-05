export const User = mongoose.model("User", userSchema);

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Referencing User schema
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    enrolledStudents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Course = mongoose.model("Course", courseSchema);