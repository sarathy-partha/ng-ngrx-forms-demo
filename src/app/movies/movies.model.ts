export interface Movie {
  page: number;
  results: [
    {
      title: string;
      popularity: string;
      id: number;
      release_date: string;
    }
  ]
}
