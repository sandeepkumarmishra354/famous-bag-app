import { NavigationContainerRef, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { AppScreens, AppStackParamList } from './AppNavigationStack';

export const stackNavigationRef = React.createRef<NavigationContainerRef>();

export const AppNavigation = {
    navigate: <S extends keyof AppStackParamList>(screen: S, params?: AppStackParamList[S]) => {
        stackNavigationRef.current?.navigate(screen, params);
    },
    goBack: () => {
        stackNavigationRef.current?.goBack();
    },
}

export interface NavigationProps<S extends AppScreens> {
    navigation: StackNavigationProp<AppStackParamList, S>,
    route: RouteProp<AppStackParamList, S>,
}