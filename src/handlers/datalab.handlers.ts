// Declare Node.js globals for this file
declare const require: any;
declare const process: any;
declare const fs: any;
declare const path: any;

import { NaverSearchClient } from "../clients/naver-search.client.js";
import {
  DatalabSearch,
  DatalabShopping,
  DatalabShoppingDevice,
  DatalabShoppingGender,
  DatalabShoppingAge,
  DatalabShoppingKeywords,
  DatalabShoppingKeywordDevice,
  DatalabShoppingKeywordGender,
  DatalabShoppingKeywordAge,
} from "../schemas/datalab.schemas.js";
import {
  DatalabSearchRequest,
  DatalabShoppingCategoryRequest,
  DatalabShoppingKeywordsRequest,
} from "../types/datalab.types.js";

// 클라이언트 인스턴스 팩토리
function getClient(): NaverSearchClient {
  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    throw new Error('NAVER_CLIENT_ID and NAVER_CLIENT_SECRET must be set');
  }

  const client = new NaverSearchClient();
  client.initialize({
    clientId,
    clientSecret,
  });
  
  return client;
}

/**
 * 데이터랩 도구 핸들러 맵
 * 각 도구 이름을 키로, 실행할 핸들러 함수를 값으로 가짐
 * index.ts에서 도구 실행 분기 없이 바로 사용
 */
export const datalabToolHandlers: Record<string, (args: any) => Promise<any>> =
  {
    datalab_search: (args) => {
      console.error("datalab_search called with args:", JSON.stringify(args, null, 2));
      return handleSearchTrend(args);
    },
    datalab_shopping_category: (args) => {
      console.error("datalab_shopping_category called with args:", JSON.stringify(args, null, 2));
      return handleShoppingCategoryTrend(args);
    },
    datalab_shopping_by_device: (args) => {
      console.error("datalab_shopping_by_device called with args:", JSON.stringify(args, null, 2));
      return handleShoppingByDeviceTrend(args);
    },
    datalab_shopping_by_gender: (args) => {
      console.error("datalab_shopping_by_gender called with args:", JSON.stringify(args, null, 2));
      return handleShoppingByGenderTrend(args);
    },
    datalab_shopping_by_age: (args) => {
      console.error("datalab_shopping_by_age called with args:", JSON.stringify(args, null, 2));
      return handleShoppingByAgeTrend(args);
    },
    datalab_shopping_keywords: (args) => {
      console.error("datalab_shopping_keywords called with args:", JSON.stringify(args, null, 2));
      return handleShoppingKeywordsTrend(args);
    },
    datalab_shopping_keyword_by_device: (args) => {
      console.error("datalab_shopping_keyword_by_device called with args:", JSON.stringify(args, null, 2));
      return handleShoppingKeywordByDeviceTrend(args);
    },
    datalab_shopping_keyword_by_gender: (args) => {
      console.error("datalab_shopping_keyword_by_gender called with args:", JSON.stringify(args, null, 2));
      return handleShoppingKeywordByGenderTrend(args);
    },
    datalab_shopping_keyword_by_age: (args) => {
      console.error("datalab_shopping_keyword_by_age called with args:", JSON.stringify(args, null, 2));
      return handleShoppingKeywordByAgeTrend(args);
    },
  };

/**
 * 검색어 트렌드 핸들러
 * 네이버 데이터랩 검색어 트렌드 분석 API 호출
 * @param params DatalabSearch
 */
export async function handleSearchTrend(params: DatalabSearch) {
  const client = getClient();
  return client.searchTrend(params as DatalabSearchRequest);
}

/**
 * 쇼핑 카테고리별 트렌드 핸들러
 * 네이버 데이터랩 쇼핑 카테고리 트렌드 분석 API 호출
 * @param params DatalabShopping
 */
export async function handleShoppingCategoryTrend(params: DatalabShopping) {
  const client = getClient();
  return client.datalabShoppingCategory(params as DatalabShoppingCategoryRequest);
}

/**
 * 쇼핑 기기별 트렌드 핸들러
 * 네이버 데이터랩 쇼핑 기기별 트렌드 분석 API 호출
 * @param params DatalabShoppingDevice
 */
export async function handleShoppingByDeviceTrend(
  params: DatalabShoppingDevice
) {
  const client = getClient();
  return client.datalabShoppingByDevice({
    startDate: params.startDate,
    endDate: params.endDate,
    timeUnit: params.timeUnit,
    category: params.category,
    device: params.device,
  });
}

/**
 * 쇼핑 성별 트렌드 핸들러
 * 네이버 데이터랩 쇼핑 성별 트렌드 분석 API 호출
 * @param params DatalabShoppingGender
 */
export async function handleShoppingByGenderTrend(
  params: DatalabShoppingGender
) {
  const client = getClient();
  return client.datalabShoppingByGender({
    startDate: params.startDate,
    endDate: params.endDate,
    timeUnit: params.timeUnit,
    category: params.category,
    gender: params.gender,
  });
}

/**
 * 쇼핑 연령대별 트렌드 핸들러
 * 네이버 데이터랩 쇼핑 연령대별 트렌드 분석 API 호출
 * @param params DatalabShoppingAge
 */
export async function handleShoppingByAgeTrend(params: DatalabShoppingAge) {
  const client = getClient();
  return client.datalabShoppingByAge({
    startDate: params.startDate,
    endDate: params.endDate,
    timeUnit: params.timeUnit,
    category: params.category,
    ages: params.ages,
  });
}

/**
 * 쇼핑 키워드 트렌드 핸들러
 * 네이버 데이터랩 쇼핑 키워드 트렌드 분석 API 호출
 * @param params DatalabShoppingKeywords
 */
export async function handleShoppingKeywordsTrend(
  params: DatalabShoppingKeywords
) {
  // 키워드 배열을 네이버 API에 맞는 형식으로 변환
  const client = getClient();
  return client.datalabShoppingKeywords({
    startDate: params.startDate,
    endDate: params.endDate,
    timeUnit: params.timeUnit,
    category: params.category,
    keyword: params.keyword as DatalabShoppingKeywordsRequest['keyword'],
  });
}

/**
 * 쇼핑 키워드 기기별 트렌드 핸들러
 * 네이버 데이터랩 쇼핑 키워드 기기별 트렌드 분석 API 호출
 * @param params DatalabShoppingKeywordDevice
 */
export async function handleShoppingKeywordByDeviceTrend(
  params: DatalabShoppingKeywordDevice
) {
  const client = getClient();
  return client.datalabShoppingKeywordByDevice({
    startDate: params.startDate,
    endDate: params.endDate,
    timeUnit: params.timeUnit,
    category: params.category,
    keyword: params.keyword,
    device: params.device,
  });
}

/**
 * 쇼핑 키워드 성별 트렌드 핸들러
 * 네이버 데이터랩 쇼핑 키워드 성별 트렌드 분석 API 호출
 * @param params DatalabShoppingKeywordGender
 */
export async function handleShoppingKeywordByGenderTrend(
  params: DatalabShoppingKeywordGender
) {
  const client = getClient();
  return client.datalabShoppingKeywordByGender({
    startDate: params.startDate,
    endDate: params.endDate,
    timeUnit: params.timeUnit,
    category: params.category,
    keyword: params.keyword,
    gender: params.gender,
  });
}

/**
 * 쇼핑 키워드 연령별 트렌드 핸들러
 * 네이버 데이터랩 쇼핑 키워드 연령별 트렌드 분석 API 호출
 * @param params DatalabShoppingKeywordAge
 */
export async function handleShoppingKeywordByAgeTrend(
  params: DatalabShoppingKeywordAge
) {
  const client = getClient();
  return client.datalabShoppingKeywordByAge({
    startDate: params.startDate,
    endDate: params.endDate,
    timeUnit: params.timeUnit,
    category: params.category,
    keyword: params.keyword,
    ages: params.ages,
  });
}