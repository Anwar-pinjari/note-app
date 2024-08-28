const express=require('express');
const router=express.Router();
const Note=require('../modules/notes');

router.get('/',async(req,res)=>{
    try{
        const notes=await Note.find();
        res.json(notes);
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get('/:id',async(req,res)=>{
    try{
        const note=await Note.findById(req.params.id);
        if(!note)
            return res.status(404).json({message:"Note not found"});
        res.json(note);
    }catch(err){
        res.status(500).json({message:err.message});
    }
})


router.post('/',async(req,res)=>{
    const note=new Note({
        title:req.body.title,
        content:req.body.content,
        favourite:req.body.favourite
    });
    try{
        const newNote=await note.save();
        res.status(201).json(newNote);
    }catch(err){
        res.sendStatus(400).json({message:err.message});
    }
})

router.put("/:id",async(req,res)=>{
    try{
        const note=await Note.findById(req.params.id);
        if(!note)
        return res.status(400).json({message:err.message});
        
        if(req.body.title)
            note.title=req.body.title;
        if(req.body.content)
            note.content=req.body.content;
        if(req.body.favourite)
            note.favourite=req.body.favourite;
        const updateNote=await note.save();
        res.json(updateNote);
    }catch(err){
        res.status(500).json({message:err.message});
    }
})


router.delete("/:id",async(req,res)=>{
    try{
        const note=await Note.findById(req.params.id);
        if(!note)
            return res.status(404).json({message:"Note not found"});
        await note.deleteOne();
        res.json({message:"Note deleted successfully"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

module.exports=router;