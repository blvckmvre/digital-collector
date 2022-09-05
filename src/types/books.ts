export interface IApiBook {
  title: string;
  author_name: string[];
}

export interface IBooksApiResponse {
  docs: IApiBook[];
}

export interface IBook {
  id: number;
  user_id: number;
  title: string;
  author: string;
}