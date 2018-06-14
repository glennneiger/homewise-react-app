import React, { Component } from 'react';
import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	StyleSheet,
	View,
} from 'react-native';

import { StorageKeys } from './AppConfig.js';

class AuthLoadingScreen extends Component {
	constructor(props) {
		super(props);
		this._bootstrapAsync();
	}

	_bootstrapAsync = async () => {
	    // Check Auth state
	    let isAuth = false;
		const authToken = await AsyncStorage.getItem(StorageKeys.authToken);
		const authExpiry = await AsyncStorage.getItem(StorageKeys.authExpiry);
		if(authToken !== null) {
			// Check validity
			let time_now = new Date();
			let time_expires = new Date(authExpiry);
			if(authExpiry !== null && time_now < time_expires) {
	  			// Valid, unexpired token
	  			isAuth = true;
			}
		}
		this.props.navigation.navigate(isAuth ? 'App' : 'Auth');

	}

	render() {
		return (
			<View style={{flex:1}}>
				<ActivityIndicator />
				<StatusBar barStyle="default" />
			</View>
		)
	}
}

export default AuthLoadingScreen