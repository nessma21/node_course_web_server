const express = require('express');
const fs=require('fs');
var app=express();

//Dynamically injecting (Templating Engine)
const hbs=require('hbs');

//For PArtials


hbs.registerHelper('upper',(text)=>{return text.toUpperCase()})
app.set('view engine','hbs');

//To SetUp Static Directory
app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now} : ${req.method} ${req.url}`;
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){console.log('Unable to append to server.log')}
    });
    next();
})

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

app.get('/',(req,res)=>{
    // res.send({
    //     name:'Andrew',
    //     likes:['Biking','Cities']
    // })
    res.render('home.hbs',{
        pageTittle:'Home Page',
        welcomeMessage:'Welcome to my WebSite..'
    })
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTittle:'About Page',
        
    })
});

app.get('/bad',(req,res)=>{
    res.send({errorMessge:'Unable to handle request !!'})
});
app.listen(3000);