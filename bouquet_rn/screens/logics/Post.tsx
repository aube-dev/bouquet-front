import { serverAddress } from './ServerInfos';
import * as SecureStore from 'expo-secure-store';
import { Character } from '../../utils/types';

// Template Request Types

export interface PostRequestInterface {
  characterId: number,
  template: string,
  text?: string,
}

export interface ImagePostRequestInterface extends PostRequestInterface {
  img: string,
}

export interface DiaryPostRequestInterface extends PostRequestInterface {
  title: string,
  weather: string,
  img: string,
  date: number,
  content: string,
}

export interface AlbumPostRequestInterface extends PostRequestInterface {
  description: string,
  title: string,
  img: string,
  releaseDate: number,
  tracks: Array<{ title: string, lyric: string }>,
}

export interface ListPostRequestInterface extends PostRequestInterface {
  title: string,
  content: string,
  components: Array<{ title: string, img: string, content: string }>,
}

// POST
export async function PostAsync<T extends PostRequestInterface>(body: T) {
  function getTemplate() {
    switch (body.template) {
      case "None": return "/";
      case "Image": return "/img";
      case "Diary": return "/diary";
      case "Album": return "/album";
      case "List": return "/list";
      default: return "/";
    }
  }
  const auth = await SecureStore.getItemAsync('auth');
  if (auth) {
    const templateInfo = getTemplate();
    try {
      let response = await fetch(serverAddress + "/post" + templateInfo, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Authorization': auth,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      let result = await response.json();
      console.log(result);

      if (response.status === 200) {
        return result;
      }
      else return "문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.";
    }
    catch (err) {
      console.log("error: " + err);
      return "서버와 연결할 수 없어요. 다시 시도해 보거나, 문의해 주세요.";
    }
  }
  else return "로그인되어 있지 않아요.";
}