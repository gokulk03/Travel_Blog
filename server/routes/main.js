const express = require('express');
const router = express.Router();
const Post = require('../models/Post')


router.get('',async(req,res)=>{
    
    try{
        const locals = {
            title: "NodeJS blog",
            description: "Simple Blog created with NodeJS, express and MongoDB"
        }
        
        let perPage = 1;
        let page = req.query.page || 1;
        const data = await Post.aggregate([{$sort: {createdAt: -1}}]).skip(perPage * page - perPage).limit(perPage).exec();

        const count = await Post.countDocuments();
        const nextPage = parseInt(page)+1;
        const hasNextPage = nextPage<=Math.ceil(count/perPage);
        res.render('index',{locals,data,current: page,nextPage: hasNextPage?nextPage:null});
    }catch(error){
        console.log(error);
    }
    
});



router.get('/about',(req,res)=>{
    res.render('about');
});

// function insertPostData(){
//     Post.insertMany([
//         {
//            title: "Building a Blog",
//            body: "This is the body Text" 
//         }
//     ])
// }
// insertPostData();

router.get('',async(req,res)=>{
    
    try{
        const locals = {
            title: "NodeJS blog",
            description: "Simple Blog created with NodeJS, express and MongoDB"
        }
        
        
        res.render('index',{locals,data});
    }catch(error){
        console.log(error);
    }
    
});



module.exports = router;