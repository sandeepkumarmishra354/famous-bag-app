import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react'
import { FlatList, View } from 'react-native';
import { ActivityIndicator, Divider } from 'react-native-paper';
import { AppScreens } from '../../../navigation/AppNavigationStack';
import { AppNavigation } from '../../../navigation/NavUtils';
import { EHomeDataType, IHomeData } from '../../../store/data-type/home/data.home';
import { StoreHome } from '../../../store/store.home';
import AppbarActions from '../../component/AppbarActions';
import ScreenContainer from '../../ScreenContainer';
import BasicProductList from './component/BasicProductList';
import PhotoSlider from './component/PhotoSlider';

interface Props {
    storeHome: StoreHome
}

@inject("storeHome")
@observer
export default class ScreenHome extends PureComponent<Props, { loading: boolean }> {

    constructor(props: Props) {
        super(props);
        this.state = { loading: true };
    }

    componentDidMount = () => {
        setTimeout(() => {
            this._setLoading(false);
        }, 2000);
    }

    private _setLoading = (status: boolean) => {
        this.setState({ loading: status });
    }

    private _onCategory = () => {
        AppNavigation.navigate(AppScreens.MODAL_CATEGORY);
    }

    private _renderItem = ({ item }: { item: IHomeData }) => {
        switch (item.type) {
            case EHomeDataType.IMAGE_SLIDE:
                return <PhotoSlider
                    photos={item.data as string[]}
                    autoplay={true}
                    interval={4000} />;
            case EHomeDataType.PRODUCT:
                return <View>
                    <BasicProductList data={item.data as any} />
                    <Divider />
                </View>;
            default:
                return null;
        }
    }

    render() {
        return (
            <ScreenContainer
                title="Famous Bag"
                showMenuAction={this._onCategory}
                actions={<AppbarActions />}>
                <View style={{ flex: 1, width: '100%', backgroundColor: '#fff' }}>
                    {this.state.loading
                        ? <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <ActivityIndicator size={35} />
                        </View>
                        : <FlatList
                            data={this.props.storeHome.data}
                            renderItem={this._renderItem}
                            showsVerticalScrollIndicator={false} />}
                </View>
            </ScreenContainer>
        );
    }

}