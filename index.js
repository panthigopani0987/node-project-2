const express = require('express');
const port = 9100;
const app = express();
app.set('view engine','ejs');   
app.use(express.urlencoded());  
let data = [
    {
        t_id : 'First',
        task : 'Wake Up 6:00 AM Early Morning',
    },
    {
        t_id : 'Last',
        task : '11:00 PM Compulsory Sleeping'
    }
];


app.get('/',(req,res)=>{
    return res.render('index',{
        data
    });
});
// insertdata
app.post('/addData',(req,res)=>{
    const t_id = Math.floor(Math.random() * 100);
    const {task} = req.body;
    const obj = {
        t_id : t_id,
        task : task
    }
    data.push(obj);
    return res.redirect('/');
});
// deletedata
app.get('/deleteData/:id',(req,res)=>{
    let id = req.params.id;
    let ans = data.filter((val)=>{
        return val.t_id != id;
    });
    data = ans;
    console.log('Task Is Successfully Remove');
    return res.redirect('/');
});
//upddate data
app.get('/updateData/:id',(req,res)=>{
    let id = req.params.id;
    let ans = data.filter((val)=>{
        return val.t_id == id;
    });
    return res.render('update',{
        onlyData : ans[0],
    });
})
app.post('/UpdateData',(req,res)=>{
    const {t_id,task} = req.body;
    data.map((val)=>{
        if(val.t_id == t_id)
        {
            val.task = task;
            console.log('Task Is Successfully Update');
        }
    });
    return res.redirect('/');
});
///clearData
app.get('/clearData',(req,res)=>{
    data = [];
    console.log('All Task Have Been Delete');
    return res.redirect('/');
});
// listen port
app.listen(port,(err)=>{
    if(err)
    {
        console.log(err);
        return false;
    }
    console.log('Server Is Running Well');
})