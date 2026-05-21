const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p'

// 封面尺寸选择：w500 是中等大小，适合列表展示
const POSTER_SIZE = 'w500'

export interface TMDBSearchResult {
  id: number
  title: string
  original_title: string
  overview: string | null
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
}

export interface TMDBSearchResponse {
  page: number
  results: TMDBSearchResult[]
  total_pages: number
  total_results: number
}

function getBearerToken(): string {
  const token = process.env.TMDB_BEARER_TOKEN
  if (!token) {
    throw new Error('TMDB_BEARER_TOKEN 环境变量未配置')
  }
  return token
}

// 搜索电影/剧集
export async function searchMovie(query: string, language = 'zh-CN'): Promise<TMDBSearchResponse> {
  const token = getBearerToken()

  const url = `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=${language}`

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'accept': 'application/json',
    },
    next: { revalidate: 3600 }, // 缓存 1 小时
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`TMDB API 错误: ${response.status} - ${error}`)
  }

  return response.json()
}

// 获取电影详情
export async function getMovieDetails(movieId: number, language = 'zh-CN'): Promise<TMDBSearchResult> {
  const token = getBearerToken()

  const url = `${TMDB_BASE_URL}/movie/${movieId}?language=${language}`

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    next: { revalidate: 86400 }, // 缓存 1 天
  })

  if (!response.ok) {
    throw new Error(`TMDB API 错误: ${response.status}`)
  }

  return response.json()
}

// 获取封面图片完整 URL
export function getPosterUrl(posterPath: string | null, size: string = POSTER_SIZE): string | null {
  if (!posterPath) return null
  return `${TMDB_IMAGE_BASE}/${size}${posterPath}`
}

// 搜索并返回带封面 URL 的结果
export async function searchMovieWithCover(query: string, language = 'zh-CN'): Promise<Array<TMDBSearchResult & { cover_url: string | null }>> {
  const data = await searchMovie(query, language)

  return data.results.map(movie => ({
    ...movie,
    cover_url: getPosterUrl(movie.poster_path),
  }))
}