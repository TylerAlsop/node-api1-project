const db = require("./database.js");

const express = require("express");

const server = express();

server.use(express.json())


server.listen(3000, () => {
    console.log("Server started on port 3000")
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

server.get("/users/:id", (req, res) => {
    res.json({ message: "Users by ID!" })

    const userId = req.params.id;
    const user = db.getUserById(userId);

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    }
});
/*************** Not sure how to do this: *****************
 * If there's an error in retrieving the user from the database:

    respond with HTTP status code 500.
    return the following JSON object: { errorMessage: "The user information could not be retrieved." }. 
*/




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


    /* *********** Attempt at requirement shown below ***********

    if (!res) {
        res.status(500).json({
            errorMessage: "There was an error while saving the user to the database."
        })
    }
    */
})

/*************** See attempt above *****************
 * If there's an error while saving the user:

    respond with HTTP status code 500 (Server Error).
    return the following JSON object: { errorMessage: "There was an error while saving the user to the database" }. 
*/



//////////////// put & patch ////////////////

server.put("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        const updatedUser = db.updateUser(user.id, {
            name: req.body.name || user.name
            bio: req.body.bio || user.bio
        });

        res.json(updatedUser)
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    };

    /* *********** Attempt at requirement shown below ***********

    if (!req.body.name || !req.body.bio) {
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        })
    }
    */

    res.status(200).json(updatedUser)
})

/*************** See attempt(s) above *****************
* If the request body is missing the name or bio property:

    respond with HTTP status code 400 (Bad Request).
    return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.

*If there's an error when updating the user:

    respond with HTTP status code 500.
    return the following JSON object: { errorMessage: "The user information could not be modified." }.
*/




//////////////// delete ////////////////

server.delete("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        db.deleteUser(user.id)

        //204 is just a successful empty response
        res.status(204).end()
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    };
})

/*************** Not sure how to do this: *****************
If there's an error in removing the user from the database:

    respond with HTTP status code 500.
    return the following JSON object: { errorMessage: "The user could not be removed" }. 
*/