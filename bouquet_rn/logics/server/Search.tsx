import * as SecureStore from 'expo-secure-store';

// logics
import * as APIs from './APIUtils';

// utils
import { CharacterMini } from '../../utils/types/UserTypes';
import { Post, AllTemplates } from '../../utils/types/PostTypes';

/**
 * 인기 캐릭터 목록을 서버에서 불러오는 함수
 * @returns -{result: CharacterMini 리스트, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function getTopCharacterListAsync(): APIs.ServerResult<
  Array<CharacterMini>
> {
  // 서버 응답 타입 정의
  type GetTopCharacterListAsyncOutput = {
    characters: Array<CharacterMini>;
  };

  const tmpResult = await APIs.getAsync<GetTopCharacterListAsyncOutput>(
    '/search/top-characters',
    false,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : CharacterMini List 반환
  if (APIs.isSuccess<GetTopCharacterListAsyncOutput>(result, response)) {
    return { result: result.characters, isSuccess: true };
  }

  // 나머지 에러
  return {
    result: {
      statusCode: response.status,
      errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
      info: response,
    },
    isSuccess: false,
  };
}

/**
 * 인기 게시글 목록을 서버에서 불러오는 함수
 * @param pageNum 불러올 페이지
 * ! 페이지 번호는 1부터 시작
 *
 * @returns -{result: Post 리스트, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function getTopPostListAsync(
  pageNum: number,
): APIs.ServerResult<Array<Post<AllTemplates>>> {
  // 서버 응답 타입 정의
  type GetTopPostListAsyncOutput = {
    posts: Array<Post<AllTemplates>>;
  };

  const auth = await SecureStore.getItemAsync('auth');

  const header: Record<string, any> = { 'page-num': pageNum };
  if (auth) header.token = auth;

  const tmpResult = await APIs.getAsync<GetTopPostListAsyncOutput>(
    '/search/top-posts',
    false,
    header,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : Post List 반환
  if (APIs.isSuccess<GetTopPostListAsyncOutput>(result, response)) {
    return { result: result.posts, isSuccess: true };
  }

  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError422>(result, response, 422)) {
    return {
      result: {
        statusCode: 422,
        errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
        info: result.detail,
      },
      isSuccess: false,
    };
  }
  // 나머지 에러
  return {
    result: {
      statusCode: response.status,
      errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
      info: response,
    },
    isSuccess: false,
  };
}

/**
 * 게시글을 검색하는 함수
 * @param searchWord 검색어
 * @param pageNum 검색 결과 페이지 번호
 * @returns -{result: 게시글 리스트, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function searchPostAsync(
  searchWord: string,
  pageNum: number,
): APIs.ServerResult<Array<Post<AllTemplates>>> {
  // 서버 응답 타입 정의
  type SearchPostAsyncOutput = { posts: Array<Post<AllTemplates>> };

  const auth = await SecureStore.getItemAsync('auth');

  const header: Record<string, any> = { 'page-num': pageNum };
  if (auth) header.token = auth;

  const tmpResult = await APIs.getAsync<SearchPostAsyncOutput>(
    `/search/posts?q=${searchWord}`,
    false,
    header,
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : 게시글 리스트 반환
  if (APIs.isSuccess<SearchPostAsyncOutput>(result, response)) {
    return { result: result.posts, isSuccess: true };
  }

  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError422>(result, response, 422)) {
    return {
      result: {
        statusCode: 422,
        errorMsg:
          '검색 정보가 잘못되었어요. 다시 시도해 보거나, 문의해 주세요.',
        info: result.detail,
      },
      isSuccess: false,
    };
  }
  // 나머지 에러
  return {
    result: {
      statusCode: response.status,
      errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
      info: response,
    },
    isSuccess: false,
  };
}

/**
 * 캐릭터를 검색하는 함수
 * @param searchWord 검색어
 * @param pageNum 검색 결과 페이지 번호
 * @returns -{result: 캐릭터 리스트, isSuccess: true} 또는 {result: 에러 객체, isSuccess: false}
 */
export async function searchCharacterAsync(
  searchWord: string,
  pageNum: number,
): APIs.ServerResult<Array<CharacterMini>> {
  // 서버 응답 타입 정의
  type SearchCharacterAsyncOutput = { characters: Array<CharacterMini> };

  const tmpResult = await APIs.getAsync<SearchCharacterAsyncOutput>(
    `/search/characters?q=${searchWord}`,
    false,
    { 'page-num': pageNum },
  );

  // 사전 처리된 에러는 바로 반환
  if (APIs.isServerErrorOutput(tmpResult)) {
    return { result: tmpResult, isSuccess: false };
  }

  const [result, response] = tmpResult;

  // 요청 성공 : CharacterMini 리스트 반환
  if (APIs.isSuccess<SearchCharacterAsyncOutput>(result, response)) {
    return { result: result.characters, isSuccess: true };
  }

  // 422 : Validation Error
  if (APIs.isError<APIs.ServerError422>(result, response, 422)) {
    return {
      result: {
        statusCode: 422,
        errorMsg:
          '검색 정보가 잘못되었어요. 다시 시도해 보거나, 문의해 주세요.',
        info: result.detail,
      },
      isSuccess: false,
    };
  }
  // 나머지 에러
  return {
    result: {
      statusCode: response.status,
      errorMsg: '문제가 발생했어요. 다시 시도해 보거나, 문의해 주세요.',
      info: response,
    },
    isSuccess: false,
  };
}
