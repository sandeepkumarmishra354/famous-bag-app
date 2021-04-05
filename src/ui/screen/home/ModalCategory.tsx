import React, { PureComponent } from 'react'
import { View } from 'react-native';
import { withTheme, Appbar } from 'react-native-paper';
import { AppNavigation } from '../../../navigation/NavUtils';

interface Props {
    theme: ReactNativePaper.Theme
};
interface State {
    //
};

class ModalCategory extends PureComponent<Props, State> {

    render() {
        let { primary } = this.props.theme.colors;
        return (
            <View style={{ flex: 1, width: '100%' }}>
                <Appbar.Header style={{elevation:0}}>
                    <Appbar.Action
                        icon="close-outline"
                        onPress={AppNavigation.goBack} />
                    <Appbar.Content title="Choose Category"/>
                </Appbar.Header>
            </View>
        );
    }

}

export default withTheme(ModalCategory);