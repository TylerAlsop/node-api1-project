let users = [
	{ id: "1", name: "Tyler Alsop", bio: "I am the creator of this app" },
	{ id: "2", name: "Eric Alsop", bio: "I am the brother of the creator of this app" },
	{ id: "3", name: "Toshina Alsop", bio:"I am the sister of the creator of this app" },
]

function getUsers() {
	return users
}

function getUserById(id) {
	return users.find(u => u.id === id)
}

function createUser(data) {
	const payload = {
		id: String(users.length + 1),
		...data,
	}

	users.push(payload)
	return payload
}

function updateUser(id, data) {
	const index = users.findIndex(u => u.id === id)
	users[index] = {
		...users[index],
		...data,
	}
	
	return users[index]
}

function deleteUser(id) {
	users = users.filter(u => u.id != id)
}

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
}