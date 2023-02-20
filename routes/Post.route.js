const express = require("express");
const { PostModel } = require("../models/Posts.model")
const postRoute = express.Router();

postRoute.get("/", async (req, res) => {
    const user_id = req.body.userID;
    try {
        const allposts = await PostModel.find({ userID: user_id });
        res.send(allposts);
    } catch (err) {
        res.send({ "msg": "Error in fetching Posts", "error": err })
    }

})

postRoute.get("/top", async (req, res) => {
    const user_id = req.body.userID;
    try {
        const allposts = await PostModel.find({ userID: user_id });
        let max = -Infinity;
        let user;
        allposts.forEach((el) => {
            if (el.no_if_comments > max) {
                max = el.no_if_comments
                user = el;
            }
        })
        res.send(user);
    } catch (err) {
        res.send({ "msg": "Error in fetching top Posts", "error": err })
    }
})

postRoute.post("/create", async (req, res) => {
    const payload = req.body;
    try {
        let post = new PostModel(payload);
        await post.save();
        res.send({ "msg": "Post successfully created" })
    } catch (err) {
        res.send({ "msg": "Error in create Posts", "error": err })
    }

})


postRoute.patch("/update/:id", async (req, res) => {
    const ID = req.params.id
    const payload = req.body;
    try {
        await PostModel.findByIdAndUpdate({ _id: ID }, payload);
        res.send({ "msg": "Post successfully updated" })
    } catch (err) {
        res.send({ "msg": "Error in updating Posts", "error": err })
    }
})


postRoute.delete("/delete/:id", async (req, res) => {
    const ID = req.params.id;
    try {
        await PostModel.findByIdAndDelete(ID);
        res.send({ "msg": "Post successfully deleted" })
    } catch (err) {
        res.send({ "msg": "Error in updating Posts", "error": err })
    }
})

module.exports = {
    postRoute
}


// "title": "App",
// "body": "linked app",
// "device": "Mobile",
// "no_if_comments": 10