import { useRecoilState } from 'recoil';
import * as SecureStore from 'expo-secure-store';
import * as Analytics from 'expo-firebase-analytics';

// logics
import { characterListState } from '../atoms';
import useCharacter from './useCharacter';
import { getMyCharacterListAsync } from '../server/User';
import { getCurrentCharacterAsync } from '../server/Character';

// utils
import { MyCharacter } from '../../utils/types/UserTypes';

/**
 * 캐릭터 정보를 불러오고 전역에 반영하는 함수를 제공하는 custom hook
 * ! 기본적으로 캐릭터 새로고침 함수만 사용하면 캐릭터 리스트도 새로고침되므로, 캐릭터 리스트 새로고침 함수는 리스트만 건드릴 때 사용
 * @returns [캐릭터 새로고침 함수, 캐릭터 리스트 새로고침 함수]
 * * const [loadCharacter, loadCharacterList] = useLoadCharacter()와 같이 사용
 */
export default function useLoadCharacter(): [
  () => Promise<void>,
  () => Promise<Array<MyCharacter> | undefined>,
] {
  const [, setCharacter] = useCharacter();
  const [characterList, setCharacterList] = useRecoilState(characterListState);

  /**
   * 캐릭터를 선택하는 함수
   * @description 캐릭터 리스트에서 마지막으로 선택한 캐릭터를 선택 / 마지막으로 선택한 캐릭터 정보가 없으면 첫번째 캐릭터 선택
   */
  async function loadCharacter(): Promise<void> {
    let tmpCharacterList = characterList;

    // 캐릭터 리스트 최신화 시도
    const loadedCharacterList = await loadCharacterList();
    if (loadedCharacterList) tmpCharacterList = loadedCharacterList;

    // 현재 캐릭터의 id 저장
    let currentCharacterId: number | undefined;
    const characterResult = await getCurrentCharacterAsync();
    if (characterResult.isSuccess) {
      currentCharacterId = characterResult.result;
    }

    // 마지막으로 선택한 캐릭터 이름 정보가 있는지 확인
    const lastCharacterId = await SecureStore.getItemAsync('lastCharacterId');

    function findCharacterById(characterId: number): MyCharacter | undefined {
      if (tmpCharacterList.length > 0) {
        let tmpCharacter = tmpCharacterList[0];
        let isUpdated = false;
        for (let i = 0; i < tmpCharacterList.length; i += 1) {
          if (tmpCharacterList[i].id === characterId) {
            tmpCharacter = tmpCharacterList[i];
            isUpdated = true;
            break;
          }
        }
        // 찾은 경우에만 반환
        if (isUpdated) return tmpCharacter;
      }
      // 찾지 못했거나 리스트가 비어 있는 경우 undefined 반환
      return undefined;
    }

    if (lastCharacterId) {
      const realLastCharacterId = Number(lastCharacterId);
      // 마지막으로 선택한 캐릭터를 캐릭터 리스트에서 찾아 선택
      const realCharacter = findCharacterById(realLastCharacterId);
      if (realCharacter) {
        await setCharacter(realCharacter);
        return;
      }
    }

    if (currentCharacterId) {
      const realCharacter = findCharacterById(currentCharacterId);
      if (realCharacter) {
        await setCharacter(realCharacter);
        return;
      }
    }

    if (tmpCharacterList.length > 0) {
      await setCharacter(tmpCharacterList[0]);
    }

    // 캐릭터 리스트가 비어 있으면 캐릭터 선택되지 않음
  }

  /**
   * 캐릭터 목록을 불러와 저장하는 함수
   */
  async function loadCharacterList(): Promise<Array<MyCharacter> | undefined> {
    const result = await getMyCharacterListAsync();
    if (result.isSuccess) {
      setCharacterList(result.result);
      await Analytics.setUserProperty(
        'num_of_character',
        `${result.result.length}`,
      );
      // setState가 바로 적용되지 않는 경우를 방지하기 위해 최신값 반환
      return result.result;
    }
    // 빈 배열인 경우와 요청이 실패한 경우 구별
    return undefined;
  }

  return [loadCharacter, loadCharacterList];
}
