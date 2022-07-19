const { Router } = require("express"); // import Router method only from express
const { signUp, login, delUser, findEmail, updatePass, dispUsers } = require("./controllers"); // import only signUp from controllers file
const { hashPass, checkPass } = require("../middleware"); 
const userRouter = Router(); // create a router that can have endpoints added to it

userRouter.post("/user", hashPass, signUp); //defining a post request on /user path, that calls the sign up controller
userRouter.post("login", checkPass, login); //defining a post request on /login path, that calls the login controller
userRouter.get("/user/:username", findEmail);
userRouter.delete("/user/:username",delUser);
userRouter.patch("uppass", hashPass, updatePass);
userRouter.get("/users",dispUsers);

module.exports = userRouter;