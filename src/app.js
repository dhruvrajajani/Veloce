const express = require('express');
const notemodle = require('/workspaces/Veloce/src/model/note.model');

const app = express();
app.use(express.json())

app.post('/notes',async (req,res)=>{
    await notemodle.create({
        Tittle:req.body.tittle,
        Description:req.body.description
    })
    res.status(200).jason("Created Successfully.")
})
app.get('/notes',async (req,res)=>{
    const Show = await notemodle.find();
    res.status(200).jason(show);
})
app.get('/notes/:id',async (req,res)=>{
    const Show = await notemodle.findById(req.params.id);
    //notemodle.findOne({_id:req.params.id});
    res.status(200).jason(show);
})
app.delete('/notes',async (req,res)=>{
    const show = await notemodle.findByIdAndDelete(req.params.id);
    //notemodle.findOneAndDelete({_id:req.params.id});
    res.status(200).jason(show);
})
app.patch('/notes/:id',async (req,res)=>{
    const note = await notemodle.findByIdAndUpdate(req.params.id,{Description:req.body.Description});
    res.status(200).jason(note,"Updated Successfully")
})
module.exports=app;