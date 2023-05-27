import React from 'react';
import {ActivityIndicator, Dimensions, ScrollView, View} from 'react-native';
import {useMovie} from '../hooks/useMovie';
import Carousel from 'react-native-snap-carousel';
import {HorizontalSlider, MoviePoster} from '../components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width: widthWindow} = Dimensions.get('window');

export const HomeScreen = () => {
  const {nowPlaying, popular, topRated, upcoming, isLoading} = useMovie();
  const {top} = useSafeAreaInsets();
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={{marginTop: top + 20}}>
        {/* <MoviePoster movie={movies![0]} />
         */}
        <View style={{height: 440}}>
          <Carousel
            data={nowPlaying!}
            renderItem={({item}: any) => <MoviePoster movie={item} />}
            sliderWidth={widthWindow}
            itemWidth={300}
            inactiveSlideOpacity={0.9}
          />
        </View>

        <HorizontalSlider title="Popular" movies={popular!} />
        <HorizontalSlider title="Top Rated" movies={topRated!} />
        <HorizontalSlider title="Upcoming" movies={upcoming!} />
      </View>
    </ScrollView>
  );
};
