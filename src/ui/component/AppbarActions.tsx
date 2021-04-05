import React, { PureComponent } from 'react'
import { View } from 'react-native';
import { Appbar, Badge, Menu } from 'react-native-paper';
import { AppScreens } from '../../navigation/AppNavigationStack';
import { AppNavigation } from '../../navigation/NavUtils';

class AppMenu extends PureComponent<{}, { show: boolean }> {

    constructor(props: {}) {
        super(props);
        this.state = { show: false }
    }

    private _onMenuPress = () => {
        this.setState({ show: true });
    }
    private _onDismiss = async () => {
        this.setState({ show: false });
    }
    private _onAccountPress = () => {
        this._onDismiss();
        AppNavigation.navigate(AppScreens.MY_ACCOUNT);
    }
    private _onSettingPress = () => {
        this._onDismiss();
        AppNavigation.navigate(AppScreens.SETTING);
    }
    private _onHelpPress = () => {
        this._onDismiss();
    }
    private _onWishlistPress = () => {
        this._onDismiss();
        AppNavigation.navigate(AppScreens.WISHLIST);
    }

    render() {
        return (
            <Menu
                visible={this.state.show}
                onDismiss={this._onDismiss}
                anchor={<Appbar.Action key={3} icon="ellipsis-vertical-outline" onPress={this._onMenuPress} color="#fff" size={22} />}>
                <Menu.Item title="Account" onPress={this._onAccountPress} icon="shield-checkmark-outline" />
                <Menu.Item title="Wishlist" onPress={this._onWishlistPress} icon="heart-outline" />
                <Menu.Item title="Settings" onPress={this._onSettingPress} icon="settings-outline" />
                <Menu.Item title="Help" onPress={this._onHelpPress} icon="help-circle-outline" />
            </Menu>
        );
    }
}

class CartIcon extends PureComponent {

    private _onBagPress = () => {
        AppNavigation.navigate(AppScreens.CART);
    }

    render() {
        return (
            <View>
                <Badge
                    size={16} visible={true}
                    style={{ position: 'absolute', top: 8, right: 2, backgroundColor: '#fff' }} >2</Badge>
                <Appbar.Action
                    key={2} icon="cart-outline"
                    size={22}
                    color="#fff" onPress={this._onBagPress} />
            </View>
        );
    }
}

interface Props {
    //
}

export default class AppbarActions extends PureComponent<Props> {

    private _onSearchPress = () => {
        AppNavigation.navigate(AppScreens.MODAL_SEARCH);
    }

    render() {
        return (
            [<Appbar.Action key={1} size={22} icon="search-outline" color="#fff" onPress={this._onSearchPress} />,
            <CartIcon key={2} />,
            <AppMenu key={3} />,]
        );
    }

}