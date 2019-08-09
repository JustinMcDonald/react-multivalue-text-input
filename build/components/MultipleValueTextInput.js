'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('../styles/styles.scss');

var _MultipleValueTextInputItem = require('./MultipleValueTextInputItem');

var _MultipleValueTextInputItem2 = _interopRequireDefault(_MultipleValueTextInputItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
	/** Any values the input's collection should be prepopulated with. */
	values: _propTypes2.default.arrayOf(_propTypes2.default.string),
	/** Method which should be called when an item is added to the collection */
	onItemAdded: _propTypes2.default.func.isRequired,
	/** Method which should be called when an item is removed from the collection */
	onItemDeleted: _propTypes2.default.func.isRequired,
	/** Label to be attached to the input, if desired */
	label: _propTypes2.default.string,
	/** Name attribute for the input */
	name: _propTypes2.default.string.isRequired,
	/** Placeholder attribute for the input, if desired */
	placeholder: _propTypes2.default.string,
	/** ASCII charcode for the keys which should
  * trigger an item to be added to the collection (defaults to comma (44) and Enter (13))
  */
	charCodes: _propTypes2.default.arrayOf(_propTypes2.default.number),
	/** JSX or string which will be used as the control to delete an item from the collection */
	deleteButton: _propTypes2.default.node,
	/** Whether or not the blur event should trigger the added-item handler */
	shouldAddOnBlur: _propTypes2.default.bool,
	/** Custom class name for the input element */
	className: _propTypes2.default.string,
	/** Custom class name for the input label element */
	labelClassName: _propTypes2.default.string
};

var defaultProps = {
	placeholder: '',
	charCodes: [13, 44],
	deleteButton: _react2.default.createElement(
		'span',
		null,
		'\xD7'
	),
	values: [],
	label: '',
	shouldAddOnBlur: false,
	className: '',
	labelClassName: ''
};
/**
 * A text input component for React which maintains and displays a collection
 * of entered values as an array of strings.
 */

var MultipleValueTextInput = function (_Component) {
	(0, _inherits3.default)(MultipleValueTextInput, _Component);

	function MultipleValueTextInput(props) {
		(0, _classCallCheck3.default)(this, MultipleValueTextInput);

		var _this = (0, _possibleConstructorReturn3.default)(this, (MultipleValueTextInput.__proto__ || (0, _getPrototypeOf2.default)(MultipleValueTextInput)).call(this, props));

		_this.state = {
			values: props.values,
			value: ''
		};
		_this.handleKeypress = _this.handleKeypress.bind(_this);
		_this.handleValueChange = _this.handleValueChange.bind(_this);
		_this.handleItemAdd = _this.handleItemAdd.bind(_this);
		_this.handleItemRemove = _this.handleItemRemove.bind(_this);
		_this.handleBlur = _this.handleBlur.bind(_this);
		return _this;
	}

	(0, _createClass3.default)(MultipleValueTextInput, [{
		key: 'handleKeypress',
		value: function handleKeypress(e) {
			var _props = this.props,
			    onItemAdded = _props.onItemAdded,
			    charCodes = _props.charCodes;
			// 13: Enter, 44: Comma

			if (charCodes.includes(e.charCode)) {
				e.preventDefault();
				this.handleItemAdd(e.target.value, onItemAdded);
			}
		}
	}, {
		key: 'handleValueChange',
		value: function handleValueChange(e) {
			this.setState({ value: e.target.value });
		}
	}, {
		key: 'handleItemAdd',
		value: function handleItemAdd(value, onItemAdded) {
			if (this.state.values.includes(value) || !value) {
				this.setState({ value: '' });
				return;
			}
			var newValues = this.state.values.concat(value);
			this.setState({
				values: newValues,
				value: ''
			});
			onItemAdded(value, newValues);
		}
	}, {
		key: 'handleItemRemove',
		value: function handleItemRemove(value) {
			var currentValues = this.state.values;
			var newValues = currentValues.filter(function (v) {
				return v !== value;
			});
			this.props.onItemDeleted(value, newValues);
			this.setState({ values: newValues });
		}
	}, {
		key: 'handleBlur',
		value: function handleBlur(e) {
			var _props2 = this.props,
			    onItemAdded = _props2.onItemAdded,
			    shouldAddOnBlur = _props2.shouldAddOnBlur;
			// 13: Enter, 44: Comma

			if (shouldAddOnBlur) {
				e.preventDefault();
				this.handleItemAdd(e.target.value, onItemAdded);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props3 = this.props,
			    placeholder = _props3.placeholder,
			    label = _props3.label,
			    name = _props3.name,
			    deleteButton = _props3.deleteButton,
			    onItemAdded = _props3.onItemAdded,
			    onItemDeleted = _props3.onItemDeleted,
			    className = _props3.className,
			    labelClassName = _props3.labelClassName,
			    forwardedProps = _props3.forwardedProps;


			delete forwardedProps.shouldAddOnBlur;
			delete forwardedProps.charCodes;

			var values = this.state.values && this.state.values.length ? this.state.values : this.props.values;
			var valueDisplays = values.map(function (v) {
				return _react2.default.createElement(_MultipleValueTextInputItem2.default, {
					value: v,
					key: v,
					deleteButton: deleteButton,
					handleItemRemove: _this2.handleItemRemove
				});
			});
			return _react2.default.createElement(
				'div',
				{ className: 'multiple-value-text-input' },
				_react2.default.createElement(
					'label',
					{ htmlFor: name, className: labelClassName },
					label,
					_react2.default.createElement(
						'div',
						{ className: 'multiple-value-text-input-item-container' },
						values.length > 0 && _react2.default.createElement(
							'p',
							null,
							valueDisplays
						)
					),
					_react2.default.createElement('input', (0, _extends3.default)({
						name: name,
						placeholder: placeholder,
						value: this.state.value,
						type: 'text',
						onKeyPress: this.handleKeypress,
						onChange: this.handleValueChange,
						onBlur: this.handleBlur,
						className: className
					}, forwardedProps))
				)
			);
		}
	}]);
	return MultipleValueTextInput;
}(_react.Component);

MultipleValueTextInput.propTypes = propTypes;
MultipleValueTextInput.defaultProps = defaultProps;
exports.default = MultipleValueTextInput;