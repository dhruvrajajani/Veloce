const express = require('express');

const app = express();
app.use(express.json());
const list =[];

app.get('/',(req,res)=>{
    res.send('Home page');
})

app.post('/list',(req,res)=>{
    console.log(req.body);
    list.push(req.body);
    res.status(200).json({
        message: 'Item added to list',
        data: req.body
    })
})
app.get('/list',(req,res)=>{
    res.send(list);
})
app.delete('/list/:index',(req,res)=>{
    const index = req.params.index;
    delete list[index-1];
    res.status(200).json({
        message: 'Item removed from list'
    });
})
app.patch('/list/:index',(req,res)=>{
    const index = req.params.index
    const branch = req.body.branch;
    list[index-1].branch = branch;
    res.status(200).json({
        message: 'Item updated in list',
        data: req.body
    });
    console.log(list);
})


module.exports = app;