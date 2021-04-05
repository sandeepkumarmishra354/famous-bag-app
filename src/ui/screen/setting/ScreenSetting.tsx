import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react'
import { AppNavigation } from '../../../navigation/NavUtils';
import { StoreSetting } from '../../../store/store.setting';
import ScreenContainer from '../../ScreenContainer';

interface Props {
    storeSetting: StoreSetting
}
interface State {
    //
}

@inject("storeSetting")
@observer
export default class ScreenSetting extends PureComponent<Props, State> {

    render() {
        return (
            <ScreenContainer
                title="Settings"
                showBackAction={AppNavigation.goBack}>
            </ScreenContainer>
        );
    }

}