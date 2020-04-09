const db = require("./database.js");

const express = require("express");

const server = express();

server.use(express.json())

const port = 5000


server.listen(port, () => {
    console.log(`Server started on port ${port}`)
});

//////////////// get ////////////////

server.get("/api/", (req, res) => {
    res.json({ message: "Hello World. This is the home page route" })
});

server.get("/api/users", (req, res) => {
    res.json({ message: "Welcome to the route displaying the users." })
    const users = db.getUsers();
    
    if (users) {
        res.json(users);
    } else {
        res.status(500).json({
            errorMessage: "The users information could not be retrieved."
        })
    };

});

server.get("/api/users/:id", (req, res) => {
    res.json({ message: "Users by ID!" })

    const userId = req.params.id;
    const user = db.getUserById(userId)

    .then(user => {
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        }
    })

    .catch(errors => {
        console.log(error);
        res.status(500).json({
            errorMessage: "The user information could not be retrieved."
        })
    })
    
});


//////////////// post ////////////////

server.post("/api/users", (req, res) => {

    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio
    })

    .then(newUser => {
        if (!req.body.name || !req.body.bio) {
            return res.status(400).json({
                message: "Both a user name and bio are required.",
            })
        }
    })

    .catch(errors => {
        res.status(500).json({
            errorMessage: "There was an error while saving the user to the database."
        })
    })

    res.status(201).json(newUser);

});



//////////////// put & patch ////////////////

server.put("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    .then(user => {
        if (user) {
            const updatedUser = db.updateUser(user.id, {
                name: req.body.name || user.name,
                bio: req.body.bio || user.bio
            })
    
            res.json(updatedUser)
        } else if (!req.body.name || !req.body.bio) {
            return res.status(400).json({
                message: "Please provide name and bio for the user.",
            })
        } else {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        };
    })

    .catch(errors => {
        res.status(500).json({
            errorMessage: "The user information could not be modified."
        })
    })

    res.status(200).json(updatedUser)
})



//////////////// delete ////////////////

server.delete("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    .then(user => {
        if (user) {
            db.deleteUser(user.id)
    
            //204 is just a successful empty response
            res.status(204).end()
        } else {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        }
    })

    .catch(errors => {
        res.status(500).json({
            errorMessage: "The user could not be removed."
        })
    })
    
})
