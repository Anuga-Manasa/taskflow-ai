const prisma = require('../config/prisma');

const createTask = async(req,res)=>{
    try{
        const {boardId} = req.params;
        const {title,description, status} = req.body;
        const task= await prisma.task.create({
            data:{
                title,
                description,
                boardId
            },
        });
        res.status(201).json({message:"task created successfully",task});
    } catch(error){
        res.status(500).json({error:error.message});
    }
};

const getTasks = async(req,res)=>{
    try{
        const{boardId}=req.params;
        const tasks = await prisma.task.findMany({
            where:{boardId},
        });
        res.status(200).json({message:"Tasks retrived successfully",tasks});
    } catch(error){
        res.status(500).json({error:error.message});
    }
};

const updateTaskStatus = async(req,res)=>{
    try{
    const {taskId}=req.params;
    const {status}=req.body;
    const updatedTask= await prisma.task.update({
        where:{id: taskId},
        data:{ status },
    });
    res.status(200).json({message:"status updated",updatedTask});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
};

module.exports ={createTask,getTasks,updateTaskStatus};