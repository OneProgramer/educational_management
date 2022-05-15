const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const model = require('../model/adminHome.model')

router.post('/adminhome',bodyParser.urlencoded({extended:true}),async(req,res)=>{
    let name = req.body.name;
    new Promise((resolve,reject)=>{
        let  stuReq  = []
        model.getStudents(name).then((s)=>{
            let first = {name:'',degree:0}
            let second = {name:'',degree:0}
            let third = {name:'',degree:0}
    
            for(let i=0;i<s.length;i++){
                if(s[i].accept == true){
                    let degree = 0;
                for(let j=0;j<s[i].tasks.length;j++){
                    degree += s[i].tasks[j].stuDegree; 
                }
                
                for(let j=0;j<s[i].degrees.length;j++){
                    degree += s[i].degrees[j].degree; 
                }

          
                    if(degree >= first.degree){
                        first.name = s[i].name
                        first.degree = degree
                    }

                }
            }

            for(let i=0;i<s.length;i++){
                if(s[i].accept == true){
                    let degree = 0;
                for(let j=0;j<s[i].tasks.length;j++){
                    degree += s[i].tasks[j].stuDegree; 
                }
                
                for(let j=0;j<s[i].degrees.length;j++){
                    degree += s[i].degrees[j].degree; 
                }

          
                    if(degree >= second.degree && degree < first.degree){
                        second.name = s[i].name
                        second.degree = degree
                    }

                }
            }

            for(let i=0;i<s.length;i++){
                if(s[i].accept == true){
                    let degree = 0;
                for(let j=0;j<s[i].tasks.length;j++){
                    degree += s[i].tasks[j].stuDegree; 
                }
                
                for(let j=0;j<s[i].degrees.length;j++){
                    degree += s[i].degrees[j].degree; 
                }

          
                    if(degree >= third.degree && degree < first.degree  && degree < second.degree){
                        third.name = s[i].name
                        third.degree = degree
                    }

                }
            }

         


            for(let i=0;i<s.length;i++){
                if(s[i].accept == false){
                    stuReq.push(s[i].name)
                }
            }
    
             return([first,second ,third,stuReq])
        }).then(async(best)=>{
           await model.getTeacher(name).then((teacher)=>{
                res.json({teacher:teacher,best:best})
            })
            resolve()
        })

    })
       
     }) 












  
module.exports = router