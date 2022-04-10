exports.home=(req,res)=>{
    res.status(200).json({
        success:true,
        greeting:"Hello from API"
    });
}

exports.homev2=(req,res)=>{
    res.status(200).json({
        success:true,
        greeting:"version 2 of api"
    });
}