import React from 'react';
import {
    View,
} from 'react-native';
import algoliasearch from 'algoliasearch';
import {
    InstantSearch,
} from 'react-instantsearch-dom';
import SearchTools from './SearchTools';

function Search({ topHeight, spacing }) {

    const searchClient = algoliasearch('TVTQ31GSK6', 'ce820b76d62f5651835a4f93d7c62b05');

    return (
        <View>
            <InstantSearch
                searchClient={searchClient}
                indexName={"Search UserProfile"}>
                <SearchTools topHeight={topHeight} spacing={spacing} />
            </InstantSearch>
        </View>
    )
}

export default Search;