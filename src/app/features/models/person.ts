export interface Person {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null;
  credit_id: string;
  department: string;
  job: string;
  also_known_as?: string[];
  biography?: string;
  birthday?: string;
  deathday?: string | null;
  homepage?: string;
  imdb_id?: string;
  place_of_birth?: string;
}
