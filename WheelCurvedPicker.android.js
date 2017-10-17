import React from 'react';
import PropTypes from 'prop-types';
import CreateReactClass from 'create-react-class';
import {View, ColorPropType, requireNativeComponent} from 'react-native';


var WheelCurvedPicker = CreateReactClass({
    propTypes: {
        ...View.propTypes,

        data: PropTypes.arrayOf(PropTypes.object),

        textColor: ColorPropType,

        textSize: PropTypes.number,

        itemStyle: PropTypes.object,

        itemSpace: PropTypes.number,

        onValueChange: PropTypes.func,

        selectedValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

        selectedIndex: PropTypes.number,
    },

    getDefaultProps: function () {
        return {
            itemStyle: {color: 'white', fontSize: 26},
            itemSpace: 20,
        };
    },

    getInitialState: function () {
        return this._stateFromProps(this.props);
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState(this._stateFromProps(nextProps));
    },

    _stateFromProps: function (props) {
        var textSize = props.itemStyle.fontSize;
        var textColor = props.itemStyle.color;
        var selectedIndex = 0;
        var items = [];

        React.Children.forEach(props.children, function (child, index) {
            if (child.props.value === props.selectedValue) {
                selectedIndex = index;
            }
            items.push({value: child.props.value, label: child.props.label});
        });

        return {selectedIndex, items, textSize, textColor};
    },

    _onValueChange: function (e) {
        if (this.props.onValueChange) {
            this.props.onValueChange(e.nativeEvent.data);
        }
    },

    render() {
        return <WheelCurvedPickerNative
            {...this.props}
            onValueChange={this._onValueChange}
            data={this.state.items}
            textColor={this.state.textColor}
            textSize={this.state.textSize}
            selectedIndex={parseInt(this.state.selectedIndex)}/>;
    }
});

WheelCurvedPicker.Item = CreateReactClass({
    propTypes: {
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string,
    },

    render: function () {
        return null;
    },
});

var WheelCurvedPickerNative = requireNativeComponent('WheelCurvedPicker', WheelCurvedPicker);

module.exports = WheelCurvedPicker;
