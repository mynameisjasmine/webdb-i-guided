const express = require('express');

// database access using knex
const db = require('../data/db-config.js');
const knex = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
//list of posts, SELECT * from posts
knex.select('*').from('posts')
.then(posts => {
 res.status(200).json(posts)
})
.catch(err => {
res.status(500).json({error: "Could not load data from posts"})
})
});

router.get('/:id', (req, res) => {
knex.select('*')
.from('posts')
.where('id','=', req.params.id).first()
.then(post => {
res.status(200).json(post)
})
.catch(err => {
    res.status(500).json({error: "Could not load data from specified id"})
    })
});

router.post('/', (req, res) => {
knex
.insert(req.body, 'id')
.into('posts')
.then(ids => {
res.status(201).json(ids)
})
.catch(err => {
res.status(500).json({error: " Failed to insert post from database"})
 })
});

router.put('/:id', (req, res) => {
const changes = req.body;

knex('posts')
.where({id: req.params.id})
.update(changes)
.then(count => {
res.status(200).json(count)
})
.catch(err => {
res.status(500).json({error: "Failed to update post"})
})
});

router.delete('/:id', (req, res) => {
knex('posts')
.where({id: req.params.id})
.del()
.then(count => {
res.status(200).json(count)
})
.catch(err => {
res.status(500).json({error: "Failed to delete post"})
 })
});

module.exports = router;