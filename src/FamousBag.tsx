import React, { PureComponent } from 'react'
import { StatusBar } from 'react-native';
import { Portal, Provider as PaperProvider } from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { AppNavigationStack } from './navigation/AppNavigationStack';
import { AppTheme } from './utils/theme';

export default class FamousBag extends PureComponent {
    render() {
        return (
            <PaperProvider theme={AppTheme} settings={{ icon: props => <IonIcon {...props} /> }}>
                <StatusBar barStyle="light-content" backgroundColor="#e65300" />
                <Portal>
                    <AppNavigationStack />
                </Portal>
            </PaperProvider>
        )
    }
}