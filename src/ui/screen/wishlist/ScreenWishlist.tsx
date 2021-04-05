import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react'
import { FlatList, Image, View } from 'react-native';
import { ActivityIndicator, Card, IconButton, Menu } from 'react-native-paper';
import { AppScreens } from '../../../navigation/AppNavigationStack';
import { AppNavigation } from '../../../navigation/NavUtils';
import { IWishlistItem } from '../../../store/data-type/wishlist/data.wishlist';
import { StoreWishlist } from '../../../store/store.wishlist';
import { formatCurrency } from '../../../utils/app_utils';
import { showToast } from '../../../utils/toasty';
import MyCaption from '../../component/MyCaption';
import MySubheading from '../../component/MySubheading';
import MyTouchable from '../../component/MyTouchable';
import ScreenContainer from '../../ScreenContainer';

class WishlistItem extends PureComponent<{ item: IWishlistItem }, { showMenu: boolean }> {

    constructor(props: { item: IWishlistItem }) {
        super(props);
        this.state = { showMenu: false };
    }

    private _onRemovePress = () => {
        this._dismissMenu();
    }
    private _onToBagPress = () => {
        this._dismissMenu();
    }
    private _showMenu = () => {
        this.setState({ showMenu: true });
    }
    private _dismissMenu = () => {
        this.setState({ showMenu: false });
    }
    private _onItemPress = () => {
        AppNavigation.navigate(AppScreens.PRODUCT_DETAIL, { productId: '21212' });
    }

    private _getMenu = () => (
        <View style={{ alignSelf: 'flex-end' }}>
            <Menu
                visible={this.state.showMenu}
                onDismiss={this._dismissMenu}
                anchor={
                    <IconButton
                        icon="ellipsis-vertical-outline"
                        onPress={this._showMenu}
                        color="gray"
                        size={18} />}>
                <Menu.Item title="Remove" onPress={this._onRemovePress} />
                <Menu.Item title="To bag" onPress={this._onToBagPress} />
            </Menu>
        </View>
    );

    render() {
        return (
            <MyTouchable
                style={{ flex: 1 }}
                onPress={this._onItemPress}>
                <Card
                    style={{ borderRadius: 0, margin: 1, flex: 1 }}>
                    {this._getMenu()}
                    <View>
                        <Image
                            style={{ width: '100%', height: 110, resizeMode: 'contain' }}
                            source={{ uri: this.props.item.image }} />
                        <View style={{ padding: 8 }}>
                            <MySubheading
                                style={{ fontSize: 13 }}
                                numberOfLines={1}
                                ellipsizeMode="tail">
                                {this.props.item.name}
                            </MySubheading>
                            <MyCaption
                                style={{ color: '#000', fontWeight: 'bold' }}>
                                {formatCurrency(this.props.item.price)}
                            </MyCaption>
                        </View>
                    </View>
                </Card>
            </MyTouchable>
        );
    }
}


interface Props {
    storeWishlist: StoreWishlist,
}

@inject('storeWishlist')
@observer
export default class ScreenWishlist extends PureComponent<Props, { loading: boolean }> {

    constructor(props: Props) {
        super(props);
        this.state = { loading: true };
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({ loading: false });
        }, 1000);
    }

    private _renderItem = ({ item }: { item: IWishlistItem }) => (<WishlistItem item={item} />);

    render() {
        return (
            <ScreenContainer
                title="My Wishlist"
                showBackAction={AppNavigation.goBack}>
                {this.state.loading
                    ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size={35} />
                    </View>
                    :
                    <FlatList
                        data={this.props.storeWishlist.data}
                        numColumns={2}
                        horizontal={false}
                        renderItem={this._renderItem}
                        keyExtractor={item => item.productId} />}
            </ScreenContainer>
        );
    }

}