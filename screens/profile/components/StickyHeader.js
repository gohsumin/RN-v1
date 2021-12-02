import React from 'react';
import { View, TouchableOpacity, Text, Image, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import ProfileTop from './ProfileTop';

const StickyHeader = React.memo(props => {

    const window = useWindowDimensions();

    return (
        <TouchableOpacity style={{
            position: "absolute",
            width: "100%",
            height: props.isStickyHeaderExpanded ? props.topHeight : props.stickyHeaderHeight,
            top: 0,
            left: 0,
            paddingHorizontal: props.isStickyHeaderExpanded ? 0 : 15,
            opacity: props.opacity,
            shadowColor: "black",
            shadowRadius: 15,
        }}
            disabled={props.opacity < 0.6}
            onPress={() => {
                props.setIsStickyHeaderExpanded(!props.isStickyHeaderExpanded);
            }} >

            <LinearGradient
                style={{
                    position: "absolute",
                    width: "100%",
                    height: props.isStickyHeaderExpanded ? props.topHeight : props.stickyHeaderHeight,
                    top: 0,
                    left: 0,
                    opacity: props.opacity
                }}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                locations={[0, 0.08]}
                colors={['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0.2)']} />

            <BlurView style={{
                position: "absolute",
                width: "100%",
                height: props.isStickyHeaderExpanded ? props.topHeight : props.stickyHeaderHeight,
                top: 0,
                left: 0,
                opacity: props.opacity,
                // shadowColor: "black",
                // shadowRadius: 15,
            }}
                intensity={100 * props.opacity}
                tint={"dark"} />

            {props.isStickyHeaderExpanded ?
                <ProfileTop
                    setTopHeight={props.setTopHeight}
                    userData={props.userData}
                    isUser={props.isUser}
                    setUserData={props.setUserData}
                    navigate={props.navigate}
                /> :
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    height: props.stickyHeaderHeight,
                }} >

                    <View style={{
                        borderRadius: 5,
                        marginRight: 12,
                        overflow: "visible"
                    }} >
                        <Image style={{
                            height: props.stickyHeaderHeight * 0.75,
                            width: props.stickyHeaderHeight * 0.75,
                            borderRadius: 5,
                        }}
                            source={props.userData.userImageURL} />
                    </View>

                    <View style={{
                        height: "62%",
                        justifyContent: "space-between",
                    }} >
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center"
                        }} >
                            <Text style={{
                                fontWeight: "700",
                                letterSpacing: 0.1,
                                fontSize: 18,
                                color: props.colors.antiBackground,
                                marginBottom: 1.5,
                            }}
                            >
                                {props.userData.userName + " "}
                            </Text>
                            <MaterialIcons name="verified" size={18} color={'#4894e5'} />
                        </View>
                        <Text style={{
                            color: props.colors.foreground1,
                            fontSize: 13,
                        }} >
                            {props.userData.userDescription}
                        </Text>
                    </View>

                    {window.width > 615 && <View style={{
                        position: "absolute",
                        flexDirection: "row",
                        alignItems: "center",
                        height: "100%",
                        right: 0,
                    }} >
                        <Text style={{
                            color: props.colors.antiBackground,
                            fontSize: 17,
                            fontWeight: "500",
                            lineHeight: 17,
                            textAlign: "right",
                            marginRight: 10
                        }} >
                            {"Follow " + props.userData.userName + "\non the iOS app"}
                        </Text>
                        <Image
                            source={require("../../../assets/appStoreBadge.png")}
                            style={{
                                height: 45,
                                aspectRatio: 2.99,
                            }}
                            resizeMode={"contain"} />
                    </View>}
                </View>}
        </TouchableOpacity>
    )
}, (prevProps, newProps) => {
    return prevProps.isStickyHeaderExpanded == newProps.isStickyHeaderExpanded &&
        prevProps.opacity == newProps.opacity;
});

export default StickyHeader;