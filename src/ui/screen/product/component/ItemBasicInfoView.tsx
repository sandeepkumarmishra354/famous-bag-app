import React, { PureComponent } from 'react'
import { View } from 'react-native';
import { ActivityIndicator, Card, IconButton } from 'react-native-paper';
import { IItemBasicDetail } from '../../../../store/data-type/product/data.product';
import { formatCurrency } from '../../../../utils/app_utils';
import { showToast } from '../../../../utils/toasty';
import MySubheading from '../../../component/MySubheading';
import MyTitle from '../../../component/MyTitle';
import RatingStar from '../../../component/RatingStar';
import PhotoSlider from '../../home/component/PhotoSlider';

interface Props {
    data: IItemBasicDetail
}

export default class ItemBasicInfoView extends PureComponent<Props> {

    constructor(props:Props) {
        super(props);
    }

    private _onAddToWishlist = () => {
        showToast('Adding to wishlist...');
    }
    private _onShare = () => {
        showToast('Share link created');
    }

    render() {
        let data = this.props.data;
        return (
            <Card style={{ marginBottom: 10, borderRadius: 0 }} elevation={2}>
                <PhotoSlider
                    photos={data.photos}
                    height={280} />
                <Card.Content>
                    <MySubheading style={{ letterSpacing: 1 }}>
                        {`${data.brand} ${data.model}`}
                    </MySubheading>
                    <MyTitle style={{ fontSize: 22, marginTop: 5 }}>
                        {formatCurrency(data.price)}
                    </MyTitle>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <RatingStar
                            rating={data.rating}
                            ratingCount={data.ratingCount} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {/*<ActivityIndicator size={18} color="gray"/>*/}
                            <IconButton
                                icon='heart-outline'
                                color="gray"
                                onPress={this._onAddToWishlist} />
                            <IconButton
                                icon="share-social-outline"
                                color="gray"
                                onPress={this._onShare}/>
                        </View>
                    </View>
                </Card.Content>
            </Card>
        );
    }

}