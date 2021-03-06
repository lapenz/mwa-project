var Product = require('../models/product');
const config = require('../util/config');
var mongoose = require('mongoose');

mongoose.connect(config.dbUrl + config.dbName, {useNewUrlParser: true, useUnifiedTopology: true});

var products = [ 
        new Product({
            //"_id": new mongoose.Types.ObjectId().toHexString(),
            "_id": mongoose.Types.ObjectId("5eec0d3b50c8e05d085e2ab9"),
            "imagePath": 'https://colorlib.com/preview/theme/estore/assets/img/categori/product1.png',
            "title": 'Green Dress with details',
            "description": 'Seamlessly empower fully researched growth strategies and interoperable internal or “organic” sources. Credibly innovate granular internal or “organic” sources whereas high standards in web-readiness. Credibly innovate granular internal or organic sources whereas high standards in web-readiness. Energistically scale future-proof core competencies vis-a-vis impactful experiences. Dramatically synthesize integrated schemas. with optimal networks.',
            "price": 40,
            "seller": mongoose.Types.ObjectId("5edd67bde36f3e7de8215238"),
            "reviews": [
                {
                  "buyer": "5edd61d49bfd520944db61ba",
                  "description": "good",
                  "rating": 3,
                  "approved": 0
                }
              ]              
        }),
        new Product({
            //"_id": new mongoose.Types.ObjectId().toHexString(),
            "_id": mongoose.Types.ObjectId("5eec0d3b50c8e05d085e2abc"),
            "imagePath": 'https://colorlib.com/preview/theme/estore/assets/img/categori/product3.png',
            "title": 'Yellow Shirt',
            "description": 'Seamlessly empower fully researched growth strategies and interoperable internal or “organic” sources. Credibly innovate granular internal or “organic” sources whereas high standards in web-readiness. Credibly innovate granular internal or organic sources whereas high standards in web-readiness. Energistically scale future-proof core competencies vis-a-vis impactful experiences. Dramatically synthesize integrated schemas. with optimal networks.',
            "price": 15,
            "seller": mongoose.Types.ObjectId("5edd67bde36f3e7de8215238"),
            "reviews": [
                {
                  "buyer": "5edd61d49bfd520944db61ba",
                  "description": "good",
                  "rating": 3,
                  "approved": 0
                }
              ]              
        }),
        new Product({
            //"_id": new mongoose.Types.ObjectId().toHexString(),
            "_id": mongoose.Types.ObjectId("5eec0d3b50c8e05d085e2abf"),
            "imagePath": 'https://colorlib.com/preview/theme/estore/assets/img/categori/product2.png',
            "title": 'Green Coat',
            "description": 'Seamlessly empower fully researched growth strategies and interoperable internal or “organic” sources. Credibly innovate granular internal or “organic” sources whereas high standards in web-readiness. Credibly innovate granular internal or organic sources whereas high standards in web-readiness. Energistically scale future-proof core competencies vis-a-vis impactful experiences. Dramatically synthesize integrated schemas. with optimal networks.',
            "price": 30,
            "seller": mongoose.Types.ObjectId("5edd67bde36f3e7de8215238"),
            "reviews": [
                {
                  "buyer": "5edd61d49bfd520944db61ba",
                  "description": "good",
                  "rating": 3,
                  "approved": 0
                }
              ]              
        }),
        new Product({
            //"_id": new mongoose.Types.ObjectId().toHexString(),
            "_id": mongoose.Types.ObjectId("5eec0d3b50c8e05d085e2ac2"),
            "imagePath": 'https://colorlib.com/preview/theme/estore/assets/img/categori/product6.png',
            "title": 'Jeans Blazer',
            "description": 'Seamlessly empower fully researched growth strategies and interoperable internal or “organic” sources. Credibly innovate granular internal or “organic” sources whereas high standards in web-readiness. Credibly innovate granular internal or organic sources whereas high standards in web-readiness. Energistically scale future-proof core competencies vis-a-vis impactful experiences. Dramatically synthesize integrated schemas. with optimal networks.',
            "price": 36,
            "seller": mongoose.Types.ObjectId("5ee964adcecc6d25e8c4af9e"),
            "reviews": [
                {
                  "buyer": "5edd61d49bfd520944db61ba",
                  "description": "good",
                  "rating": 3,
                  "approved": 0
                }
              ]
        }),
        new Product({
            //"_id": new mongoose.Types.ObjectId().toHexString(),
            "_id": mongoose.Types.ObjectId("5eec0d3b50c8e05d085e2ac5"),
            "imagePath": 'https://colorlib.com/preview/theme/estore/assets/img/categori/product5.png',
            "title": 'Dark Sweatshirt',
            "description": 'Seamlessly empower fully researched growth strategies and interoperable internal or “organic” sources. Credibly innovate granular internal or “organic” sources whereas high standards in web-readiness. Credibly innovate granular internal or organic sources whereas high standards in web-readiness. Energistically scale future-proof core competencies vis-a-vis impactful experiences. Dramatically synthesize integrated schemas. with optimal networks.',
            "price": 50,
            "seller": mongoose.Types.ObjectId("5ee964adcecc6d25e8c4af9e"),
            "reviews": [
                {
                  "buyer": "5edd61d49bfd520944db61ba",
                  "description": "good",
                  "rating": 3,
                  "approved": 0
                }
              ]
        })          
];

var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
