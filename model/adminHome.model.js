const dotenv =  require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const model = require('./registration.model')
const DB_URL = process.env.DB_URL


exports.getStudents = (name)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return model.Student.find({teacher:name.substring(0, name.length - 1)}).then((students)=>{
                mongoose.disconnect()
                resolve(students)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        })
    })
}


exports.getTeacher = (name)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return model.Teacher.find({name:name}).then((teacher)=>{
                mongoose.disconnect()
                resolve(teacher)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        })
    })
}