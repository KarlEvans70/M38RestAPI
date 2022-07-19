const { Router } = require("express"); // import router method only from express
const { signUp, login, changePass, deleteUser, getEmail, displayUsers } = require("./controllers"); // import only signUp from controllers file
const { hashPass, checkPass } = require("../middleware"); 
const userRouter = Router(); // create a router that can have endpoints added to it

userRouter.post("/user", hashPass, signUp); //defining a post request on /user path, that calls the sign up controller
userRouter.post("login", checkPass, login); //defining a post request on /login path, that calls the login controller
userRouter.post("/changepass", hashPass, changePass);
userRouter.delete("/user/:username",deleteUser);
userRouter.get("/user/:username", getEmail)
userRouter.get("/users",displayUsers);
userRouter.get("/token", tokenCheck, login);

module.exports = userRouter;