const express = require('express');

const router = express.Router();

let users = [
    {
        id: 1,
        name: 'Juan Dela Cruz',
        email: 'juan@example.com',
        role: 'admin'
    },
    {
        id: 2,
        name: 'Maria Santos',
        email: 'maria@example.com',
        role: 'user'
    }
];

router.get('/', (req, res) => {
    let result = users;

    if (req.query.role) {
        result = result.filter(
            user => user.role.toLowerCase() === req.query.role.toLowerCase()
        );
    }

    res.status(200).json({
        success: true,
        data: result,
        meta: {
            timestamp: new Date().toISOString(),
            count: result.length
        }
    });
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            error: {
                code: 'NOT_FOUND',
                message: 'User not found.'
            }
        });
    }

    res.status(200).json({
        success: true,
        data: user,
        meta: {
            timestamp: new Date().toISOString(),
            count: 1
        }
    });
});

router.post('/', (req, res) => {
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
        return res.status(400).json({
            success: false,
            error: {
                code: 'BAD_REQUEST',
                message: 'Name, email, and role are required.'
            }
        });
    }

    const newUser = {
        id: users.length > 0
            ? Math.max(...users.map(user => user.id)) + 1
            : 1,
        name,
        email,
        role
    };

    users.push(newUser);

    res.status(201).json({
        success: true,
        data: newUser,
        meta: {
            timestamp: new Date().toISOString(),
            count: 1
        }
    });
});

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            error: {
                code: 'NOT_FOUND',
                message: 'User not found.'
            }
        });
    }

    users.splice(index, 1);

    res.status(204).send();
});

module.exports = router;



src > databases > index.js >

require('dotenv').config()
const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.db_user,
    password:process.env.db_password,
    database: process.env.db_name
})

module.exports = { db }







index.js

const app = require('express')
const { db } = require('./src/databases')
const { getAllUsers, findById } = require('./src/controllers/users')

//Server setup
const server = app()
server.listen(8807, '0.0.0.0', (err) => {
    if (err) return console.error(err)
    console.log(Server is running...)
})


db.connect((err) => {
    if (err) return console.log(err)
    console.log('Database is connected!')
})

server.use('/api/users', getAllUsers)
server.use('/api/users/:id', findById)




src > controllers > users.js

const { db } = require ('../databases')

exports.getAllUsers = (req, res) => {
    db.query('SELECT * FROM users', (err, res) => {
        if(err) return console.error(err)
        res.json(result)
    })
}

exports.findById = (req, res) => {
    const { id } = req.params

    db.query('SELECT * FROM users WHERE id = ?', [id], (err, res) => {
        if(err) return console.error(err)
        res.json(result)
    })
}

module.exports = { db }



src > models > users.js

let test =[
    {
        id: 1,
        name: "YES"
    },
    {
        id: 2,
        name: "NO"
    }
]

const UserModel = {
    findAll: (val) => {
        if(!val) return test;
        return users
    },

    findById: (id) => {
        return users.find((val = val.id === id))
    }
}

module.exports = UserModel






.env

db_user = ' '
db_password = ' '
db_name = ' '

lib     response.js
const isSuccess = (data) => {
    return {
        success: true,
        error: false,
        data,
    }
}

const isError = (data) => {
    return {
        success: false,
        error: true,
        data,
    }
}

const

module.exports = { isSuccess, isError }
