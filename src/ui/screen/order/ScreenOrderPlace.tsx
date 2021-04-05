import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react'
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Button, Card, Checkbox, Divider, Paragraph } from 'react-native-paper';
import { AppScreens } from '../../../navigation/AppNavigationStack';
import { NavigationProps } from '../../../navigation/NavUtils';
import { IAddressData } from '../../../store/data-type/user/data.user';
import { StoreAddress } from '../../../store/store.address';
import { formatCurrency } from '../../../utils/app_utils';
import { MySnackbar } from '../../../utils/snackbar';
import MyCaption from '../../component/MyCaption';
import MySubheading from '../../component/MySubheading';
import MyTitle from '../../component/MyTitle';
import MyTouchable from '../../component/MyTouchable';
import ScreenContainer from '../../ScreenContainer';

class DeliverAddressView extends PureComponent<{ address: IAddressData }> {

    private _onChangeAddressPress = () => {
        //
    }

    render() {
        let { address } = this.props;
        let { country, district, landmark, state, zipCode, fullAddress, phone, customerName } = address;
        let fullAddr = `${fullAddress}, ${zipCode}, ${district}, ${state}, ${country} (${landmark})`;
        return (
            <Card style={{ borderRadius: 0, marginBottom: 10 }} elevation={2}>
                <Card.Content>
                    <MyTitle style={{ marginBottom: 10 }}>Delivery Address</MyTitle>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <Checkbox
                            status='checked'
                            color='#e65300' />
                        <View style={{ paddingLeft: 12 }}>
                            <MySubheading style={{ color: '#000' }}>
                                {customerName}
                            </MySubheading>
                            <MyCaption style={{ color: '#1B98F5', paddingVertical: 5 }}>{phone}</MyCaption>
                            <Paragraph textBreakStrategy='balanced'>
                                {fullAddr}
                            </Paragraph>
                        </View>
                    </View>
                    <Button
                        style={{ marginTop: 12, alignSelf: 'flex-end', borderColor: '#1B98F5',borderRadius:0 }}
                        contentStyle={{ height: 25 }}
                        labelStyle={{ fontSize: 13 }}
                        mode='outlined'
                        color='#1B98F5'
                        onPress={this._onChangeAddressPress}>
                        Change
                        </Button>
                </Card.Content>
            </Card>
        );
    }
}

interface PaymentOptionProp {
    title: string, subtitle?: string,
    disabled?: boolean,
    value: 'upi' | 'card' | 'net' | 'wallet' | 'cod'
}

class PaymentOptionView extends PureComponent<{}, { selectedOption: string,paying:boolean }> {

    constructor(props: {}) {
        super(props);
        this.state = { selectedOption: '',paying:false };
    }

    private _onPayNowPress = () => {
        if (this.state.selectedOption === '') {
            MySnackbar.showError('Please select a payment option first.');
            return;
        }
        //make payment now
        this.setState({paying:true});
        setTimeout(() => {
            this.setState({ paying: false });
            MySnackbar.showSuccess('Payment successfull.', 2500);
        },2500);
    }

    private _onOptionPress = (value: string) => {
        if (value !== this.state.selectedOption)
            this.setState({ selectedOption: value });
    }

    private PaymentOption = ({ title, subtitle, disabled, value }: PaymentOptionProp) => (
        <MyTouchable style={{ width: '100%', marginBottom: 8 }}
            onPress={!disabled && !this.state.paying ? () => { this._onOptionPress(value) } : undefined}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                <Checkbox
                    status={this.state.selectedOption === value ? 'checked' : 'unchecked'}
                    disabled={disabled || this.state.paying}
                    color='#e65300' />
                <View style={{ marginLeft: 15 }}>
                    <MySubheading style={(disabled || this.state.paying) && { color: '#A0A0A0' }}>{title}</MySubheading>
                    {subtitle && <MyCaption style={(disabled || this.state.paying) && { color: '#A0A0A0' }}>{subtitle}</MyCaption>}
                </View>
            </View>
        </MyTouchable>
    );

    render() {
        return (
            <Card style={{ borderRadius: 0, marginBottom: 10 }} elevation={2}>
                <Card.Content>
                    <MyTitle style={{ marginBottom: 10 }}>Select Payment Option</MyTitle>
                    <this.PaymentOption
                        value='upi'
                        title="UPI"
                        subtitle="GPay, PhonePe, Bhim, PayTm, etc." />
                    <this.PaymentOption
                        value='card'
                        title="Credit / Debit Card"
                        subtitle="Rupay, Visa, Master card, etc." />
                    <this.PaymentOption
                        value='net'
                        title="Netbanking" />
                    <this.PaymentOption
                        value='wallet'
                        title="Wallet"
                        subtitle={`${formatCurrency(1500)}`} />
                    <this.PaymentOption
                        value='cod'
                        title="Cash On Delivery"
                        disabled
                        subtitle="Currently Unavailable" />
                    <Divider />
                    <View
                        style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <MySubheading style={{ color: '#000' }}>{formatCurrency(1499)}</MySubheading>
                        <Button
                        style={{borderRadius:0}}
                            //contentStyle={{ backgroundColor: '#1FAA59' }}
                            //labelStyle={{ color: '#fff' }}
                            icon="wallet-outline"
                            color='#1FAA59'
                            mode="contained"
                            loading={this.state.paying}
                            disabled={this.state.paying}
                            onPress={this._onPayNowPress}>
                            PAY NOW
                        </Button>
                    </View>
                </Card.Content>
            </Card>
        );
    }
}

interface Props extends NavigationProps<AppScreens.ORDER_PLACE> {
    storeAddress: StoreAddress
}
interface State {
    loading: boolean
}

@inject("storeAddress")
@observer
export default class ScreenOrderPlace extends PureComponent<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = { loading: true };
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({ loading: false });
        }, 500);
    }

    render() {
        let address = this.props.storeAddress.prefferedAddress;
        return (
            <ScreenContainer
                title="Place Order"
                showBackAction={this.props.navigation.goBack}>
                {this.state.loading
                    ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size={35} />
                    </View>
                    : <ScrollView
                        style={{ flex: 1 }}>
                        {address && <DeliverAddressView address={address} />}
                        <PaymentOptionView />
                    </ScrollView>}
            </ScreenContainer>
        );
    }

}