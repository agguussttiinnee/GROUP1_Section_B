const express = require('express');

const router = express.Router();

let products = [
    {
        id: 1,
        name: 'Laptop',
        category: 'Technology',
        price: 45000,
        stock: 10
    },
    {
        id: 2,
        name: 'Keyboard',
        category: 'Accessories',
        price: 1500,
        stock: 25
    }
];

router.get('/', (req, res) => {
    let result = products;

    if (req.query.category) {
        result = result.filter(
            product =>
                product.category.toLowerCase() ===
                req.query.category.toLowerCase()
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
    const product = products.find(product => product.id === id);

    if (!product) {
        return res.status(404).json({
            success: false,
            error: {
                code: 'NOT_FOUND',
                message: 'Product not found.'
            }
        });
    }

    res.status(200).json({
        success: true,
        data: product,
        meta: {
            timestamp: new Date().toISOString(),
            count: 1
        }
    });
});

router.post('/', (req, res) => {
    const { name, category, price, stock } = req.body;

    if (!name || !category || price === undefined || stock === undefined) {
        return res.status(400).json({
            success: false,
            error: {
                code: 'BAD_REQUEST',
                message: 'Name, category, price, and stock are required.'
            }
        });
    }

    const newProduct = {
        id: products.length > 0
            ? Math.max(...products.map(product => product.id)) + 1
            : 1,
        name,
        category,
        price,
        stock
    };

    products.push(newProduct);

    res.status(201).json({
        success: true,
        data: newProduct,
        meta: {
            timestamp: new Date().toISOString(),
            count: 1
        }
    });
});

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = products.findIndex(product => product.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            error: {
                code: 'NOT_FOUND',
                message: 'Product not found.'
            }
        });
    }

    products.splice(index, 1);

    res.status(204).send();
});

module.exports = router;
