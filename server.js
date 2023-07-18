const express = require('express')
const mongoose = require('mongoose')
const Company = require('./models/companyModel')
const app = express ()
 
 app.use(express.json())
 
app.get("/search" ,async(req,res) => {
  
 try {
        const {firstname,lastname,City,email} = req.query;  

   let match= {};
  

 if(req.query.firstname) {
    match.firstname = {$regex : firstname,$options: "i"};;
  }

  if(req.query.lastname) {
    match.lastname = {$regex : lastname,$options: "i"};;
  }

  if(req.query.City) {
    match.City =  {$regex : City,$options: "i"};;
  }


if(req.query.email) {
    match.email = {$regex : email,$options: "i"};;
  }

  

  if(req.query.age) {
 match.age = parseInt(req.query.age)
  }
  
 const data = await Company.aggregate([
      
      {$addFields : {
          age:{ 
            $floor : {
              $divide: [ 
                {$subtract: [ "$$NOW", "$Birthdate" ]}, 
               (365 * 24 * 60 * 60 * 1000) 
                       ] 
                     }
               },
        
                  
                    }   
             

        },
     
        {$match : match } ,
        
       

    ]); 
       
    res.status(200).json(data)
      
 } catch (err) {
  res.status(401).json({
     status: 'error',
      message: 'Data not found',
      error: err
                    })
}
  })
   

app.post('/send',async (req, res)=>{
    try {
const  company = await Company.create(req.body)
          res.status(200).json(company);

    }catch(error) {
    console.log(error.message)
    res.status(500).json({message : error.message} )
    }
})


mongoose.connect( 'mongodb+srv://rup:UhvPJE4qeGRTfQY2@cluster0.t1ix1tp.mongodb.net/school?retryWrites=true&w=majority')
.then(()=>{
   console.log('Now connected to mongodb')
   
   app.listen(4000, () => {
    console.log ('App is running  port 4000')

   })

}).catch((error)=>{
    console.log(error)
});


      