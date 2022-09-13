const mongoose=require("mongoose")

const contentSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    heading:{
        type:String,
        required:true
    },
    context:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

const contentModel=mongoose.model("usercontent",contentSchema)

module.exports=contentModel