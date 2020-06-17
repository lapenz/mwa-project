var Product = require('../models/product');
const config = require('../util/config');
var mongoose = require('mongoose');

mongoose.connect(config.dbUrl + config.dbName, {useNewUrlParser: true, useUnifiedTopology: true});

var products = [
    new Product({
        imagePath: 'https://colorlib.com/preview/theme/estore/assets/img/categori/product1.png',
        title: 'Green Dress with details',
        description: 'Seamlessly empower fully researched growth strategies and interoperable internal or “organic” sources. Credibly innovate granular internal or “organic” sources whereas high standards in web-readiness. Credibly innovate granular internal or organic sources whereas high standards in web-readiness. Energistically scale future-proof core competencies vis-a-vis impactful experiences. Dramatically synthesize integrated schemas. with optimal networks.',
        price: 40
    }),
    new Product({
        imagePath: 'https://colorlib.com/preview/theme/estore/assets/img/categori/product3.png',
        title: 'Yellow Shirt',
        description: 'Seamlessly empower fully researched growth strategies and interoperable internal or “organic” sources. Credibly innovate granular internal or “organic” sources whereas high standards in web-readiness. Credibly innovate granular internal or organic sources whereas high standards in web-readiness. Energistically scale future-proof core competencies vis-a-vis impactful experiences. Dramatically synthesize integrated schemas. with optimal networks.',
        price: 50
    }),
    new Product({
        imagePath: 'https://colorlib.com/preview/theme/estore/assets/img/categori/product2.png',
        title: 'Green Coat',
        description: 'Seamlessly empower fully researched growth strategies and interoperable internal or “organic” sources. Credibly innovate granular internal or “organic” sources whereas high standards in web-readiness. Credibly innovate granular internal or organic sources whereas high standards in web-readiness. Energistically scale future-proof core competencies vis-a-vis impactful experiences. Dramatically synthesize integrated schemas. with optimal networks.',
        price: 80
    }),
    new Product({
        imagePath: 'https://colorlib.com/preview/theme/estore/assets/img/categori/product6.png',
        title: 'Jeans Blazer',
        description: 'Seamlessly empower fully researched growth strategies and interoperable internal or “organic” sources. Credibly innovate granular internal or “organic” sources whereas high standards in web-readiness. Credibly innovate granular internal or organic sources whereas high standards in web-readiness. Energistically scale future-proof core competencies vis-a-vis impactful experiences. Dramatically synthesize integrated schemas. with optimal networks.',
        price: 95
    }),
    new Product({
        imagePath: 'https://colorlib.com/preview/theme/estore/assets/img/categori/product5.png',
        title: 'Dark Sweatshirt',
        description: 'Seamlessly empower fully researched growth strategies and interoperable internal or “organic” sources. Credibly innovate granular internal or “organic” sources whereas high standards in web-readiness. Credibly innovate granular internal or organic sources whereas high standards in web-readiness. Energistically scale future-proof core competencies vis-a-vis impactful experiences. Dramatically synthesize integrated schemas. with optimal networks.',
        price: 50
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
