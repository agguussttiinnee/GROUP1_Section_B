const express = require('express');

const router = express.Router();

let categories = [
    {
        id: 1,
        name: 'Technology',
        description: 'Technology-related products'
    },
    {
        id: 2,
        name: 'Accessories',
        description: 'Computer and device accessories'
    }
];

router.get('/', (req, res) => {
    let result = categories;

    if (req.query.name) {
        result = result.filter(
            category =>
                category.name.toLowerCase() ===
                req.query.name.toLowerCase()
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
    const category = categories.find(category => category.id === id);

    if (!category) {
        return res.status(404).json({
            success: false,
            error: {
                code: 'NOT_FOUND',
                message: 'Category not found.'
            }
        });
    }

    res.status(200).json({
        success: true,
        data: category,
        meta: {
            timestamp: new Date().toISOString(),
            count: 1
        }
    });
});

router.post('/', (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({
            success: false,
            error: {
                code: 'BAD_REQUEST',
                message: 'Name and description are required.'
            }
        });
    }

    const newCategory = {
        id: categories.length > 0
            ? Math.max(...categories.map(category => category.id)) + 1
            : 1,
        name,
        description
    };

    categories.push(newCategory);

    res.status(201).json({
        success: true,
        data: newCategory,
        meta: {
            timestamp: new Date().toISOString(),
            count: 1
        }
    });
});

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = categories.findIndex(category => category.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            error: {
                code: 'NOT_FOUND',
                message: 'Category not found.'
            }
        });
    }

    categories.splice(index, 1);

    res.status(204).send();
});

module.exports = router;
