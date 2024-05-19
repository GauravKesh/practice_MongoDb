const express = require('express');
const {connectToDo, getDb} = require('./database');
const {ObjectId} = require('bson');
const port = 8000;

// init app & middleware
const app = express();
app.use(express.json()); // Middleware for parsing JSON

// db connection
let db;
connectToDo((err) => {
    if (!err) {
        app.listen(port, () => {
            console.log(`app is listening at ${port}`);
        });
        db = getDb();
    } else {
        console.error('Error connecting to database:', err);
    }
});

// routes
// getting all books from the database
app.get('/books', async (req, res) => {
    try {
        const books = await db.collection('books')
            .find()
            .sort({author: 1})
            .toArray();
        res.status(200).json(books);
    } catch (error) {
        console.error("Error fetching documents:", error);
        res.status(500).json({error: "Couldn't fetch the documents"});
    }
});

/// getting  books based on objectId

app.get('/books/:id', async (req, res) => {
    try {
        if (ObjectId.isValid(req.params.id)) {
            const doc = await db.collection('books')
                .findOne({_id: new ObjectId(req.params.id)});
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({error: "Book not found"});
            }
        } else {
            res.status(500).json({error: "Enter Valid Id"})
        }

    } catch (error) {
        console.error("Error fetching document:", error);
        res.status(500).json({error: "Couldn't fetch the document"});
    }
});

// adding a one data in the database

app.post('/books/add', (req, res) => {
    const book = req.body
    db.collection('books')
        .insertOne(book)
        .then(result=>{
            res.status(201).json(result)
        }).catch(err=>{
            res.status(500).json({err:"Couldn't create a new request"})
    })
})

// adding multiple data in the database
app.post('/books/addMany', (req, res) => {
    const book = req.body
    db.collection('books')
        .insertMany(book)
        .then(result=>{
            res.status(201).json(result)
        }).catch(err=>{
        res.status(500).json({err:"Couldn't create a new request"})
    })
})

// deleting single data from database

app.delete('/books/delete/:id', async (req, res) => {
    try {
        if (ObjectId.isValid(req.params.id)) {
            const result = await db.collection('books')
                .deleteOne({_id: new ObjectId(req.params.id)});
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({error: "Book couldn't be Deleted"});
            }
        } else {
            res.status(500).json({error: "Enter Valid Id of the book to delete"})
        }
    } catch (error) {
        console.error("Error fetching document:", error);
        res.status(500).json({error: "Couldn't fetch the document"});
    }
});


// updating the data in the database
app.patch('/books/update/:id', async (req, res) => {
    const updates = req.body
    try {
        if (ObjectId.isValid(req.params.id)) {
            const result = await db.collection('books')
                .updateOne({_id: new ObjectId(req.params.id)},{$set:updates});
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({error: "Book Details  couldn't be Updated"});
            }
        } else {
            res.status(500).json({error: "Enter Valid Id of the book "})
        }
    } catch (error) {
        console.error("Error fetching document:", error);
        res.status(500).json({error: "Couldn't fetch the document"});
    }
});

// fetching limited number of data at one time
// so this help us to get data at each page and don't increase the bandwidth of the data being fetched
// we can fetch those all documents at when it's required

app.get('/book/pages', (req, res) => {
    const page =req.query.p || 0
    const booksperPage =3
    let books=[]
    try {
        db.collection('books')
            .find()
            .skip(page*booksperPage)
            .limit(3)
            .sort({author: 1})
            .forEach(book=>books.push(book))
            .then(()=>{
                res.status(200).json(books);
            })
    } catch (error) {
        res.status(500).json({error: "Couldn't fetch the documents"});
    }
});