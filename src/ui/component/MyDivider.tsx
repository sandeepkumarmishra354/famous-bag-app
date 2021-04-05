import React, { PureComponent } from 'react'
import { View } from 'react-native';

interface Props {
    space?:number,
    color?:string,
    vertical?:boolean
}

export default class MyDivider extends PureComponent<Props> {

    render() {
        let space = this.props.space ?? 5;
        let vertical = this.props.vertical ?? false;
        let backgroundColor = this.props.color ?? '#EAF0F1';
        let width = vertical ? space: '100%';
        let height = vertical ? '100%' : space;
        return (
            <View
            style={{width,height,backgroundColor}}>
            </View>
        );
    }

}