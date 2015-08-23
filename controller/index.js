/**
 * Created by GUERIN Olivier, on 23/08/2015.
 * Twitter: @MisterRaton
 */
'use strict';
var React = require('react/addons'),
    reactApp = React.createFactory(require('../app/ReactClass/App'));

module.exports = {
    index: function (req, res, next) {
        var result = React.renderToString(reactApp({}));
        res.render('index', {reactHTML: result});
    }
};
