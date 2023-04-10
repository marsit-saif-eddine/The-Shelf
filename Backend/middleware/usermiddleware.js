
const exportparam = async  (req,res,next) =>{

({email,rating}=req.body)
req.email=email
req.rating=rating
next()
//res.send({email,rating})

}

module.exports={exportparam}
  