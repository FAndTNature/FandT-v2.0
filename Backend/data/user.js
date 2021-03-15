const bcrypt = require('bcryptjs')

const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: true
    },
    {
        name: 'Adam',
        email: 'adam@gmail.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: false
    },
    {
        name: 'uttu',
        email: 'uttu@gmail.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: false
    },
    {
        name: 'kuttu',
        email: 'kuttu@gmail.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: false
    } 
]

module.exports = users