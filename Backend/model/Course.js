import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    content: {
        type: String
    },
    videoUrl: {
        type: String
    },
    duration: {
        type: String
    },
    isPreview: {
        type: Boolean,
        default: false
    }
});

const moduleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    lessons: [lessonSchema]
});

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        default: "https://via.placeholder.com/300x200"
    },
    rating: {
        type: Number,
        default: 0
    },
    students: {
        type: Number,
        default: 0
    },
    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner"
    },
    category: {
        type: String,
        required: true
    },
    totalDuration: {
        type: String
    },
    language: {
        type: String,
        default: "English"
    },
    requirements: [{
        type: String
    }],
    whatYoullLearn: [{
        type: String
    }],
    modules: [moduleSchema],
    bestseller: {
        type: Boolean,
        default: false
    },
    featured: {
        type: Boolean,
        default: false
    },
    certificateAvailable: {
        type: Boolean,
        default: false
    },
    published: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

// Create slug from title before saving
courseSchema.pre('save', function(next) {
    if (!this.isModified('title')) {
        return next();
    }
    this.slug = this.title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
    next();
});

export const Course = mongoose.model("Course", courseSchema);