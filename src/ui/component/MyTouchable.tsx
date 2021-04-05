import React, { PureComponent } from 'react'
import { StyleProp, ViewStyle } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

interface Props {
    onPress?: () => void,
    style?: StyleProp<ViewStyle>
}

export default class MyTouchable extends PureComponent<Props> {

    render() {
        return (
            <TouchableRipple
                style={this.props.style}
                rippleColor="rgba(0, 0, 0, .07)"
                onPress={this.props.onPress}
                borderless>
                {this.props.children}
            </TouchableRipple>
        );
    }

}