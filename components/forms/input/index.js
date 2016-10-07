'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*
                                                                                                                                                                                                                                                                  Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                  Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                                                                  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                                                                  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                                                                  Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                                                                  */

// # Input Component

// Implements the [Input design pattern](https://www.lightningdesignsystem.com/components/forms/#input) in React.

// ### React
// React is an external dependency of the project.


// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."


// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator


// ## Children

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _inputIcon = require('../../icon/input-icon');

var _inputIcon2 = _interopRequireDefault(_inputIcon);

var _checkProps = require('./check-props');

var _checkProps2 = _interopRequireDefault(_checkProps);

var _constants = require('../../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// Remove the need for `React.PropTypes`
var PropTypes = _react2.default.PropTypes;


// ## InputDefinition
var Input = _react2.default.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: _constants.FORMS_INPUT,
	// ### Prop Types
	propTypes: {
		/**
   * An HTML ID that is shared with ARIA-supported devices with the
   * `aria-controls` attribute in order to relate the input with
   * another region of the page. An example would be a select box
   * that shows or hides a panel.
   */
		ariaControls: PropTypes.string,
		/**
   * An HTML ID that is shared with ARIA-supported devices with the
   * `aria-controls` attribute in order to relate the input with
   * another region of the page. An example would be a search field
   * that shows search results.
   */
		ariaOwns: PropTypes.string,
		/**
   * If present, the label associated with this `input` is overwritten
   * by this text and is visually not shown.
   */
		assistiveText: PropTypes.string,
		children: PropTypes.node,
		/**
   * Class names to be added to the outer container of the input.
   */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
   * Disables the input and prevents editing the contents.
   */
		disabled: PropTypes.bool,
		/**
   * Message to display when the input is in an error state. When this is present, also visually highlights the component as in error.
   */
		errorText: PropTypes.string,
		/**
   * Left aligned icon, must be instace of `design-system-react/components/icon/input-icon`
   */
		iconLeft: PropTypes.node,
		/**
   * Right aligned icon, must be instace of `design-system-react/components/icon/input-icon`
   */
		iconRight: PropTypes.node,
		/**
   * Every input must have a unique ID in order to support keyboard navigation and ARIA support.
   */
		id: PropTypes.string,
		/**
   * This label appears above the input.
   */
		label: PropTypes.string,
		/**
   * This callback fires when the input changes. The synthetic React event will be the first parameter to the callback. You will probably want to reference `event.target.value` in your callback. No custom data object is provided.
   */
		onChange: PropTypes.func,
		/**
   * This event fires when the input is clicked.
   */
		onClick: PropTypes.func,
		/**
   * Text that will appear in an empty input.
   */
		placeholder: PropTypes.string,
		/**
   * Name of the submitted form parameter.
   */
		name: PropTypes.string,
		/**
   * Displays the value of the input statically.
   */
		readOnly: PropTypes.bool,
		/**
   * Highlights the input as a required field (does not perform any validation).
   */
		required: PropTypes.bool,
		/**
   * The `<Input>` element includes support for all HTML5 types.
   */
		type: PropTypes.oneOf(['text', 'password', 'datetime', 'datetime-local', 'date', 'month', 'time', 'week', 'number', 'email', 'url', 'search', 'tel', 'color']),
		/**
   * The input is a controlled component, and will always display this value.
   */
		value: PropTypes.string
	},

	getDefaultProps: function getDefaultProps() {
		return {
			type: 'text'
		};
	},
	componentWillMount: function componentWillMount() {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		(0, _checkProps2.default)(_constants.FORMS_INPUT, this.props);

		this.generatedId = _shortid2.default.generate();
	},
	getId: function getId() {
		return this.props.id || this.generatedId;
	},


	// This is convuluted to maintain backwards compatibility. Please remove deprecatedProps on next breaking change.
	getIconRender: function getIconRender(position, iconPositionProp) {
		var icon = void 0;

		/* eslint-disable react/prop-types */
		var deprecatedProps = {
			assistiveText: this.props[iconPositionProp] && this.props[iconPositionProp].props.assistiveText || this.props.iconAssistiveText,
			category: this.props[iconPositionProp] && this.props[iconPositionProp].props.category || this.props.iconCategory,
			name: this.props[iconPositionProp] && this.props[iconPositionProp].props.name || this.props.iconName,
			onClick: this.props[iconPositionProp] && this.props[iconPositionProp].props.onClick || this.props.onIconClick
		};
		/* eslint-enable react/prop-types */

		if (this.props[iconPositionProp] && position && this.props[iconPositionProp]) {
			icon = _react2.default.cloneElement(this.props[iconPositionProp], {
				iconPosition: '' + position
			});
		} else if (deprecatedProps.name) {
			icon = _react2.default.createElement(_inputIcon2.default, _extends({ iconPosition: position }, deprecatedProps));
		}

		return icon;
	},


	// ### Render
	render: function render() {
		var _props = this.props;
		var ariaControls = _props.ariaControls;
		var ariaOwns = _props.ariaOwns;
		var assistiveText = _props.assistiveText;
		var children = _props.children;
		var className = _props.className;
		var disabled = _props.disabled;
		var errorText = _props.errorText;
		var iconLeft = _props.iconLeft;
		var iconRight = _props.iconRight;
		var inlineEditTrigger = _props.inlineEditTrigger;
		var inputRef = _props.inputRef;
		var label = _props.label;
		var onChange = _props.onChange;
		var onClick = _props.onClick;
		var name = _props.name;
		var placeholder = _props.placeholder;
		var readOnly = _props.readOnly;
		var required = _props.required;
		var type = _props.type;
		var value = _props.value;

		var props = _objectWithoutProperties(_props, ['ariaControls', 'ariaOwns', 'assistiveText', 'children', 'className', 'disabled', 'errorText', 'iconLeft', 'iconRight', 'inlineEditTrigger', 'inputRef', 'label', 'onChange', 'onClick', 'name', 'placeholder', 'readOnly', 'required', 'type', 'value']);

		var labelText = label || assistiveText; // One of these is required to pass accessibility tests

		// this is a hack to make left the default prop unless overwritten by `iconPosition="right"`
		var hasLeftIcon = !!iconLeft || (this.props.iconPosition === 'left' || this.props.iconPosition === undefined) && !!this.props.iconName;
		var hasRightIcon = !!iconRight || this.props.iconPosition === 'right' && !!this.props.iconName;

		return _react2.default.createElement(
			'div',
			{
				className: (0, _classnames2.default)('slds-form-element', {
					'is-required': required,
					'slds-has-error': errorText
				}, className)
			},
			labelText && (readOnly ? _react2.default.createElement(
				'span',
				{ className: (0, _classnames2.default)('slds-form-element__label', { 'slds-assistive-text': assistiveText && !label }) },
				labelText
			) : _react2.default.createElement(
				'label',
				{
					className: (0, _classnames2.default)('slds-form-element__label', { 'slds-assistive-text': assistiveText && !label }),
					htmlFor: this.getId()
				},
				required && _react2.default.createElement(
					'abbr',
					{ className: 'slds-required', title: 'required' },
					'*'
				),
				labelText
			)),
			_react2.default.createElement(
				'div',
				{
					className: (0, _classnames2.default)('slds-form-element__control', {
						'slds-input-has-icon': hasLeftIcon || hasRightIcon,
						'slds-input-has-icon--left': hasLeftIcon && !hasRightIcon,
						'slds-input-has-icon--right': !hasLeftIcon && hasRightIcon,
						'slds-input-has-icon--left-right': hasLeftIcon && hasRightIcon,
						'slds-has-divider--bottom': readOnly && !inlineEditTrigger
					})
				},
				hasLeftIcon ? this.getIconRender('left', 'iconLeft') : null,
				!readOnly && _react2.default.createElement('input', _extends({}, props, {
					'aria-controls': ariaControls,
					'aria-owns': ariaOwns,
					className: 'slds-input',
					disabled: disabled,
					id: this.getId(),
					onChange: onChange,
					onClick: onClick,
					name: name,
					placeholder: placeholder,
					ref: inputRef,
					required: required,
					type: type,
					value: value
				})),
				hasRightIcon ? this.getIconRender('right', 'iconRight') : null,
				readOnly && _react2.default.createElement(
					'span',
					{ className: 'slds-form-element__static', onClick: onClick },
					value,
					inlineEditTrigger
				)
			),
			errorText && _react2.default.createElement(
				'div',
				{ className: 'slds-form-element__help' },
				errorText
			),
			children
		);
	}
});

module.exports = Input;