# React-size

Helpers to manage browser size changes in React.

Two Higher-Order Components are provided:

### listenResize(Component,useCallback,useScroll,propName)

Listens to an element's own size changes through [element-resize-detector](https://github.com/wnr/element-resize-detector).
- `Component`: the component to wrap
- `useCallback`: by default, the HOC augments properties with a `dimensions` prop containing `{width,height}`. If you prefer to manage state internally, then you can provide an `onResize` callback in your component.
- `useScroll`: use the `scroll` strategy (see [element-resize-detector](https://github.com/wnr/element-resize-detector)).
- `propName`: if `useCallback` is `false`, sets the name of the prop that receives the dimensions (by default, `dimensions`). If `useCallback` is `true`, sets the name of the callback (by default, `onResize`)


### listenWindowResize(component,useCallback,propName)

Listens to window resize events through [jobj](https://github.com/xananax/jobj)
- `Component`: the component to wrap
- `useCallback`: by default, the HOC augments properties with a `dimensions` prop containing `{vw,vh,dw,dh}` (corresponding respectively to `window` and `document` dimensions). If you prefer to manage state internally, then you can provide an `onResize` callback in your component.
- `propName`: if `useCallback` is `false`, sets the name of the prop that receives the dimensions (by default, `dimensions`). If `useCallback` is `true`, sets the name of the callback (by default, `onResize`)

# Usage

```sh
npm install react-size
```

```js
import React from 'react'
import {listenWindowResize} from 'react-size'

class MyComponent extends React.Component{
	render(){
		return (<div>{this.props.dim.width}</div>)
	}
}

export default listenWindowResize(MyComponent,false,'dim')
```


# License

MIT
