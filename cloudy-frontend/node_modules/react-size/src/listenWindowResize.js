import React,{Component} from 'react'
import {onResize} from 'jobj';
import elementResizeDetectorMaker from 'element-resize-detector';

class WindowResizeListenerComponent extends Component{
	constructor(props,context){
		super(props,context);
		this.updateDimensions = this.updateDimensions.bind(this);
		const {doc,win,dispose} = onResize(this.updateDimensions);
		this.stopListeningToDimensions = dispose;
		this.state = {
			vw:win.width
		,	vh:win.height
		,	dw:doc.width
		,	dh:doc.height
		}
	}
	componentWillUnmount(){
		this.stopListeningToDimensions();
	}
}

export default function listenWindowResizeWrapper(Comp,useCallback,propName){
	propName = propName || useCallback ? 'onResize':'dimensions';
	if (useCallback){
		return class WindowResizeListenerComponentWithCallback extends WindowResizeListenerComponent{
			componentDidMount(){
				this.refs.component[propName](this.state);
			}
			updateDimensions({win,doc}){
				this.refs.component[propName]({
					vw:win.width
				,	vh:win.height
				,	dw:doc.width
				,	dh:doc.height
				})
			}
			render(){
				return (<Comp ref='component' {...this.props}/>)
			}
		}
	}
	return class WindowResizeListenerComponentPassState extends WindowResizeListenerComponent{
		updateDimensions({win,doc}){
			this.setState({
				vw:win.width
			,	vh:win.height
			,	dw:doc.width
			,	dh:doc.height
			})
		}
		render(){
			const props = Object.assign(
				{[propName]:this.state}
			,	this.props
			)
			return (<Comp {...props}/>)
		}
	}

}
