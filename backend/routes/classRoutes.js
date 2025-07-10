import express from 'express';
import Class from '../models/classModel.js';
import generateClassCode from '../middleware/classCode.js';

const router = express.Router();

router.post('/create', async (req, res) => {
    const { teacherID, className, section, subject, room } = req.body;

    try {
        let classCode;
        let isUnique = false;
        
        // Generate unique class code
        while (!isUnique) {
            classCode = generateClassCode();
            const existingClass = await Class.findOne({ classCode });
            if (!existingClass) isUnique = true;
        }

        const newClass = new Class({ 
            teacherID, 
            className, 
            section, 
            subject, 
            room,
            classCode 
        });
        
        await newClass.save();
        
        // Log successful creation to console
        console.log(`New classroom created successfully:`);
        console.log(`- Teacher ID: ${teacherID}`);
        console.log(`- Class Name: ${className}`);
        console.log(`- Class Code: ${classCode}`);
        console.log(`- Section: ${section}`);
        console.log(`- Subject: ${subject}`);
        console.log(`- Room: ${room}`);
        
        res.status(201).json({ 
            success: true, 
            message: 'Class saved', 
            class: newClass 
        });
    } catch (err) {
        console.error('Error creating classroom:', err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/class-list', async (req, res) => {
  const email = req.query.email;
  console.log("hi");
  try {
    const classes = await Class.find({teacherID: "686bb94e51f344189d55bab2" }); //Change to user pls tnx
    console.log(classes);
    res.status(200).json({ success: true, data: classes });
  } catch (err) {
    console.error('Error fetching class list:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});



router.post('/join', async (req, res) => {
  const { classCode, email } = req.body;

  if (!classCode || !email) {
    return res.status(400).json({ success: false, error: 'classCode and userId are required' });
  }

  try {
    const classroom = await Class.findOne({classCode});
    if (!classroom) {
      return res.status(404).json({ success: false, error: 'Class not found' });
    }

    if (classroom.students.includes(email)) {
      return res.status(400).json({ success: false, error: 'User already joined this class' });
    }

    classroom.students.push(email);
    await classroom.save();

    res.status(200).json({ success: true, message: 'Successfully joined the class' });
  } catch (err) {
    console.error('Error joining class:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;