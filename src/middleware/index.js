const bcrypt = require("bcryptjs");
const User = require("../user/model");


exports.hashPass = async (req, res, next) => {
try {
    req.body.pass = await bcrypt.hash(req.body.password, 8);
    next(); //moves onto next middleware/controller in endpoint
} catch (error) {
    console.log(error);
    res.send({ error });
}
};

exports.checkPass = async (req, res, next) => {
    try{
        const userCheck = await User.findOne({
            username: req.body.username,})
            const check = await bcrypt.compare(req.body.password, userCheck.password);
            if(check){
                next();
            }
            else{
                throw new Error("Incorrect Credentials");
            }
    } catch(error){
        console.log(error);
        res.send({error});
    }
};

exports.tokenCheck = async (req, res, next) => {
    try {
      const decodedToken = jwt.verify(
        req.header("Authorization"),
        process.env.SECRET
      );
      req.user = await User.findById(decodedToken.id);
      next();
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
  };