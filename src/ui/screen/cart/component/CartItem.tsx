import React, { PureComponent } from 'react'
import { Image, View } from 'react-native';
import { Button, Card, Divider } from 'react-native-paper';
import { ICartItem } from '../../../../store/data-type/cart/data.cart';
import { formatCurrency } from '../../../../utils/app_utils';
import MyDivider from '../../../component/MyDivider';
import MySubheading from '../../../component/MySubheading';
import MyTitle from '../../../component/MyTitle';

interface Props {
    item:ICartItem
}

export default class CartItem extends PureComponent<Props> {

    private _onRemove = () => {
        //
    }
    private _onWishlist = () => {
        //
    }

    render() {
        return (
            <Card style={{ borderRadius: 0, marginBottom: 10 }} elevation={2}>
                <Card.Content style={{ marginBottom: 8 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 2 }}>
                            <MySubheading
                                style={{ fontSize: 15 }}
                                numberOfLines={2} ellipsizeMode='tail'>
                                {this.props.item.name}
                        </MySubheading>
                            <MyTitle style={{ fontSize: 16 }}>
                                {formatCurrency(this.props.item.price)}
                            </MyTitle>
                        </View>
                        <Image
                            style={{ width: 60, height: 70, resizeMode: 'contain' }}
                            source={{ uri: this.props.item.image }} />
                    </View>
                </Card.Content>
                <Divider />
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <Button
                        style={{ flex: 1 }}
                        icon="heart-outline" color="gray"
                        onPress={this._onWishlist}>
                        WISHLIST
                </Button>
                    <MyDivider vertical space={1} />
                    <Button
                        style={{ flex: 1 }}
                        icon="trash-outline" color="gray"
                        onPress={this._onRemove}>
                        REMOVE
                </Button>
                </View>
            </Card>
        );
    }

}