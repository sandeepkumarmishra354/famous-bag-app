import React, { PureComponent } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MyCaption from './MyCaption';

interface Props {
    rating: number,
    ratingCount?: number,
    style?:StyleProp<ViewStyle>
}

export default class RatingStar extends PureComponent<Props> {

    render() {
        return (
            <View style={[
                { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
                this.props.style
            ]}>
                <View style={styles.rating}>
                    <MyCaption style={{ marginRight: 3, fontSize: 12, color: '#fff' }}>{this.props.rating}</MyCaption>
                    <Icon name="star" color="#fff" size={10} />
                </View>
                {this.props.ratingCount && <MyCaption
                    style={{ color: '#3944F7', fontWeight: 'bold' }}>
                    {`${this.props.ratingCount} ratings`}
                </MyCaption>}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'green',
        paddingHorizontal: 10,
        paddingVertical: 1,
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginRight: 10
    }
});