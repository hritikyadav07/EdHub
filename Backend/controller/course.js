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

// Delete a course by ID
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params; // Get course ID from URL params

    // Check if the course exists
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Delete the course
    await Course.findByIdAndDelete(id);
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

//show a course by id
export const showCourse = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from request URL
    const course = await Course.findById(id); // Find course by ID

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json(course); // Send the found course
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

//show all the courses
export const showAllCourse = async (req, res) => {
  console.log("inside the showallcourse");
  try {
    const courses = await Course.find(); // Fetch all courses from DB
    if (courses.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }

    res.status(200).json(courses); // Send all courses
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Update a course by ID
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price } = req.body;

    // Check if course exists
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Update course fields
    if (title) course.title = title;
    if (description) course.description = description;
    if (price) course.price = price;

    await course.save();

    res.status(200).json({ message: "Course updated successfully", course });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};


