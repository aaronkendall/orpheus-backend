var express = require('express');
var router = express.Router();
var config = require('../misc/config');
var request = require('request');

/* GET users listing. */
router.post('/access', function(req, res, next) {
  var accessRequest = req.body;
  request.post(config.tokenURL,
    {
      form: {
        grant_type: config.authorizeGrant,
        code: accessRequest.accessToken,
        redirect_uri: config.redirectURI,
        client_id: config.clientId,
        client_secret: config.clientSecret
    }}, function(error, response, body) {
        if (response.statusCode == 200) {
            res.json(body);
        }
        console.log(response);
    });
});

router.post('/refresh', function(req, res, next) {
  var accessRequest = req.body;
  request.post(config.tokenURL,
    {
      form: {
        grant_type: config.refreshGrant,
        refresh_token: accessRequest.refreshToken,
        client_id: config.clientId,
        client_secret: config.clientSecret
    }}, function(error, response, body) {
        if (response.statusCode == 200) {
            res.json(body);
        }
        console.log(response);
    });
});

module.exports = router;
