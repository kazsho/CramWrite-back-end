const Token = require('../models/token');
const Client = require('../models/Client');

async function teacherAuthenticator(req, res, next) {
    try {
        const userToken = req.headers.authorization;

        if (userToken == null) {
            throw new Error("User not authenticated.");
        } else {
            const validToken = await Token.getOneByToken(userToken);
          

            const client = await Client.getOneById(validToken.client);
           
            
            if(!(await client.checkTeacher())) {
                throw new Error("User not a teacher.");
            }

            next();
        }
    } catch (err) {
        res.status(403).json({error: err.message});
    }
}

module.exports = teacherAuthenticator;