import React, { PureComponent } from 'react'
import { View, ActivityIndicator, Image, StatusBar } from 'react-native';
const logo = require('../../assets/images/app_splash_logo.webp');

export default class ScreenSplash extends PureComponent {
    render() {
        return (
            <View
                style={{ width: '100%', flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                <StatusBar barStyle="light-content" backgroundColor="#e65300" />
                <Image
                    style={{ width: 170, height: 170, resizeMode: 'contain' }}
                    source={logo} />
                <ActivityIndicator
                    style={{ position: 'absolute', bottom: 18 }}
                    color="#e65300" size='small' />
            </View>
        );
    }

}