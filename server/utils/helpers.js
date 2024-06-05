const jwt = require('jsonwebtoken');
require("dotenv").config();

exports = {}

exports.getToken = async (email,user) => {
    const token = jwt.sign({identifier: user._id},process.env.JWT_SECRET);
    return token;
};

module.exports = exports