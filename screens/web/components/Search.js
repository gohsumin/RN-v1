import React, { useState, useEffect } from 'react';
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
import Featured from './Featured';

function Search({ topHeight }) {

    const searchClient = algoliasearch('TVTQ31GSK6', 'ce820b76d62f5651835a4f93d7c62b05');
    const window = useWindowDimensions();

    const [keyword, setKeyword] = useState("");
    const [searchWord, setSearchWord] = useState("");

    const hitHeight = 60;
    const searchBoxHeight = 50;
    const hitsPerPageHeight = 35;
    const paddingHorizontal = 15;

    function getFeedHeight(windowHeight) {
        return windowHeight < 730 ?
            730 - topHeight - hitsPerPageHeight - searchBoxHeight :
            windowHeight - topHeight - hitsPerPageHeight - searchBoxHeight;
    }

    function getFullWidth(windowWidth) {
        return windowWidth < 550 ?
            windowWidth * 0.9 :
            windowWidth < 850 ?
                windowWidth * 0.8 :
                windowWidth * 0.6;
    }

    const SearchBox = React.memo(({ currentRefinement, isSearchStalled, refine }) => (
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            width: getFullWidth(window.width),
            height: searchBoxHeight,
            paddingHorizontal: paddingHorizontal,
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
                    fontSize: 14.5,
                    fontWeight: "400",
                    color: "#aaa",
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
                    setSearchWord(keyword);
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
                width: getFullWidth(window.width),
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
            // alignItems: "center",
            // borderWidth: 1,
            // borderColor: "white",
        }}>
            <InstantSearch
                searchClient={searchClient}
                indexName={"Search UserProfile"}>
                {/* <Configure hitsPerPage={8} /> */}
                <CustomSearchBox />
                {searchWord !== "" && <CustomHitsPerPage
                    defaultRefinement={10}
                    items={[
                        { value: 10, label: '10' },
                    ]}
                    hitsPerPageHeight={hitsPerPageHeight} />}
                {searchWord === "" ?
                    <Featured
                        height={getFeedHeight(window.height)}
                        width={getFullWidth(window.width)}
                    />
                    : <ScrollView
                        persistentScrollbar={false}
                        style={{
                            height: getFeedHeight(window.height),
                            // overflow: "visible",
                            // borderWidth: 1,
                            // borderColor: "red",
                        }}>
                        <CustomHits />
                    </ScrollView>}
            </InstantSearch>
        </View>
    )
}

export default Search;