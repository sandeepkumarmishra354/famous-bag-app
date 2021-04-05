import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import MyCaption from '../../../component/MyCaption';
import MyTitle from '../../../component/MyTitle';

interface Props {
    name:string,
    email:string,
    photo?:string
}

export default class AvatarDetails extends PureComponent<Props> {

    render() {
        let names = this.props.name.split(' ');
        let label = names.map(n => n[0]).join('');
        return (
            <Card elevation={2}>
                <Card.Content style={styles.container}>
                    <Avatar.Text
                    labelStyle={{fontSize:22,letterSpacing:1.5}}
                    size={80}
                    label={label}
                    style={{ marginRight: 16 }} />
                    <View>
                        <MyTitle>{this.props.name}</MyTitle>
                        <MyCaption style={{fontSize:14}} textBreakStrategy='balanced'>{this.props.email}</MyCaption>
                    </View>
                </Card.Content>
            </Card>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff'
    }
});