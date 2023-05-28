import React, {useCallback, useContext} from 'react';
import {ActivityIndicator, Dimensions, ScrollView, View} from 'react-native';
import {useMovie} from '../hooks/useMovie';
import Carousel from 'react-native-snap-carousel';
import {HorizontalSlider, MoviePoster} from '../components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GradientBackground} from '../components/GradientBackground';
import {getImageColors} from '../helpers/getImageColors';
import {GradientContext} from '../context';
import {useEffect} from 'react';

const {width: widthWindow} = Dimensions.get('window');

export const HomeScreen = () => {
  const {nowPlaying, popular, topRated, upcoming, isLoading} = useMovie();
  const {top} = useSafeAreaInsets();
  const {setMainColors} = useContext(GradientContext);

  const getPosterColors = useCallback(
    async (index: number) => {
      const movie = nowPlaying[index];
      const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      const [primary = 'green', secondary = 'orange'] = await getImageColors(
        uri,
      );
      setMainColors({primary, secondary});
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nowPlaying],
  );

  useEffect(() => {
    if (nowPlaying?.length > 0) {
      getPosterColors(0).catch(console.warn);
    }
  }, [nowPlaying, getPosterColors]);

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
    <GradientBackground>
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
              onSnapToItem={index => getPosterColors(index)}
            />
          </View>

          <HorizontalSlider title="Popular" movies={popular!} />
          <HorizontalSlider title="Top Rated" movies={topRated!} />
          <HorizontalSlider title="Upcoming" movies={upcoming!} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};
