import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-web-webview';

function Privacy() {

    const htmlSource = require("../../landing/privacy.html");

    return (
        <WebView
            scalesPageToFit
            originWhitelist={['*']}
            style={{ flex: 1 }}
            source={{ html: htmlSource }} />
    )
}

export default Privacy;