import React, { PureComponent } from 'react'
import { TextProps } from 'react-native';
import { Title } from 'react-native-paper';
import { material } from 'react-native-typography';

export default class MyTitle extends PureComponent<TextProps> {

    render() {
        return (
            <Title
            {...this.props}
                style={[material.title, { color: '#585858',fontSize:18 }, this.props.style]}>
                {this.props.children}
            </Title>
        );
    }

}