const express = require('express');
const books = require('../books-data/books.json')
const router = express.Router();

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