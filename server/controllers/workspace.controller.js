const prisma= require('../config/prisma');

const createWorkspace=async (req,res)=>{
    try{
    const ownerId=req.user.userId;
    const{name} = req.body;
    const workspace= await prisma.workspace.create({
        data:{
            name,
            ownerId,
        },
    });
    res.status(201).json({message:"Workspace created successfully",workspace});
} catch(error){
    res.status(500).json({error:error.message});
}

};
const getWorkspaces= async (req,res)=>{
    try{
        const ownerId=req.user.userId;
        const workspaces=await prisma.workspace.findMany({
            where:{ownerId},
        });
        res.status(200).json({message:"Workspaces retrived successfully",workspaces});
    }catch(error){
        res.status(500).json({error:error.message});
    }

};

module.exports= {createWorkspace,getWorkspaces};