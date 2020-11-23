const express = require('express');
const router = express.Router();

let books = [
    { id: 1, title: 'Book 1', pages: 154, published: 1996 },
    { id: 2, title: 'Book 2', pages: 218, published: 1987 },
    { id: 3, title: 'Book 3', pages: 451, published: 1899 },
    { id: 4, title: 'Book 4', pages: 268, published: 1974 },
    { id: 5, title: 'Book 5', pages: 324, published: 1952 },
];

router.get('/', function (req, res) {
    res.status(200).json(books);
});

router.get('/:id', function (req, res) {

    let found = books.find(function (book) {
        return book.id === parseInt(req.params.id);
    });
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', function (req, res) {
    let bookIds = books.map(book => book.id);

    let newId = bookIds.length > 0 ? Math.max.apply(Math, bookIds) + 1 : 1;

    let newBook = {
        id: newId,
        title: req.body.title,
        pages: req.body.pages,
        published: req.body.published
    };

    books.push(newBook);

    res.status(201).json(newBook);
});

router.put('/:id', function (req, res) {
    let found = books.find(function (book) {
        return book.id === parseInt(req.params.id);
    });

    if (found) {
        let updated = {
            id: found.id,
            title: req.body.title
        };

        let targetIndex = books.indexOf(found);

        books.splice(targetIndex, 1, updated);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

router.delete('/:id', function (req, res) {
    let found = books.find(function (book) {
        return book.id === parseInt(req.params.id);
    });

    if (found) {

        let targetIndex = books.indexOf(found);

        books.splice(targetIndex, 1);
    }

    res.sendStatus(204);
});

module.exports = router;