/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Place Schema
 */
var PlaceSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    img: {
        type: String,
        default: 'https://lh4.googleusercontent.com/NTaSzU9S8mwX_OhAZlMmwmXhTvukAQKB_MNYqAjNQgE=w294-h194-p-no'
    },
    address: {
        contact: String,
        default: '',
        number: Number,
        default: '',
        street: String,
        default: '',
        postcode: String,
        default: '',
        telephone: String,
        default: '',
        fax: String,
        default: '',
        email: String,
        default: ''    
    },
    website: {
        title: String,
        url: String
    },
    // opening: {
    //     monday: {
    //         hours: String
    //     },
    //     tuesday: {
    //         hours: String
    //     },
    //     wednesday: {
    //         hours: String
    //     },
    //     thursday: {
    //         hours: String
    //     },
    //     friday: {
    //         hours: String
    //     },
    //     saturday: {
    //         hours: String
    //     },
    //     sunday: {
    //         hours: String
    //     }
    // },
    lat: {
        type: Number,
        default: 51.293
    },
    lng: {
        type: Number,
        default: -0.75
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
PlaceSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
PlaceSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).populate('user', 'name username').exec(cb);
    }
};

mongoose.model('Place', PlaceSchema);