import React,{Component} from 'react';
import {listenResize,listenWindowResize} from '../src';
import makeTest from './examples';

class App extends Component{

	render(){
		return (<div>
			<div>
				<p>listenResize(Component)</p>
				<p>Listens to its own resize event through passed props</p>
				{React.createElement(listenResize(makeTest('resize event:own,data:props',150,150)))}
			</div>
			<hr/>
			<div>
				<p>listenResize(Component)</p>
				<p>Listens to its own resize event through passed props</p>
				{React.createElement(listenResize(makeTest('resize event:own,data:props','50%',150)))}
			</div>
			<hr/>
			<div>
				<p>listenResize(Component,true)</p>
				<p>Listens to its own resize event through a callback</p>
				{React.createElement(listenResize(makeTest('resize event:own,data:callback',150,150),true))}
			</div>
			<hr/>
			<div>
				<p>listenResize(Component,false,true)</p>
				<p>Listens to its own resize event through passed props using the `scroll` strategy</p>
				{React.createElement(listenResize(makeTest('resize event:own,data:callback',150,150),false,true))}
			</div>
			<hr/>
			<div>
				<p>listenResize(Component,true)</p>
				<p>Listens to its own resize event through a callback</p>
				{React.createElement(listenResize(makeTest('resize event:own,data:callback','50%',150),true))}
			</div>
			<hr/>
			<div>
				<p>listenWindowResize(Component)</p>
				<p>Listens to the window resize event through passed props</p>
				{React.createElement(listenWindowResize(makeTest('resize event:own,data:props',150,150)))}
			</div>
			<hr/>
			<div>
				<p>listenWindowResize(Component)</p>
				<p>Listens to the window resize event through passed props</p>
				{React.createElement(listenWindowResize(makeTest('resize event:window,data:props','50%',150)))}
			</div>
			<hr/>
			<div>
				<p>listenWindowResize(Component,true)</p>
				<p>Listens to the window resize event through a callback</p>
				{React.createElement(listenWindowResize(makeTest('resize event:window,data:callback',150,150),true))}
			</div>
			<hr/>
			<div>
				<p>listenWindowResize(Component,true)</p>
				<p>Listens to the window resize event through a callback</p>
				{React.createElement(listenWindowResize(makeTest('resize event:window,data:callback','50%',150),true))}
			</div>
		</div>)
	}
}


export default App
