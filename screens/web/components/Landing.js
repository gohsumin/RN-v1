import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLinkTo } from '@react-navigation/native';

function Landing() {

    const linkTo = useLinkTo();
    const htmlSource = require("../../landing/index.html");
    const jscode = `
        document.getElementById("enter-sosh-button").addEventListener("click", function() {
            if (window.ReactNativeWebView) {
                window.ReactNativeWebWebView.postMessage("go");
            }
            else {
                window.location.href = "https://soshworld.com/Home";
            }
        });
    `;
    const htmlString = `${htmlSource}`.replace("</body>", `<script>${jscode}</script></body>`);

    return (
        <View style={{ flex: 1 }} >
            <WebView
                injectedJavascript={jscode}
                scalesPageToFit
                onMessage={(event) => {
                    const res = JSON.parse(event.nativeEvent.data);
                    alert(res);
                    if (res.message === 'go') {
                        linkTo("/Home");
                    }
                }}
                originWhitelist={['*']}
                domStorageEnabled={true}
                javascriptEnabled={true}
                style={{ flex: 1 }}
                source={{ html: `${htmlString}` }} />
        </View>
    )
}

export default Landing;