const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // this is the GET route for /api/tags it uses the product model to find all tags
  Tag.findAll({
    include: [
      {
        model:Product, 
        through:ProductTag,
      },
    ],
  })
  .then((tag) => { res.json(tag) })
  .catch((err) => { res.json(err) })
});


router.get('/:id', (req, res) => {
  // this is the GET route for /api/tags/:id it uses the product model to find a single tag by its id
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model:Product,
        through:ProductTag
      }
    ]
  })
  .then((tag) => { res.json(tag) })
  .catch((err) => { res.json(err) })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((tag) => { res.json(tag) })
  .catch((err) => { res.json(err) })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,{
    where: {
      id: req.params.id
    }
  })
  .then((tag) => { res.json(tag) })
  .catch((err) => { res.json(err) })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where:{
      id: req.params.id
    }
  })
  .then((tag) => { res.json(tag) })
  .catch((err) => { res.json(err) })
});

module.exports = router;
