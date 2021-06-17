import React from "react";
import {
    View,
    Image,
    TouchableOpacity,
    FlatList,
} from "react-native";
import AppContext from "../../data/AppContext";
import ThemeContext from "../../data/ThemeContext";
import RenderSeparator from "./RenderSeparator";
import FeedItem from "./FeedItem";

const renderSeparator = () => {
    return (
      <View
        style={{
          height: 0.4,
          width: "100%",
          backgroundColor: "#808080",
          opacity: 0.5,
          alignSelf: "flex-end",
        }}
      />
    );
  };
  
function UserPostsSection({
    navigation,
    userFeed,
    user,
    userData,
    isUser,
    flatListWidth,
    fullWidth,
    toggleRender }) {

    const theme = React.useContext(AppContext).theme;
    const colors = React.useContext(ThemeContext).colors[theme];
    const width = !isUser ? fullWidth : flatListWidth;

    return (
        <View
            style={{
                flex: !isUser ? 1 : 'auto',
                width: width,
                borderRadius: 9,
                backgroundColor: isUser ? colors.foreground4 : colors.background,
                overflow: "hidden",
                alignItems: "center",
                marginBottom: 60,
            }}
        >
            <FlatList
                data={userFeed}
                numColumns={(isUser ? 1 : 3)}
                renderItem={({ item }) => (isUser ?
                    /* <FeedItem
                        pfpSource={userData.pfpSource}
                        userName={user}
                        firstName={userData.firstName}
                        lastName={userData.lastName}
                        title={item.title}
                        timePosted={item.datePosted}
                        imageSource={item.imageSource}
                        likes={item.likes}
                        navigation={navigation}
                        key={item.datePosted}
                        width={width}
                    /> */ <View /> :
                    <TouchableOpacity style={{
                        width: width / 3,
                        height: width / 3,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                        onPress={() => {
                            // modal with the feed item
                            navigation.navigate('Feed Item', { height: fullHeight });
                        }}>
                        <View style={{
                            padding: 8,
                            width: 92,
                            height: 92,
                            borderRadius: 28,
                            overflow: 'hidden',
                            backgroundColor: 'white'
                        }}>
                            <Image style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'contain',
                            }}
                                source={item.imageSource} />
                        </View>
                    </TouchableOpacity>
                )}
                extraData={toggleRender}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={isUser && renderSeparator}
                //ItemSeparatorComponent={isUser && <RenderSeparator width={'100%'} />}
            />
        </View>
    )
}

export default UserPostsSection;