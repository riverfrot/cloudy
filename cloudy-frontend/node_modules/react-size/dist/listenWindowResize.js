'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = listenWindowResizeWrapper;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jobj = require('jobj');

var _elementResizeDetector = require('element-resize-detector');

var _elementResizeDetector2 = _interopRequireDefault(_elementResizeDetector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WindowResizeListenerComponent = (function (_Component) {
	_inherits(WindowResizeListenerComponent, _Component);

	function WindowResizeListenerComponent(props, context) {
		_classCallCheck(this, WindowResizeListenerComponent);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WindowResizeListenerComponent).call(this, props, context));

		_this.updateDimensions = _this.updateDimensions.bind(_this);

		var _onResize = (0, _jobj.onResize)(_this.updateDimensions);

		var doc = _onResize.doc;
		var win = _onResize.win;
		var dispose = _onResize.dispose;

		_this.stopListeningToDimensions = dispose;
		_this.state = {
			vw: win.width,
			vh: win.height,
			dw: doc.width,
			dh: doc.height
		};
		return _this;
	}

	_createClass(WindowResizeListenerComponent, [{
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.stopListeningToDimensions();
		}
	}]);

	return WindowResizeListenerComponent;
})(_react.Component);

function listenWindowResizeWrapper(Comp, useCallback, propName) {
	propName = propName || useCallback ? 'onResize' : 'dimensions';
	if (useCallback) {
		return (function (_WindowResizeListener) {
			_inherits(WindowResizeListenerComponentWithCallback, _WindowResizeListener);

			function WindowResizeListenerComponentWithCallback() {
				_classCallCheck(this, WindowResizeListenerComponentWithCallback);

				return _possibleConstructorReturn(this, Object.getPrototypeOf(WindowResizeListenerComponentWithCallback).apply(this, arguments));
			}

			_createClass(WindowResizeListenerComponentWithCallback, [{
				key: 'componentDidMount',
				value: function componentDidMount() {
					this.refs.component[propName](this.state);
				}
			}, {
				key: 'updateDimensions',
				value: function updateDimensions(_ref) {
					var win = _ref.win;
					var doc = _ref.doc;

					this.refs.component[propName]({
						vw: win.width,
						vh: win.height,
						dw: doc.width,
						dh: doc.height
					});
				}
			}, {
				key: 'render',
				value: function render() {
					return _react2.default.createElement(Comp, _extends({ ref: 'component' }, this.props));
				}
			}]);

			return WindowResizeListenerComponentWithCallback;
		})(WindowResizeListenerComponent);
	}
	return (function (_WindowResizeListener2) {
		_inherits(WindowResizeListenerComponentPassState, _WindowResizeListener2);

		function WindowResizeListenerComponentPassState() {
			_classCallCheck(this, WindowResizeListenerComponentPassState);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(WindowResizeListenerComponentPassState).apply(this, arguments));
		}

		_createClass(WindowResizeListenerComponentPassState, [{
			key: 'updateDimensions',
			value: function updateDimensions(_ref2) {
				var win = _ref2.win;
				var doc = _ref2.doc;

				this.setState({
					vw: win.width,
					vh: win.height,
					dw: doc.width,
					dh: doc.height
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var props = Object.assign(_defineProperty({}, propName, this.state), this.props);
				return _react2.default.createElement(Comp, props);
			}
		}]);

		return WindowResizeListenerComponentPassState;
	})(WindowResizeListenerComponent);
}