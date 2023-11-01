import React, {useState, useEffect} from 'react';
import {FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import NewsItem from '../../components/NewsItem';
import {actions as home} from '../../index';

const {getHeadlinesBySource} = home;

const Source = props => {
  const [refreshing, setRefreshing] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [articles, setArticles] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const source = props.source;

  useEffect(() => {
    getHeadlinesBySource(source.id)
      .then(({articles}) => setArticles(articles))
      .catch(error => setErrorMsg(error.message))
      .finally(() => {
        setRefreshing(false);
        setIsFetching(false);
      });
  }, [source]);

  const renderItem = ({item, index}) => {
    return <NewsItem article={item} />;
  };

  if (isFetching) {
    return <ActivityIndicator />;
  } else {
    return (
      <FlatList
        style={{backgroundColor: '#eaeaea'}}
        contentContainerStyle={{paddingVertical: 5}}
        data={articles}
        extraData={refreshing}
        renderItem={renderItem}
        initialNumToRender={5}
        keyExtractor={(item, index) => index.toString() + '_source'}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              getHeadlinesBySource(source.id)
                .then(({articles}) => setArticles(articles))
                .catch(error => setErrorMsg(error.message))
                .finally(() => setRefreshing(false));
            }}
          />
        }
      />
    );
  }
};

export default connect(null, {getHeadlinesBySource})(Source);
