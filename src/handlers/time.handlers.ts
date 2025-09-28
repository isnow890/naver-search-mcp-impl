import { GetKoreanTimeArgs } from "../schemas/time.schemas.js";
import { KoreanTimeResponse } from "../types/time.types.js";

/**
 * Get current Korean time (KST/UTC+9)
 * @param args - No arguments required
 * @returns Current Korean time in multiple formats
 */
export async function getCurrentKoreanTime(
  args: GetKoreanTimeArgs
): Promise<KoreanTimeResponse> {
  const now = new Date();
  const koreanTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Seoul"}));
  
  return {
    current_korean_time: {
      iso_string: koreanTime.toISOString(),
      korean_date: koreanTime.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long", 
        day: "numeric",
        weekday: "long"
      }),
      korean_time: koreanTime.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      }),
      formatted: `${koreanTime.getFullYear()}년 ${koreanTime.getMonth() + 1}월 ${koreanTime.getDate()}일 ${koreanTime.toLocaleDateString("ko-KR", {weekday: "long"})} ${koreanTime.toLocaleTimeString("ko-KR", {hour12: false})}`,
      timezone: "Asia/Seoul (KST)",
      timestamp: koreanTime.getTime()
    }
  };
}

export const timeToolHandlers = {
  getCurrentKoreanTime,
};