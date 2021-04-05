import React, { PureComponent } from 'react'
import { TextProps } from 'react-native';
import { Subheading } from 'react-native-paper';
import { material } from 'react-native-typography';

export default class MySubheading extends PureComponent<TextProps> {

    render() {
        return (
            <Subheading
                {...this.props}
                style={[material.subheading, { color: '#606060' }, this.props.style]}>
                {this.props.children}
            </Subheading>
        );
    }

}