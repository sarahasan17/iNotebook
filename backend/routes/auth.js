const express=require('express');
const router=express.Router();
router.get('/',(req,res)=>{
    const obj={
        name:"amma",
        age:"45"
    }
    res.json(obj)
})
module.exports=router;