/**
 * Korean time response interface
 */
export interface KoreanTimeResponse {
  current_korean_time: {
    iso_string: string;
    korean_date: string;
    korean_time: string;
    formatted: string;
    timezone: string;
    timestamp: number;
  };
}