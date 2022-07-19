const { findOneAndDelete } = require("./model");
const User = require("./model");

exports.signUp = async (req, res) => {
try {
    const newUser = await User.create(req.body); // req.body is an object that contains k/v pairs that match my user model.
    res.send({user: newUser});
} catch (error) {
    console.log(error);
    res.send({error});
}
};

exports.login = async (req, res) => {
    try {
      const user = await User.findOneAndUpdate({ 
        username: req.body.username, 
      },{signedIn:true});
      if (!user) {
        throw new Error("login failed");
      } else {
        res.send({ user });
      }
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
  };

  exports.getEmail = async (req,res) => {
    try{
        const user = await User.findOne({
            username:req.params.username
        });
        res.send(user.email);
    } catch(error){
        console.log(error);
        res.send({error});
    }
};

exports.deleteUser = async (req,res) => {
    try{
        await User.findOneAndDelete({ 
            username:req.params.username, 
        });
        res.end();
    } catch(error){
        console.log(error);
        res.send({error});
    }
};

exports.changePass = async (req,res) => {
    try{const user = await User.findOne({username:req.body.username});
        if(user.signedIn){
        await User.findOneAndUpdate({
            username:req.body.username,
        },
        {$set:{
            password:req.body.password,
        }});
        res.end();
    }else{throw new Error("not signed in");res.end();}}
    catch(error){
        console.log(error);
        res.send({error});
    }
};

exports.displayUsers = async (req,res) => {
    try{
        res.send(await User.find());
        
    }catch(error){
        console.log(error);
        res.send({error});
    }
};