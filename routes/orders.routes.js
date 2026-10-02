const express = require('express');

const router = express.Router();

let orders = [
    {
        id: 1,
        customer: 'Juan Dela Cruz',
        product: 'Laptop',
        quantity: 1,
        status: 'pending'
    },
    {
        id: 2,
        customer: 'Maria Santos',
        product: 'Keyboard',
        quantity: 2,
        status: 'completed'
    }
];

router.get('/', (req, res) => {
    let result = orders;

    if (req.query.status) {
        result = result.filter(
            order =>
                order.status.toLowerCase() ===
                req.query.status.toLowerCase()
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
    const order = orders.find(order => order.id === id);

    if (!order) {
        return res.status(404).json({
            success: false,
            error: {
                code: 'NOT_FOUND',
                message: 'Order not found.'
            }
        });
    }

    res.status(200).json({
        success: true,
        data: order,
        meta: {
            timestamp: new Date().toISOString(),
            count: 1
        }
    });
});

router.post('/', (req, res) => {
    const { customer, product, quantity, status } = req.body;

    if (!customer || !product || quantity === undefined || !status) {
        return res.status(400).json({
            success: false,
            error: {
                code: 'BAD_REQUEST',
                message: 'Customer, product, quantity, and status are required.'
            }
        });
    }

    const newOrder = {
        id: orders.length > 0
            ? Math.max(...orders.map(order => order.id)) + 1
            : 1,
        customer,
        product,
        quantity,
        status
    };

    orders.push(newOrder);

    res.status(201).json({
        success: true,
        data: newOrder,
        meta: {
            timestamp: new Date().toISOString(),
            count: 1
        }
    });
});

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = orders.findIndex(order => order.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            error: {
                code: 'NOT_FOUND',
                message: 'Order not found.'
            }
        });
    }

    orders.splice(index, 1);

    res.status(204).send();
});

module.exports = router;
