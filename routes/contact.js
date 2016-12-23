const url = require('url');
const express = require('express');
const router = express.Router();

const contacts = require('../lib/contacts');

router.get('/', function(req, res, next) {
  const params = url.parse(req.url, true).query;

  if(Object.keys(params).length === 0) {
    res.send(contacts.list());
  } else {
    const arg = Object.keys(params)[0];
    const value = params[arg];
    res.send(contacts.queryByArg(arg, value));
  }
});

router.get('/:number', function(req, res, next) {
  res.json(contacts.query(req.params.number));
});

router.get('/groups', function(req, res, next) {
  res.json(contacts.listGroups());
});

router.get('/groups/:name', function(req, res, next) {
  res.json(contacts.getMembers(req.params.name));
});

module.exports = router;
