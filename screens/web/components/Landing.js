import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-web-webview';

function Landing() {

    const htmlSource = require("../../landing/index.html");

    return (
        <WebView
            scalesPageToFit
            originWhitelist={['*']}
            javascriptEnabled="true"
            style={{ flex: 1 }}
            source={{ html: htmlSource }} />
    )
}

export default Landing;