import React, {FC} from 'react';
import {Movie} from '../interfaces/movieInterface';
import {FlatList, Text, View} from 'react-native';
import {MoviePoster} from './MoviePoster';
interface Props {
  title?: string;
  movies: Movie[];
}
export const HorizontalSlider: FC<Props> = ({title, movies}) => {
  return (
    <View style={{height: title ? 260 : 230}}>
      {title && (
        <Text style={{fontSize: 30, fontWeight: 'bold', marginLeft: 10}}>
          {title}
        </Text>
      )}
      <FlatList
        data={movies!}
        renderItem={({item}: any) => (
          <MoviePoster movie={item} width={140} height={200} />
        )}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
