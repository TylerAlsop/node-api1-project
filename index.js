const express = require("express");

const server = express();

server.use(express.json())


server.listen(3000, () => {
    console.log("Server started on port 8080")
});

//////////////// get ////////////////

server.get("/", (req, res) => {
    res.json({ message: "Hello World" })
});

//////////////// post ////////////////

server.post("/users", (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({
            message: "Need a user name",
        })
    };

    const newUser = db.createUser({
        name: req.body.name,
    })

    res.status(201).json(newUser);
})

//////////////// put ////////////////

server.put("/users/:id", (req, res) => {
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

server.delete("/users/:id", (req, res) => {
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