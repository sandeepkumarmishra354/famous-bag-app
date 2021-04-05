import React, { PureComponent } from 'react'
import { TextInput, View } from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import { AppNavigation } from '../../../navigation/NavUtils';

interface Props {
}
interface State {
    searchQuery: string
}

export default class ModalSearch extends PureComponent<Props, State> {

    private readonly _searchRef = React.createRef<TextInput>();

    constructor(props: Props) {
        super(props);
        this.state = { searchQuery: '' };
    }

    componentDidMount = () => {
        //this._searchRef.current?.focus();
    }

    private _onTextChanged = (query: string) => {
        this.setState({ searchQuery: query });
    }

    render() {
        return (
            <View style={{ flex: 1, width: '100%' }}>
                <Appbar.Header>
                    <Appbar.Action
                        icon="close-outline"
                        onPress={AppNavigation.goBack} />
                    <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Searchbar
                            ref={this._searchRef}
                            inputStyle={{fontSize:15}}
                            selectTextOnFocus
                            style={{ height: 43, width: '98%', elevation: 0 }}
                            value={this.state.searchQuery}
                            onChangeText={this._onTextChanged}
                            placeholder="Search..." />
                    </View>
                </Appbar.Header>
            </View>
        );
    }

}