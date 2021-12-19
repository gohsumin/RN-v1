import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";

function Input({ initialText, type, plsReturn, setData }) {

    const [text, setText] = useState(initialText);

    return (
        <TextInput
            value={text}
            onChangeText={setText}
            onBlur={() => {
                let obj = {};
                obj[type] = text;
                setData(obj);
            }}
            style={{
                flex: 1,
                fontSize: 14,
                marginRight: 30,
                borderBottomWidth: 0.1,
                outline: 'none',
                borderColor: "#ccc"
            }}
        />
    )
}

export default Input;