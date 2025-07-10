import express from 'express';
import Class from '../models/classModel.js';

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


router.post('/join', async (req, res) => {
  const { classCode } = req.body;
  try {
    console.log("JOINED " + classCode);
    //add the classroom id to the user
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;