import React, { PureComponent } from 'react'
import { View } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { AppNavigation } from '../../../navigation/NavUtils';
import { showToast } from '../../../utils/toasty';

interface Props {
    //
}
interface State {
    //
}

export default class ModalFilter extends PureComponent<Props, State> {

    private _onClearFilter = () => {
        showToast('All filter reset...');
        AppNavigation.goBack();
    }

    render() {
        return (
            <View style={{ flex: 1, width: '100%' }}>
                <Appbar.Header style={{ elevation: 0 }}>
                    <Appbar.Action
                        icon="close-outline"
                        onPress={AppNavigation.goBack} />
                    <Appbar.Content title="Filter" />
                    <Button color="#fff" onPress={this._onClearFilter}>Clear</Button>
                </Appbar.Header>
            </View>
        );
    }

}