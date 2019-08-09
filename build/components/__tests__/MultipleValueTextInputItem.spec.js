'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _MultipleValueTextInputItem = require('../MultipleValueTextInputItem');

var _MultipleValueTextInputItem2 = _interopRequireDefault(_MultipleValueTextInputItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createTestProps = function createTestProps(propOverrides) {
	return (0, _extends3.default)({
		// common props
		value: 'test',
		handleItemRemove: jest.fn(),
		deleteButton: 'test-delete'
	}, propOverrides);
};

describe('rendering', function () {
	it('should render valid snapshot', function () {
		var props = createTestProps();
		var item = (0, _enzyme.shallow)(_react2.default.createElement(_MultipleValueTextInputItem2.default, props));
		expect(item).toMatchSnapshot();
	});
	it('should render with passed props', function () {
		var props = createTestProps();
		var item = (0, _enzyme.shallow)(_react2.default.createElement(_MultipleValueTextInputItem2.default, props));
		expect(item.find('.multiple-value-text-input-item')).toHaveLength(1);
		expect(item.find('.multiple-value-text-input-item')).toIncludeText('test');
		expect(item.find('.multiple-value-text-input-item-delete-button')).toHaveLength(1);
		var button = item.find('.multiple-value-text-input-item-delete-button');
		expect(button).toHaveText('test-delete');
		expect(button).toHaveProp('data-value', 'test');
	});
});
describe('behavior', function () {
	it('should handle delete action onkeypress', function () {
		var onDelete = jest.fn();
		var props = createTestProps({ handleItemRemove: onDelete });
		var item = (0, _enzyme.shallow)(_react2.default.createElement(_MultipleValueTextInputItem2.default, props));
		item.find('.multiple-value-text-input-item-delete-button').simulate('keyPress');
		expect(onDelete).toHaveBeenCalledTimes(1);
	});
	it('should handle delete action onclick', function () {
		var onDelete = jest.fn();
		var props = createTestProps({ handleItemRemove: onDelete });
		var item = (0, _enzyme.shallow)(_react2.default.createElement(_MultipleValueTextInputItem2.default, props));
		item.find('.multiple-value-text-input-item-delete-button').simulate('click');
		expect(onDelete).toHaveBeenCalledTimes(1);
	});
});