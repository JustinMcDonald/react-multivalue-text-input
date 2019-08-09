'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
	value: _propTypes2.default.string.isRequired,
	handleItemRemove: _propTypes2.default.func.isRequired,
	deleteButton: _propTypes2.default.node.isRequired
};

var MultipleValueTextInputItem = function MultipleValueTextInputItem(props) {
	var value = props.value,
	    handleItemRemove = props.handleItemRemove,
	    deleteButton = props.deleteButton;

	return _react2.default.createElement(
		'span',
		{ className: 'multiple-value-text-input-item' },
		value,
		' ',
		_react2.default.createElement(
			'span',
			{
				className: 'multiple-value-text-input-item-delete-button',
				'data-value': value,
				tabIndex: '-1',
				role: 'button',
				onKeyPress: function onKeyPress() {
					return handleItemRemove(value);
				},
				onClick: function onClick() {
					return handleItemRemove(value);
				}
			},
			deleteButton
		)
	);
};

MultipleValueTextInputItem.propTypes = propTypes;
exports.default = MultipleValueTextInputItem;