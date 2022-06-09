import express from 'express';
import { v4 as uuid} from 'uuid';

class Book {
    constructor(title = '', desc = '', authors = '', favorite = '', fileCover = '', fileName = '', id = uuid()) {
        this.title = title;
        this.desc = desc;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.id = id;
    }
}

const stor = {
    book: [
        new Book(),
    ],
};

const app = express();
app.use(express.json());

app.get('/api/books', (req, res) => {
    const {book} = stor;
    res.json(book);
});

app.get('/api/books/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(book[idx]);
    } else {
        res.status(404).type('text/plain');
        res.json('404 | страница не найдена');
    }
});

app.post('/api/user/login', (req, res) => {
    const user = {
        "id": "1",
        "mail": "test@mail.ru"
    };

    res.status(201).type('text/plain');
    res.json(user);
});

app.post('/api/books', (req, res) => {
    const {book} = stor;
    const {title, desc, authors, favority, fileCover, fileName} = req.body;

    const newBook = new Book(title, desc, authors, favority, fileCover, fileName);
    book.push(newBook);

    res.status(201);
    res.json(newBook);
})

app.put('/api/books/:id', (req, res) => {
    const {book} = stor;
    const {title, desc, authors, favorite, fileCover, fileName} = req.body;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1){
        book[idx] = {
            ...book[idx],
            title,
            desc,
            authors,
            favorite,
            fileCover,
            fileName
        };

        res.json(book[idx]);
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
})

app.delete('/api/books/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        book.splice(idx, 1);
        res.json('ok');
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
