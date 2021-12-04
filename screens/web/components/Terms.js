import React from 'react';
import { View, Platform } from 'react-native';
import { WebView } from 'react-native-web-webview';

function Terms() {

    const htmlSource = require("../../landing/terms.html");

    return (
        <WebView
            scalesPageToFit
            originWhitelist={['*']}
            style={{ flex: 1 }}
            source={{ html: htmlSource }} />
    )
}

export default Terms;