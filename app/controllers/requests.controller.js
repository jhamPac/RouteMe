var mongoose = require('mongoose');
var Request = mongoose.model('Request');
var isOnHill = require('../scripts/hill.js')

var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};

function getTransType(req) {
    return req.wheelchair && isOnHill(req.endLocation) ? "Shuttle" : "Bus";
}

exports.create = function(req, res) {
    var request = new Request(req.body);
    request.transType = getTransType(req.body);
    request.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(request);
        }
    });
};

exports.list = function(req, res) {
    Request.find().sort('-time').populate('user', 'name username').exec(function(err, requests) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(requests);
        }
    });
};

exports.read = function(req, res) {
    res.json(req.request);
};

exports.requestByID = function(req, res, next, id) {
    request.findById(id).populate('user', 'name username').exec(function(err, request) {
        if (err)
        return next(err);

        if (!request)
        return next(new Error('Failed to load request ' + id));

        req.request = request;
        next();
    });
};

exports.delete = function(req, res) {
    var request = req.request;
    request.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(request);
        }
    });
};
