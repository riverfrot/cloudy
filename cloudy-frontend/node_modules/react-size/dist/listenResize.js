'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = listenResizeWrapper;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _elementResizeDetector = require('element-resize-detector');

var _elementResizeDetector2 = _interopRequireDefault(_elementResizeDetector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SizeReactiveComponent = (function (_Component) {
	_inherits(SizeReactiveComponent, _Component);

	function SizeReactiveComponent(props, context) {
		_classCallCheck(this, SizeReactiveComponent);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SizeReactiveComponent).call(this, props, context));

		_this.updateDimensions = _this.updateDimensions.bind(_this);
		return _this;
	}

	_createClass(SizeReactiveComponent, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var node = _reactDom2.default.findDOMNode(this.refs.component);
			this.erd.listenTo(node, this.updateDimensions);
		}
	}]);

	return SizeReactiveComponent;
})(_react.Component);

function listenResizeWrapper(Comp, useCallback, useScroll, propName) {
	propName = propName || useCallback ? 'onResize' : 'dimensions';
	var erd = useScroll ? (0, _elementResizeDetector2.default)({ strategy: 'scroll' }) : (0, _elementResizeDetector2.default)();
	if (useCallback) {
		return (function (_SizeReactiveComponen) {
			_inherits(SizeReactiveComponentWithCallback, _SizeReactiveComponen);

			function SizeReactiveComponentWithCallback(props, context) {
				_classCallCheck(this, SizeReactiveComponentWithCallback);

				var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(SizeReactiveComponentWithCallback).call(this, props, context));

				_this2.erd = erd;
				return _this2;
			}

			_createClass(SizeReactiveComponentWithCallback, [{
				key: 'updateDimensions',
				value: function updateDimensions(el) {
					var offsetWidth = el.offsetWidth;
					var offsetHeight = el.offsetHeight;

					this.refs.component[propName]({
						width: offsetWidth,
						height: offsetHeight
					});
				}
			}, {
				key: 'render',
				value: function render() {
					return _react2.default.createElement(Comp, _extends({ ref: 'component' }, this.props));
				}
			}]);

			return SizeReactiveComponentWithCallback;
		})(SizeReactiveComponent);
	}
	return (function (_SizeReactiveComponen2) {
		_inherits(SizeReactiveComponentPassState, _SizeReactiveComponen2);

		function SizeReactiveComponentPassState(props, context) {
			_classCallCheck(this, SizeReactiveComponentPassState);

			var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(SizeReactiveComponentPassState).call(this, props, context));

			_this3.erd = erd;
			return _this3;
		}

		_createClass(SizeReactiveComponentPassState, [{
			key: 'updateDimensions',
			value: function updateDimensions(el) {
				var offsetWidth = el.offsetWidth;
				var offsetHeight = el.offsetHeight;

				this.setState({
					width: offsetWidth,
					height: offsetHeight
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var props = Object.assign(_defineProperty({}, propName, this.state), this.props);
				return _react2.default.createElement(Comp, _extends({ ref: 'component' }, props));
			}
		}]);

		return SizeReactiveComponentPassState;
	})(SizeReactiveComponent);
}