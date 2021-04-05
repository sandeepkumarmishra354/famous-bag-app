import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react'
import { View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { Button, TextInput, withTheme } from 'react-native-paper';
import { AppScreens } from '../../../navigation/AppNavigationStack';
import { AppNavigation } from '../../../navigation/NavUtils';
import { StoreAuth } from '../../../store/store.auth';
import { isValidEmail } from '../../../utils/app_utils';
import { MySnackbar } from '../../../utils/snackbar';
const logo = require('../../../assets/images/app_splash_logo.webp');
const bg = require('../../../assets/images/login_bg.webp');

interface Props {
    theme: ReactNativePaper.Theme,
    storeAuth: StoreAuth
}

@inject("storeAuth")
@observer
class ScreenLogin extends PureComponent<Props> {

    private _email = '';
    private _password = '';

    private _onLoginClick = async () => {
        if (this._email === '' || this._password === '') {
            MySnackbar.showInfo('email/password required.');
            return;
        }
        if (!isValidEmail(this._email)) {
            MySnackbar.showInfo('enter valid email address.');
            return;
        }
        if (this._password.length < 6) {
            MySnackbar.showInfo("password can't be less than 6 character.");
            return;
        }
        //All OK
        this.props.storeAuth.login({
            email: this._email,
            password: this._password
        });
    }
    private _onSignupClick = async () => {
        AppNavigation.navigate(AppScreens.SIGNUP);
    }

    private _onEmailChange = (email: string) => {
        this._email = email;
    }
    private _onPasswordChange = (password: string) => {
        this._password = password;
    }

    render() {
        let deviceWidth = Dimensions.get('screen').width;
        let { primary } = this.props.theme.colors;
        return (
            <ScrollView
                contentContainerStyle={{ width: '100%', flex: 1, alignItems: 'center', minHeight: 600 }}>
                <View style={styles.container}>
                    <Image
                        style={styles.logoStyle}
                        source={logo} />
                    <View style={styles.inputHolder}>
                        <TextInput
                            style={[styles.input, { marginBottom: 8 }]}
                            label="Email address"
                            mode='outlined'
                            keyboardType='email-address'
                            onChangeText={this._onEmailChange}
                            left={<TextInput.Icon name="mail-outline" size={22} color="gray" />} />
                        <TextInput
                            style={styles.input}
                            label="Password"
                            onChangeText={this._onPasswordChange}
                            secureTextEntry={true}
                            mode='outlined'
                            left={<TextInput.Icon name="shield-outline" size={22} color="gray" />} />
                        <Button
                            style={styles.loginButton}
                            onPress={this._onLoginClick}
                            mode='contained'
                            labelStyle={{ color: '#fff' }}
                            loading={this.props.storeAuth.logingIn}
                            disabled={this.props.storeAuth.logingIn}>
                            LOGIN
                    </Button>
                        <Button
                            style={{ marginTop: 22, width: '85%',borderRadius:0 }}
                            color="#3944F7"
                            mode='outlined'
                            onPress={this._onSignupClick}
                            disabled={this.props.storeAuth.logingIn}>
                            CREATE ACCOUNT
                    </Button>
                        <Image
                            style={{ width: deviceWidth, height: 180, position: 'absolute', bottom: -10, resizeMode: 'cover' }}
                            source={bg} />
                    </View>
                </View>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logoStyle: {
        width: 120, height: 120,
        resizeMode: 'contain', marginTop: 16
    },
    inputHolder: {
        width: '100%',
        flexGrow: 1,
        alignItems: 'center',
        paddingTop: 40,
    },
    input: {
        width: '85%',
        //backgroundColor: '#f5f5f5',
    },
    loginButton: {
        width: '85%',
        marginTop: 25,
        borderRadius:0
    }
});

export default withTheme(ScreenLogin);