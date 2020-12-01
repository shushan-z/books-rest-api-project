const express = require('express');
const books = require('../books-data/books.json')
const { check, validationResult } = require('express-validator');
const fs = require('fs');

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

router.post('/',
    check('title').notEmpty(),
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: "title is required" });
        }
        let bookIds = books.map(book => book.id);

        let newId = bookIds.length > 0 ? Math.max.apply(Math, bookIds) + 1 : 1;
        let newBook = {
            id: newId,
            title: req.body.title,
            pages: req.body.pages,
            published: req.body.published
        };

        books.push(newBook);
        let addedBook = JSON.stringify(books, null, 2);

        fs.writeFile('./books-data/books.json', addedBook, (err) => {
            if (err) throw err;
        })
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

        let editedBooks = JSON.stringify(books, null, 2);
        fs.writeFile('./books-data/books.json', editedBooks, (err) => {
            if (err) throw err;
        })
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
        
        let delBooks = JSON.stringify(books, null, 2);

        fs.writeFile('./books-data/books.json', delBooks, (err) => {
            if (err) throw err;
        })
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;