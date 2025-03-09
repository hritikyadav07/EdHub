import {Course} from "../model/Course.js"

// Add a new course
export const addCourse = async (req, res) => {
  console.log("add course inside");
  try {
    const { title, description, price } = req.body;
    console.log(req.body);

    if (!title || !description || !price) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newCourse = new Course({ title, description, price });
    await newCourse.save();
    console.log("saved to db");

    res.status(201).json({ message: "Course added successfully", course: newCourse });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};


