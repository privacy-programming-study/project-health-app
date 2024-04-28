const { verify } = require('jsonwebtoken');

module.exports = {
    checkToken: (req,res,next) => {
        let authHeader = req.headers['authorization'];
        const token = JSON.parse(authHeader);
        if(token) {
            verify(token['token'], "Encryptkey", (err, decoded) => {
                if(err) {
                    res.json({
                        success: 0, 
                        messgae: "Invalid Token"
                
                    });
                }
                else {  
                    next();
                }
            });
        }
        else {
            res.json({
                success: 0,
                message: "Unauthorized user, Access denied!"
            });
        }
    }
};