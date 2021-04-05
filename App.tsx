import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import React, { PureComponent } from 'react';
import { Provider as StoreProvider } from 'mobx-react';
import FamousBag from './src/FamousBag';
import { AppDataStore } from './src/store/AppDataStore';
import ScreenSplash from './src/ui/screen/ScreenSplash';
import { sessionTokenManager } from './src/utils/session';

//this is important to call this function before navigation stack renders
//this function is used for screen memory optimization
enableScreens();

//declare const global: { HermesInternal: null | {} };

export default class App extends PureComponent<{}, { loaded: boolean }> {

  constructor(props: {}) {
    super(props);
    this.state = { loaded: false };
  }

  componentDidMount = async () => {
    if (await sessionTokenManager.hasToken())
      AppDataStore.storeAuth.setLoggedIn(true);
    setTimeout(() => {
      this.setState({ loaded: true });
    }, 1200);
  }

  render() {
    let { loaded } = this.state;
    if (loaded) {
      return <StoreProvider {...AppDataStore}><FamousBag /></StoreProvider>;
    }
    return <ScreenSplash />
  }

}
