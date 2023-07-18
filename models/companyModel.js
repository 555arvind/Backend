const mongoose = require('mongoose')
const validator = require('validator')
const companySchema = mongoose.Schema (
    {
        firstname :{
            type : String,
            required : [true,"Please provide the first name"]  

        },
        lastname :{
            type : String,
            required : [true,"Please provide the last name"]

        },
        email: {
            type: String,
            required : [true,"email is mandatory"],
            unique: true,
            validate(value){
                if(!validator.isEmail(value)) {
                    throw new Error ("Email is invalid");
                }
            }
        },
        Mobile: {
            type: String,
            trim: true,
            validate: {
              validator: function (v) {
                return /^[0-9]{10}/.test(v);
              },
              message: '{VALUE} is not a valid 10 digit number!'
            },
            maxlength : 10
        },
        Birthdate : {

            type :  Date ,
            default: Date.now,
            required : false
        },
        Address_1 : {
            type : String,
            required : true
        },
         Address_2 : {
            type : String,
            required : false
         },
         Pincode : {
            type: String,
            trim: true,
            validate: {
              validator: function (v) {
                return /^[0-9]{6}/.test(v);
              },
              message: '{VALUE} is not a valid 6 digit number!'
            },
            maxlength : 6
         },
         City : {
            type :String,
            required : true
         },
         State : {
            type :String,
            required : true

         },
         Type: {
            type: String,
            enum : ["Home","Office"]
            
        }, 
        

    }
)

const Company = mongoose.model('company',companySchema);
module.exports = Company;