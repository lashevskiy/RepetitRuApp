import React from 'react';
import { BackHandler, Platform, StyleSheet, } from 'react-native';
import Constants from 'expo-constants';
import { WebView } from 'react-native-webview';

export default class App extends React.Component {
    WEBVIEW_REF = React.createRef();

    state = {
        canGoBack: false,
    };

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        if (this.state.canGoBack) {
            this.WEBVIEW_REF.current.goBack();
            return true;
        }
    };

    onNavigationStateChange = (navState) => {
        this.setState({
            canGoBack: navState.canGoBack,
        });
    };

    render() {
        return (
            <WebView
                source={{ uri: 'https://lashevskiy.github.io/RepetitRu/?&expo_app=true&v=11' }}
                ref={this.WEBVIEW_REF}
                onNavigationStateChange={this.onNavigationStateChange}
                style={styles.container}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
    },
});
