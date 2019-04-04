import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import elementResizeDetectorMaker from 'element-resize-detector';

class SizeReactiveComponent extends Component{
	constructor(props,context){
		super(props,context)
		this.updateDimensions = this.updateDimensions.bind(this);
	}
	componentDidMount(){
		const node = ReactDOM.findDOMNode(this.refs.component);
		this.erd.listenTo(node,this.updateDimensions)
	}
}

export default function listenResizeWrapper(Comp,useCallback,useScroll,propName){
	propName = propName || useCallback ? 'onResize':'dimensions';
	const erd = useScroll ? elementResizeDetectorMaker({strategy: 'scroll'}) : elementResizeDetectorMaker();
	if(useCallback){
		return class SizeReactiveComponentWithCallback extends SizeReactiveComponent{
			constructor(props,context){
				super(props,context);
				this.erd = erd;
			}
			updateDimensions(el){
				const {offsetWidth,offsetHeight} = el;
				this.refs.component[propName]({
					width:offsetWidth
				,	height:offsetHeight
				})
			}
			render(){
				return (<Comp ref='component' {...this.props}/>)
			}
		}
	}
	return class SizeReactiveComponentPassState extends SizeReactiveComponent{
		constructor(props,context){
			super(props,context);
			this.erd = erd;
		}
		updateDimensions(el){
			const {offsetWidth,offsetHeight} = el;
			this.setState({
				width:offsetWidth
			,	height:offsetHeight
			})
		}
		render(){
			const props = Object.assign(
				{[propName]:this.state}
			,	this.props
			)
			return (<Comp ref='component' {...props}/>)
		}
	}
}
