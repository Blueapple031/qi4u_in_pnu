import type {
  OptimizeSmallWorldRequest,
  OptimizeSmallWorldResponse,
  ApiTarget,
} from "./types.ts";

// 개발/프로덕션 모두 프록시 경로 사용 (CORS 우회)
// - 개발: Vite proxy (vite.config.ts)
// - 프로덕션: Vercel rewrites (vercel.json)
export const SMALL_WORLD_API_URL = "/api/optimize/small-world";
export const NAOTO_API_URL = "/api/optimize/naoto";

export async function optimizeSmallWorld(
  request: OptimizeSmallWorldRequest,
  apiTarget: ApiTarget
): Promise<OptimizeSmallWorldResponse> {
  const url =
    apiTarget === "naoto" ? NAOTO_API_URL : SMALL_WORLD_API_URL;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `API 요청 실패 (${response.status}): ${text || response.statusText}`
    );
  }

  const data = (await response.json()) as OptimizeSmallWorldResponse;
  return data;
}
