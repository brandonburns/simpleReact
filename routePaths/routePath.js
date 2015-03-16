'use strict';
var Unicorn = require('../models/Unicorn');
var bodyparser = require('body-parser');

module.exports = function(app) {
  app.use(bodyparser.json());

  app.get('/unicorns', function(req, res) {
    Unicorn.find({}, function(err, data) {
      if (err) return res.status(500).send({'msg': 'did not get notes'});

      res.json(data);
    });
  });

  app.post('/unicorns', function(req, res) {
    var newUnicorn = new Unicorn(req.body); 
    newUnicorn.save(function(err, unicorn) {
      if (err) return res.status(500).send({'msg': 'did not save note'});

      res.json(unicorn);
    });
  });

  app.put('/unicorns/:id', function(req, res) {
    var updatedUnicorn = req.body;
    delete updatedUnicorn._id;
    Unicorn.update({_id: req.params.id}, updatedUnicorn, function(err) {
      if (err) return res.status(500).send({'msg': 'did not update note'});

      res.json(req.body);
    });
  });

  app.delete('/unicorns/:id', function (req, res) {
    Unicorn.remove({_id: req.params.id}, function (err) {
      if (err) return res.status(500).send({'msg': 'did not delete'});

      res.json(req.body);
    });
  });
};