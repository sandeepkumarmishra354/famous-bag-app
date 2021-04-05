import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react'
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Button, Divider, List } from 'react-native-paper';
import { AppNavigation } from '../../../navigation/NavUtils';
import { StoreAuth } from '../../../store/store.auth';
import { StoreUser } from '../../../store/store.user';
import MyDivider from '../../component/MyDivider';
import ScreenContainer from '../../ScreenContainer';
import AvatarDetails from './component/AvatarDetails';

interface Props {
    storeUser: StoreUser,
    storeAuth: StoreAuth
}
interface State {
    //
}

@inject("storeUser", "storeAuth")
@observer
export default class MyAccount extends PureComponent<Props, State> {

    private _onLogoutPress = () => {
        this.props.storeAuth.logout();
    }

    componentDidMount = () => {
        this.props.storeUser.fetchProfile();
    }

    private _onListItemPress = () => {
        //
    }

    render() {
        let profile = this.props.storeUser.profileData;
        let loading = this.props.storeUser.fetchingProfile;
        return (
            <ScreenContainer
                title="My Account"
                showBackAction={AppNavigation.goBack}>
                {loading
                    ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size={35} />
                    </View>
                    :
                    <ScrollView
                        contentContainerStyle={{ width: '100%', flex: 1, backgroundColor: '#F8F8FF' }}>
                        <View style={{ width: '100%' }}>
                            <AvatarDetails
                                name={`${profile.firstName} ${profile.lastName}`}
                                email={this.props.storeUser.profileData.email} />
                            <MyDivider space={8} />
                            <View
                                style={{ width: '100%', minHeight: '100%', backgroundColor: '#fff' }}>
                                <List.Section>
                                    <List.Item
                                        title="Account Information"
                                        description="view/edit account information"
                                        onPress={this._onListItemPress}
                                        left={() => <List.Icon icon="shield-outline" color="gray" />} />
                                    <Divider />
                                    <List.Item
                                        title="Saved Address"
                                        description="view saved address"
                                        onPress={this._onListItemPress}
                                        left={() => <List.Icon icon="home-outline" color="gray" />} />
                                    <Divider />
                                    <List.Item
                                        title="Order History"
                                        description="see your previous orders"
                                        onPress={this._onListItemPress}
                                        left={() => <List.Icon icon="reorder-four-outline" color="gray" />} />
                                    <Divider />
                                    <List.Item
                                        title="Privacy Policy"
                                        description="read privacy policy"
                                        onPress={this._onListItemPress}
                                        left={() => <List.Icon icon="document-text-outline" color="gray" />} />
                                    <Divider />
                                    <List.Item
                                        title="Term's and Condition"
                                        description="read term and condition"
                                        onPress={this._onListItemPress}
                                        left={() => <List.Icon icon="information-circle-outline" color="gray" />} />
                                </List.Section>
                                <Button
                                    style={{ width: '70%', alignSelf: 'center', marginTop: 18, borderRadius: 0, backgroundColor: "#1B98F5" }}
                                    onPress={this._onLogoutPress}
                                    labelStyle={{ color: '#fff' }}
                                    icon="log-out-outline"
                                    loading={this.props.storeAuth.logingOut}
                                    disabled={this.props.storeAuth.logingOut}>
                                    LOGOUT
                            </Button>
                            </View>
                        </View>
                    </ScrollView>}
            </ScreenContainer>
        );
    }

}