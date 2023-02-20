const express = require("express");
const {connection} = require("./config/main")
const {userRoute} = require("./routes/User.route")
const {postRoute} = require("./routes/Post.route")
const {Authentication} = require("./middlewares/auth.middleware")
const cors = require("cors")
const app = express();
app.use(cors());
app.use(express.json())


app.use("/users",userRoute)
app.use(Authentication)
app.use("/posts",postRoute)

app.get("/",(req,res)=>{
    res.send("homepgae")
})

app.listen(8080,async()=>{
    try {
        await connection;
        console.log("database connected");
        console.log("port running");
    } catch (err) {
        console.log(err);
    }
})