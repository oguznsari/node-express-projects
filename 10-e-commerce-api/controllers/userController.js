const getAllUsers = async (req, res) => {
    res.send('GET all users route.');
}

const getSingleUser = async (req, res) => {
    res.send('GET single user route.')
}

const showCurrentUser = async (req, res) => {
    res.send('SHOW current user route.')
}

const updateUser = async (req, res) => {
    res.send('UPDATE user route.');
}

const updateUserPassword = async (req, res) => {
    res.send('UPDATE User Password route.');
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
};