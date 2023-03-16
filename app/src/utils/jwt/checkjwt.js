const jwt = require('jsonwebtoken');
//...
module.exports = {
    verifyToken(token,value) {
        try {
            if(value===0){ return jwt.verify(token, process.env.ACCESS_SECRET);
            }else{ return jwt.verify(token, process.env.REFRESH_SECRET);}
        } catch (e) {
             if (e.name === 'TokenExpiredError') {
                
                return null
             }
           
        }
        
    }
}
