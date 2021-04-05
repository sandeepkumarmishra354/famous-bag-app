import React, { PureComponent } from 'react'
import { TextProps } from 'react-native';
import { Caption } from 'react-native-paper';
import { material } from 'react-native-typography';

export default class MyCaption extends PureComponent<TextProps> {

    render() {
        return (
            <Caption
                {...this.props}
                style={[material.caption, { color:'#696969'}, this.props.style]}>
                {this.props.children}
            </Caption>
        );
    }

}