const prisma = require('../config/prisma');
const { getIO } = require('../socket');

const createTask = async(req,res)=>{
    try{
        const {boardId} = req.params;
        const {title,description, status,assignedToId} = req.body;
        const task= await prisma.task.create({
            data:{
                title,
                description,
                boardId,
                assignedToId,
            },
        });
        getIO().emit("taskUpdated");
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
            include:{
                assignedTo:{
                    select:{id:true,name:true},
                },
            },
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
    getIO().emit("taskUpdated");
    res.status(200).json({message:"status updated",updatedTask});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
};
const getBoardById= async(req,res)=>{
    try{
        const {boardId}=req.params;
        const board= await prisma.board.findUnique({
            where:{id: boardId},
    });
    res.json({message:"board details retrived successfully",board});
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

module.exports ={createTask,getTasks,updateTaskStatus, getBoardById};