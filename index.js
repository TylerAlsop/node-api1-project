const db = require("./database.js");

const express = require("express");

const server = express();

server.use(express.json())


server.listen(3000, () => {
    console.log("Server started on port 8080")
});

//////////////// get ////////////////

server.get("/api/", (req, res) => {
    res.json({ message: "Hello World. This is the home page route" })
});

server.get("/api/users", (req, res) => {
    res.json({ message: "Welcome to the route displaying the users." })
    const users = db.getUsers();
    res.json(users);
});

server.get("/users/:id", (req, res) => {
    res.json({ message: "Users by ID!" })

    const userId = req.params.id;
    const user = db.getUserById(userId);

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({
            message: "User not found",
        })
    }
});

//////////////// post ////////////////

server.post("/api/users", (req, res) => {
    if (!req.body.name || !req.body.bio) {
        return res.status(400).json({
            message: "Both a user name and bio are required.",
        })
    };

    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio
    })

    res.status(201).json(newUser);
})

//////////////// put & patch ////////////////

server.patch("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        const updatedUser = db.updateUser(user.id, {
            name: req.body.name || user.name
        });

        res.json(updatedUser)
    } else {
        res.status(404).json({
            message: "User does not exist. Make sure you have the correct user ID."
        })
    };

    res.status(201).json(updatedUser)
})

//////////////// delete ////////////////

server.delete("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        db.deleteUser(user.id)

        //204 is just a successful empty response
        res.status(204).end()
    } else {
        res.status(404).json({
            message: "User does not exist. Make sure you have the correct user ID."
        })
    };
})