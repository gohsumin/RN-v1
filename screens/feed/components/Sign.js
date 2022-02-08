import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { diff } from 'react-native-reanimated';
import AppContext from '../../../data/AppContext';
import ThemeContext from '../../../data/ThemeContext';

function Sign({ nextDrop, dateReached }) {

    const [timeLeft, setTimeLeft] = useState(null);
    const { theme } = useContext(AppContext);
    const colors = useContext(ThemeContext).colors[theme];

    useEffect(() => {
        const timer = setTimeout(() => {

            const now = new Date();
            let n = Math.floor((nextDrop.getTime() - now.getTime()) / 1000);
            const days = parseInt(n / (24 * 3600));
            n = n % (24 * 3600);
            const hours = parseInt(n / 3600);
            n %= 3600;
            const minutes = parseInt(n / 60);
            n %= 60;
            const seconds = n;
            const timeLeft = {
                days: days,
                hours: hours,
                minutes: minutes,
                seconds: seconds,
            };
            const tl = timeLeft;
            if (tl.days <= 0 && tl.hours <= 0 && tl.minutes <= 0 && tl.seconds <= 0) {
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                });
                // the nextDrop prop should update automatically after this
                dateReached();
            }
            else {
                setTimeLeft(tl);
            }
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <View style={{
            marginTop: 60,
            width: "90%",
            height: 137,
            padding: 5,
            borderRadius: 15,
            backgroundColor: colors.signGreen
        }}>
            {(timeLeft != null) && <View style={{
                width: "100%",
                height: "100%",
                paddingHorizontal: 18,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 10,
                borderWidth: 6,
                backgroundColor: colors.signGreen
            }}>
                <Text style={{
                    fontSize: 25.7,
                    fontWeight: "bold",
                }} >
                    {`NEXT DROP in\n${timeLeft.days} Day${timeLeft.days === 1 ? "" : "s"}\n${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
                </Text>
                <Image style={{
                    width: 73,
                    height: 73,
                    marginTop: 3,
                    // borderWidth:1,borderColor:"blue"
                }} resizeMode="contain"
                    source={require("../../../assets/rightDown.png")}
                    fadeDuration={0} />
            </View>}
        </View>
    )
}

function areEqual(prevProps, newProps) {
    return prevProps.nextDrop.getTime() === newProps.nextDrop.getTime();
}

export default React.memo(Sign, areEqual);