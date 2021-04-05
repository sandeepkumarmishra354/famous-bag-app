import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native';
import { Card } from 'react-native-paper';
import { ICartPriceDetail } from '../../../../store/data-type/cart/data.cart';
import { formatCurrency } from '../../../../utils/app_utils';
import MySubheading from '../../../component/MySubheading';
import MyTitle from '../../../component/MyTitle';

class PriceItem extends PureComponent<{ title: string, price: number | string, color?: string }> {
    render() {
        let color = this.props.color ?? '#000';
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <MySubheading style={{ color, fontSize: 14 }}>{this.props.title}</MySubheading>
                <MySubheading style={{ color, fontSize: 14 }}>{this.props.price}</MySubheading>
            </View>
        );
    }
}

interface Props {
    priceInfo: ICartPriceDetail
}

export default class CartPriceDetail extends PureComponent<Props> {

    render() {
        let { delivery, discount, finalAmount, items, other, price } = this.props.priceInfo;
        finalAmount = (price + delivery + other) - discount;
        return (
            <Card style={{ borderRadius: 0, marginBottom: 10 }} elevation={2}>
                <Card.Content>
                    <MyTitle style={{ marginBottom: 8 }}>Price details</MyTitle>
                    <PriceItem
                        title={`Price (${items} items)`}
                        price={formatCurrency(price)} />
                    <PriceItem
                        title="Discount"
                        price={discount !== 0 ? `- ${formatCurrency(discount)}` : '- - -'}
                        color={discount === 0 ? undefined : 'green'} />
                    <PriceItem
                        title="Delivery Charge"
                        price={delivery !== 0 ? formatCurrency(delivery) : 'FREE'}
                        color={delivery === 0 ? "green" : undefined} />
                    <PriceItem
                        title="Other Charge"
                        price={other !== 0 ? formatCurrency(other) : '- - -'} />
                    <View style={styles.dashed} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <MySubheading style={{ color: '#000' }}>Payable Amount</MySubheading>
                        <MySubheading style={{ color: '#000' }}>{formatCurrency(finalAmount)}</MySubheading>
                    </View>
                </Card.Content>
            </Card>
        );
    }

}

const styles = StyleSheet.create({
    dashed: {
        width: '100%',
        height: 1,
        marginTop: 10,
        marginBottom: 8,
        borderColor: '#A0A0A0',
        borderWidth: 0.5,
        borderRadius: 0.5,
        borderStyle: 'dashed'
    }
});