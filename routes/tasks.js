const express = require('express');
const Task = require('../models/Task');
const {protect} = require('../middleware/authMiddleware');
const router = express.Router();

//Create a new task
router.post('/',protect,async (req,res)=>{
    const {title, description, status, assignees} = req.body;
    const task = new Task({
        title,
        description,
        status,
        assignees,
        createdBy:req.user._id,
    });
    await task.save();
    res.status(201).json(task);
});

//Get all tasks
router.get('/',protect, async (req,res)=>{
    const tasks = await Task.find({createdBy:req.user._id}).populate('assignees');
    res.json(tasks);
})

//Update task
router.put('/:id',protect, async (req,res)=>{
    const {title, description, status, asignees} = req.body;
    const task = await Task.findById(req.params.id);
    if(!task) return res.status(404).json({message:'Task not found'});
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.assignees = assignees || task.assignees;
    await task.save();
    res.json(task);
});

//Delete task(Soft Delete)

router.delete('/:id',protect, async (req,res)=>{
    const task = await Task.findByIdAndDelete(req.params.id);
    if(!task) return res.status(400).json({message:'Task not found'});
    res.json({message:'Task deleted'});
});

module.exports = router;