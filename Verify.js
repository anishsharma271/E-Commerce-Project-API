const jwt = require('jsonwebtoken')
const signature="anish@34%$%*^%%#4shar##@$^%$%$ma@&7!*1"

const middleware=(req,res,next)=>{
    console.log('aa',req.body)
    var decoded = jwt.verify(req.headers.token, signature);
    // console.log(decoded);
    console.log(req.body.id);
    req.body.id=decoded.id;
    // console.log(req.body.id);

    next();

}
module.exports={middleware}