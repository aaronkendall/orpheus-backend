var express = require('express');
var router = express.Router();
var config = require('../misc/config');
var request = require('request');

var clientString = new Buffer(config.clientId + ':' + config.clientSecret).toString('base64');
/* GET users listing. */
router.post('/access', function(req, res, next) {
  var accessRequest = req.body;
  request({
      url: config.tokenURL,
      method: 'POST',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + clientString
      },
      form: {
        grant_type: config.authorizeGrant,
        code: accessRequest.accessToken,
        redirect_uri: config.redirectURI
      }
    }, function(error, response, body) {
        if (response.statusCode !== 200) {
            console.log(body.error);
        }
        var responseObj = JSON.parse(body);
        res.json(responseObj);
    });
});

router.post('/refresh', function(req, res, next) {
  var accessRequest = req.body;
  request({
      url: config.tokenURL,
      method: 'POST',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + clientString
      },
      form: {
        grant_type: config.refreshGrant,
        refresh_token: accessRequest.refreshToken,
        client_id: config.clientId,
        client_secret: config.clientSecret
      }
    }, function(error, response, body) {
        if (response.statusCode !== 200) {
            console.log(error);
        }
        var responseObj = JSON.parse(body);
        res.json(responseObj);
    });
});

module.exports = router;
