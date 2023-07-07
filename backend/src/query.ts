// Users

const addUser = 'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING user_id;'
const checkIfUsernameExist = 'SELECT * FROM users WHERE username = $1;'
const checkIfUserIdExist = 'SELECT * FROM users WHERE user_id = $1'

export default {
    addUser,
    checkIfUsernameExist,
    checkIfUserIdExist
}