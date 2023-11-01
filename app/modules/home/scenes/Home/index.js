import React, { useState, useEffect } from 'react';
import { FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import NewsItem from "../../components/NewsItem";
import { actions as home } from "../../index";

const { getNewsHeadlines } = home;

const Home = (props) => {
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getNewsHeadlines(false);
    }, []);

    const getNewsHeadlines = (refreshing = true) => {
        setRefreshing(refreshing);
        props.getNewsHeadlines()
            .finally(() => setRefreshing(false));
    }

    const renderItem = ({ item, index }) => {
        return <NewsItem article={item} />;
    }

    const { articles, isFetching, hasError, errorMsg } = props;

    if (isFetching) {
        return <ActivityIndicator />;
    } else {
        return (
            <FlatList
                style={{ backgroundColor: '#eaeaea' }}
                contentContainerStyle={{ paddingVertical: 5 }}
                ref='listRef'
                data={articles}
                extraData={refreshing}
                renderItem={renderItem}
                initialNumToRender={5}
                keyExtractor={(item, index) => index.toString() + "_home"}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={getNewsHeadlines}
                    />
                }
            />
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        isFetching: state.homeReducer.isFetching,
        hasError: state.homeReducer.hasError,
        errorMsg: state.homeReducer.errorMsg,
        articles: state.homeReducer.articles
    }
}

export default connect(mapStateToProps, { getNewsHeadlines })(Home);
