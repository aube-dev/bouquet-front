import React from 'react';
import { Animated, FlatList } from 'react-native';
import i18n from 'i18n-js';

// styles
import colors from '../../../styles/colors';
import * as text from '../../../styles/styled-components/text';

// logics
import useUser from '../../../logics/hooks/useUser';

// utils
import { CharacterMini } from '../../../utils/types/UserTypes';

// components
import CharacterItem from '../../../components/item/CharacterItem';

type SearchCharacterViewProps = {
  searchInput: string;
  characterArray: CharacterMini[];
  onEndReached: () => Promise<void>;
};
export default function SearchCharacterView({
  searchInput,
  characterArray,
  onEndReached,
}: SearchCharacterViewProps): React.ReactElement {
  const user = useUser();
  return (
    <>
      {characterArray.length > 0 ? (
        <Animated.View
          style={{
            marginTop: searchInput.length > 0 || user.name === '' ? 0 : 40,
            marginLeft: 30,
          }}
        >
          <text.Subtitle3 textColor={colors.black}>
            {searchInput.length > 0 ? '캐릭터' : i18n.t('인기 부캐')}
          </text.Subtitle3>
          <FlatList
            style={{ marginTop: 12 }}
            data={characterArray}
            keyboardShouldPersistTaps="handled"
            keyExtractor={(item, idx) => item.name}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={(obj) => (
              <CharacterItem characterInfo={obj.item} routePrefix="SearchTab" />
            )}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.8}
          />
        </Animated.View>
      ) : null}
    </>
  );
}
