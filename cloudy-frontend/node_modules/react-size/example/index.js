import style from "./style.styl";
import React from 'react';
import ReactDOM from 'react-dom';
var App = require('./App.js').default;

function render(){
	ReactDOM.render(<App/>, document.getElementById('Content'));
}


if(module.hot) {
	module.hot.accept("./App.js", function() {
		App = require('./App.js').default
		render();
	});
}

render();
