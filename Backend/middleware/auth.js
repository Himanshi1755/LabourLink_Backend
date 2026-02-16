import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next)=>{

    console.log("Cokkies : "  , req.cookies);
    const token = req.cookies.token;
     console.log("token : "  , token);
    
    if(!token) return res.status(401).json({ message: "Unauthorized" });

    try{
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user =decoded;
        next();
    }

    catch(err){
 res.status(401).json({ message: "Invalid Token" });
    }
}