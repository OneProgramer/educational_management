const dotenv =  require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const model = require('./registration.model')
const DB_URL = process.env.DB_URL

  
exports.saveLecture =  (email,link,fileName)=>{

    return new Promise((resolve,rejcet)=>{
        mongoose.connect(DB_URL).then(()=>{
            model.Teacher.findOneAndUpdate({email:email},{$push:{lessons:link,fileName:fileName}}).then(()=>{
                mongoose.disconnect()
                resolve()
            }).catch((err)=>{
                mongoose.disconnect()
                rejcet(err)
            })
        })
    })
}


exports.getLecture = (name)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
           return model.Teacher.findOne({name:name}).then((teacher)=>{
                mongoose.disconnect()
                if(teacher){
                resolve(teacher)
                }else{
                resolve()
                }
            }).catch((err)=>{
                reject(err)
            })
        })
    })
}


