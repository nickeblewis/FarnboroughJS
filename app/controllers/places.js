/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Place = mongoose.model('Place'),
    _ = require('underscore');


/**
 * Find place by id
 */
exports.place = function(req, res, next, id) {
    Place.load(id, function(err, place) {
        if (err) return next(err);
        if (!place) return next(new Error('Failed to load place ' + id));
        req.place = place;
        next();
    });
};

/**
 * Create a place
 */
exports.create = function(req, res) {
    var place = new Place(req.body);
    place.user = req.user;

    place.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                place: place
            });
        } else {
            res.jsonp(place);
        }
    });
};

/**
 * Update a place
 */
exports.update = function(req, res) {
    var place = req.place;

    place = _.extend(place, req.body);

    place.save(function(err) {
        res.jsonp(place);
    });
};

/**
 * Delete an place
 */
exports.destroy = function(req, res) {
    var place = req.place;

    place.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(place);
        }
    });
};

/**
 * Show an place
 */
exports.show = function(req, res) {
    res.jsonp(req.place);
};

/**
 * List of Places
 */
exports.all = function(req, res) {
    Place.find().sort('-created').populate('user', 'name username').exec(function(err, places) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(places);
        }
    });
};
