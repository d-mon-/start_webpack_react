/**
 * Created by GUERIN Olivier, on 23/08/2015.
 * Twitter: @MisterRaton
 */
var React = require('react/addons');
var App = require('./ReactClass/App');

var node = document.getElementById("react-app");

React.render(new App({}), node);