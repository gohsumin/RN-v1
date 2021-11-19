import React, { useState } from 'react';
import {
    View,
    TextInput,
    useWindowDimensions,
    ScrollView,
} from 'react-native';
import algoliasearch from 'algoliasearch';
import {
    connectSearchBox,
    InstantSearch,
    connectHitsPerPage,
    connectHits,
    Configure
} from 'react-instantsearch-dom';
import { EvilIcons } from '@expo/vector-icons';
import Hit from './Hit';
import HitsPerPage from './HitsPerPage';

function Search({ topHeight }) {

    const searchClient = algoliasearch('TVTQ31GSK6', 'ce820b76d62f5651835a4f93d7c62b05');
    const window = useWindowDimensions();

    const [keyword, setKeyword] = useState("");

    const hitHeight = 60;

    const SearchBox = React.memo(({ currentRefinement, isSearchStalled, refine }) => (
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            width: window.width < 500 ? window.width * 0.9 : window.width * 0.6,
            height: 50,
            paddingHorizontal: 15,
            backgroundColor: "#181818",
            borderRadius: 25,
            // borderWidth: 1,
            // borderBottomWidth: 0.5,
            // borderColor: 'gray', //'#a3d694',
            shadowColor: "black",
            shadowOffset: { width: 2, height: 2 },
            shadowRadius: 7,
        }}>
            <EvilIcons
                style={{
                    marginRight: 7,
                }}
                name="search"
                size={24}
                color="gray" />
            <TextInput
                style={{
                    fontSize: 14,
                    color: "white",
                    outlineStyle: 'none',
                    outlineWidth: 0.1,
                    flexGrow: 1,
                }}
                placeholder={"Search by name or insta/twitter id"}
                value={keyword}
                onChangeText={val => {
                    setKeyword(val);
                }}
                autoFocus={true}
                onSubmitEditing={() => {
                    refine(keyword);
                }}
            />
        </View>
    ));

    const CustomSearchBox = connectSearchBox(SearchBox);

    const hitsAreEqual = (prevProps, nextProps) => {
        if (prevProps.hits.length !== nextProps.hits.length) {
            return false;
        }
        let i;
        for (i = 0; i < prevProps.hits.length; i++) {
            if (prevProps.hits[i].objectID !== nextProps.hits[i].objectID) {
                return false;
            }
        }
        return true;
    }

    const Hits = React.memo(({ hits }) => {
        return (
            <View style={{
                flex: 1,
                width: window.width < 500 ? window.width * 0.9 : window.width * 0.6,
                // borderWidth: 0.1,
                // borderColor: 'salmon'
            }}>
                {hits.map((hit) => {
                    return <Hit key={hit.objectID} hitHeight={hitHeight} hit={hit} />
                })}
            </View>
        )
    }, hitsAreEqual);

    const CustomHits = connectHits(Hits);

    const CustomHitsPerPage = connectHitsPerPage(HitsPerPage);

    return (
        <View style={{
            // borderWidth: 1,
            // borderColor: "white",
        }}>
            <InstantSearch
                searchClient={searchClient}
                indexName={"Search UserProfile"}>
                {/* <Configure hitsPerPage={8} /> */}
                <CustomSearchBox />
                <CustomHitsPerPage
                    defaultRefinement={10}
                    items={[
                        { value: 10, label: '10' },
                      ]} />
                <ScrollView
                    persistentScrollbar={false}
                    style={{
                        height: window.height - topHeight - hitHeight,
                        // overflow: "visible",
                        // borderWidth: 1,
                        // borderColor: "red",
                    }}>
                    <CustomHits />
                </ScrollView>
            </InstantSearch>
        </View>
    )
}

export default Search;