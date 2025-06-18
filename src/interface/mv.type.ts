export interface IResult {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string; 
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export interface IMovie {
  page: number;
  total_pages: number;
  total_results: number;
  results: IResult[]
}

export interface TrailerResult {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  published_at: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  id: string;
}

export interface TrailerData {
  id: number;
  results: TrailerResult[];
}