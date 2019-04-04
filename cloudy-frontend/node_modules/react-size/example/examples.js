import React,{Component} from 'react'

function makeTest(text,width,height){
	return class TestComponent extends Component{
		constructor(props){
			super(props);
		}
		onResize(vals){
			this.setState(vals)
		}
		render(){
			const style = {
				width
			,	height
			,	resize:'both'
			,	margin:'1em'
			,	overflow:(width && height) ? 'auto' : 'visible'
			,	background:'#E6E6E6'
			}
			return (<div style={style}>
				<div>
					Props:
					{JSON.stringify(this.props)}
				</div>
				<hr/>
				<div>
					State:
					{JSON.stringify(this.state)}
				</div>
				<hr/>
				<div>
					{text}
				</div>
			</div>)
		}
	}
}

export default makeTest
