import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, TextInput, withTheme, Checkbox } from 'react-native-paper';
import { StoreAuth } from '../../../store/store.auth';
import { isValidEmail } from '../../../utils/app_utils';
import { MySnackbar } from '../../../utils/snackbar';
const logo = require('../../../assets/images/app_splash_logo.webp');

interface Props {
    theme: ReactNativePaper.Theme,
    storeAuth: StoreAuth
}
interface State {
    checkboxStatus: "checked" | "unchecked"
}

@inject("storeAuth")
@observer
class ScreenSignup extends PureComponent<Props, State> {

    private _firstName = '';
    private _lastName = '';
    private _email = '';
    private _phone = '';
    private _password = '';

    constructor(props: Props) {
        super(props);
        this.state = { checkboxStatus: 'unchecked' };
    }

    private _isEmpty = (text?: string) => {
        return (text === undefined || text === null || text === '');
    }

    private _onFNameChange = (fname: string) => {
        this._firstName = fname;
    }
    private _onLNameChange = (lname: string) => {
        this._lastName = lname;
    }
    private _onEmailChange = (email: string) => {
        this._email = email;
    }
    private _onPhoneChange = (phone: string) => {
        this._phone = phone;
    }
    private _onPasswordChange = (password: string) => {
        this._password = password;
    }

    private _onCreateAccount = () => {
        if (this._isEmpty(this._email) || this._isEmpty(this._firstName) || this._isEmpty(this._lastName)
            || this._isEmpty(this._phone) || this._isEmpty(this._password)) {
            MySnackbar.showError('All fields are mandatory.');
            return;
        }
        if (!isValidEmail(this._email)) {
            MySnackbar.showError('Enter valid email address.');
            return;
        }
        if (this._phone.length !== 10) {
            MySnackbar.showError('Mobile number must be 10 digits long.');
            return;
        }
        if (this._password.length < 6) {
            MySnackbar.showError("password can't be less than 6 character.");
            return;
        }
        if (this.state.checkboxStatus === 'unchecked') {
            MySnackbar.showError("Please agree to our term's & conditions.");
            return;
        }
        //All Ok
        this.props.storeAuth.signup({
            email: this._email,
            firstName: this._firstName,
            lastName: this._lastName,
            phone: this._phone,
            password: this._password,
        });
    }
    private _onCheckboxClick = () => {
        let { checkboxStatus } = this.state;
        checkboxStatus = checkboxStatus === 'checked' ? 'unchecked' : 'checked';
        this.setState({ checkboxStatus });
    }

    render() {
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
                            label="First Name"
                            mode='outlined'
                            onChangeText={this._onFNameChange}
                            left={<TextInput.Icon name="person-outline" size={20} color="gray" />} />
                        <TextInput
                            style={[styles.input, { marginBottom: 8 }]}
                            label="Last Name"
                            mode='outlined'
                            onChangeText={this._onLNameChange}
                            left={<TextInput.Icon name="person-outline" size={20} color="gray" />} />
                        <TextInput
                            style={[styles.input, { marginBottom: 8 }]}
                            label="Email address"
                            keyboardType="email-address"
                            onChangeText={this._onEmailChange}
                            left={<TextInput.Icon name="mail-outline" size={20} color="gray" />}
                            mode='outlined' />
                        <TextInput
                            style={[styles.input, { marginBottom: 8 }]}
                            label="Mobile Number"
                            keyboardType="phone-pad"
                            onChangeText={this._onPhoneChange}
                            left={<TextInput.Icon name="call-outline" size={20} color="gray" />}
                            mode='outlined' />
                        <TextInput
                            style={styles.input}
                            label="Choose Password"
                            secureTextEntry={true}
                            onChangeText={this._onPasswordChange}
                            left={<TextInput.Icon name="shield-outline" size={20} color="gray" />}
                            mode='outlined' />

                        <View
                            style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Checkbox.Item
                                status={this.state.checkboxStatus}
                                onPress={this._onCheckboxClick}
                                color={primary}
                                labelStyle={{ color: 'gray', fontSize: 14 }}
                                label="Agree to the Term's and Conditions" />
                        </View>

                        <Button
                            style={styles.loginButton}
                            onPress={this._onCreateAccount}
                            mode='contained'
                            loading={this.props.storeAuth.signingUp}
                            disabled={this.props.storeAuth.signingUp}>
                            CREATE ACCOUNT
                    </Button>
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
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    logoStyle: {
        width: 120, height: 120,
        resizeMode: 'contain', marginTop: 16
    },
    inputHolder: {
        width: '100%',
        flexGrow: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    input: {
        width: '85%',
        //backgroundColor: '#f5f5f5',
    },
    loginButton: {
        width: '85%',
        marginTop: 16,
        borderRadius: 0
    }
});

export default withTheme(ScreenSignup);