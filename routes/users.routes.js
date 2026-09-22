const express = require('express');

const router = express.Router();

let users = [
    {
        id: 1,
        name: 'Carl Agustine S. Noblesala',
        email: 'agguussttiinnee@gmail.com',
        role: 'admin'
    },
    
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