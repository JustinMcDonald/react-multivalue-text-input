'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _MultipleValueTextInput = require('../MultipleValueTextInput');

var _MultipleValueTextInput2 = _interopRequireDefault(_MultipleValueTextInput);

var _MultipleValueTextInputItem = require('../MultipleValueTextInputItem');

var _MultipleValueTextInputItem2 = _interopRequireDefault(_MultipleValueTextInputItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createTestProps = function createTestProps(propOverrides) {
	return (0, _extends3.default)({
		// common props
		onItemAdded: jest.fn(),
		onItemDeleted: jest.fn(),
		name: 'test-input'
	}, propOverrides);
};

describe('rendering', function () {
	it('should render valid snapshot with default props', function () {
		var props = createTestProps();
		var input = (0, _enzyme.shallow)(_react2.default.createElement(_MultipleValueTextInput2.default, props));
		expect(input).toMatchSnapshot();
	});
	it('should render valid snapshot with passed props', function () {
		var props = createTestProps({ label: 'Test Label', placeholder: 'Test Placeholder' });
		var input = (0, _enzyme.shallow)(_react2.default.createElement(_MultipleValueTextInput2.default, props));
		expect(input).toMatchSnapshot();
	});
	it('should render with default props', function () {
		var props = createTestProps();
		var input = (0, _enzyme.shallow)(_react2.default.createElement(_MultipleValueTextInput2.default, props));
		expect(input.find(_MultipleValueTextInputItem2.default)).toHaveLength(0);
		expect(input.find('label')).toHaveText('');
		expect(input.find('input')).toHaveProp('name', 'test-input');
		expect(input.find('input')).toHaveProp('placeholder', '');
		expect(input.find('input')).toHaveValue('');
	});
	it('should render with passed props', function () {
		var props = createTestProps({ label: 'Test Label', placeholder: 'Test Placeholder' });
		var input = (0, _enzyme.shallow)(_react2.default.createElement(_MultipleValueTextInput2.default, props));
		expect(input.find(_MultipleValueTextInputItem2.default)).toHaveLength(0);
		expect(input.find('label')).toHaveText('Test Label');
		expect(input.find('input')).toHaveProp('name', 'test-input');
		expect(input.find('input')).toHaveProp('placeholder', 'Test Placeholder');
		expect(input.find('input')).toHaveValue('');
	});
	it('should render items', function () {
		var props = createTestProps({ values: ['1', '2', '3'] });
		var input = (0, _enzyme.shallow)(_react2.default.createElement(_MultipleValueTextInput2.default, props));
		expect(input.find(_MultipleValueTextInputItem2.default)).toHaveLength(3);
	});
	it('should forward props to input', function () {
		var props = createTestProps({ 'data-test': 'test' });
		var input = (0, _enzyme.shallow)(_react2.default.createElement(_MultipleValueTextInput2.default, props));
		expect(input.find('input')).toHaveProp('data-test', 'test');
	});
	it('should forward props to item', function () {
		var props = createTestProps({ values: ['1'], deleteButton: 'blah' });
		var input = (0, _enzyme.shallow)(_react2.default.createElement(_MultipleValueTextInput2.default, props));
		var item = input.find(_MultipleValueTextInputItem2.default).first();
		expect(item).toHaveValue('1');
		expect(item).toHaveProp('deleteButton', 'blah');
	});
});

describe('behavior', function () {
	it('should set value on change', function () {
		var props = createTestProps();
		var input = (0, _enzyme.shallow)(_react2.default.createElement(_MultipleValueTextInput2.default, props));
		input.find('input').simulate('change', { target: { value: 'abc' } });
		expect(input.find('input')).toHaveProp('value', 'abc');
	});
	it('should handle default char codes to add values', function () {
		var onItemAdd = jest.fn();
		var enterEvent = { preventDefault: function preventDefault() {}, charCode: 13, target: { value: '1' } };
		var commaEvent = { preventDefault: function preventDefault() {}, charCode: 44, target: { value: '2' } };
		var otherEvent = { preventDefault: function preventDefault() {}, charCode: 10, target: { value: '3' } };
		var props = createTestProps({ onItemAdded: onItemAdd });
		var input = (0, _enzyme.shallow)(_react2.default.createElement(_MultipleValueTextInput2.default, props));
		input.find('input').simulate('keyPress', enterEvent);
		input.find('input').simulate('keyPress', commaEvent);
		input.find('input').simulate('keyPress', otherEvent);
		expect(onItemAdd).toHaveBeenCalledTimes(2);
	});
	it('should handle custom char codes to add values', function () {
		var onItemAdd = jest.fn();
		var customEvent1 = { preventDefault: function preventDefault() {}, charCode: 10, target: { value: '1' } };
		var customEvent2 = { preventDefault: function preventDefault() {}, charCode: 20, target: { value: '2' } };
		var commaEvent = { preventDefault: function preventDefault() {}, charCode: 30, target: { value: '3' } };
		var props = createTestProps({ onItemAdded: onItemAdd, charCodes: [10, 20] });
		var input = (0, _enzyme.shallow)(_react2.default.createElement(_MultipleValueTextInput2.default, props));
		input.find('input').simulate('keyPress', customEvent1);
		input.find('input').simulate('keyPress', customEvent2);
		input.find('input').simulate('keyPress', commaEvent);
		expect(onItemAdd).toHaveBeenCalledTimes(2);
	});
	it('should handle blur to add values when applicable', function () {
		var onItemAdd = jest.fn();
		var customEvent1 = { preventDefault: function preventDefault() {}, target: { value: 'test' } };
		var props = createTestProps({ onItemAdded: onItemAdd, shouldAddOnBlur: true });
		var input = (0, _enzyme.shallow)(_react2.default.createElement(_MultipleValueTextInput2.default, props));
		input.find('input').simulate('blur', customEvent1);
		expect(onItemAdd).toHaveBeenCalledTimes(1);
		expect(onItemAdd).toHaveBeenLastCalledWith('test', ['test']);
	});
	it('should ignore blur event when not applicable', function () {
		var onItemAdd = jest.fn();
		var customEvent1 = { preventDefault: function preventDefault() {}, target: { value: 'test' } };
		var props = createTestProps({ onItemAdded: onItemAdd, shouldAddOnBlur: false });
		var input = (0, _enzyme.shallow)(_react2.default.createElement(_MultipleValueTextInput2.default, props));
		input.find('input').simulate('blur', customEvent1);
		expect(onItemAdd).toHaveBeenCalledTimes(0);
	});
	it('should update state on add', function () {
		var enterEvent = { preventDefault: function preventDefault() {}, charCode: 13, target: { value: 'abc' } };
		var props = createTestProps({ values: ['1', '2'] });
		var input = (0, _enzyme.shallow)(_react2.default.createElement(_MultipleValueTextInput2.default, props));
		input.find('input').simulate('change', { target: { value: 'abc' } });
		input.find('input').simulate('keyPress', enterEvent);
		expect(input.find('input')).toHaveProp('value', '');
		expect(input.find(_MultipleValueTextInputItem2.default)).toHaveLength(3);
	});
	it('should ignore duplicates', function () {
		var enterEvent = { preventDefault: function preventDefault() {}, charCode: 13, target: { value: '1' } };
		var props = createTestProps({ values: ['1', '2'] });
		var input = (0, _enzyme.shallow)(_react2.default.createElement(_MultipleValueTextInput2.default, props));
		input.find('input').simulate('change', { target: { value: '1' } });
		input.find('input').simulate('keyPress', enterEvent);
		expect(input.find('input')).toHaveProp('value', '');
		expect(input.find(_MultipleValueTextInputItem2.default)).toHaveLength(2);
	});
	it('should call external remove method', function () {
		var onItemDelete = jest.fn();
		var props = createTestProps({ onItemDeleted: onItemDelete, values: ['1', '2'] });
		var input = (0, _enzyme.shallow)(_react2.default.createElement(_MultipleValueTextInput2.default, props));
		input.instance().handleItemRemove('1');
		expect(onItemDelete).toHaveBeenCalledTimes(1);
	});
	it('should remove items from state', function () {
		var props = createTestProps({ values: ['1', '2'] });
		var input = (0, _enzyme.shallow)(_react2.default.createElement(_MultipleValueTextInput2.default, props));
		input.instance().handleItemRemove('1');
		input.update();
		expect(input.find(_MultipleValueTextInputItem2.default)).toHaveLength(1);
	});
});