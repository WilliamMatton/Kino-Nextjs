// Lägg alla TypeScript typer i den här filen

export type review = {
  id: number;
  attributes: {
    createdAt: Date;
    comment: string;
    rating: number;
    author: string;
    verified: boolean;
    updatedAt: Date;
  };
};

export type Movie = {
  id: number;
  attributes?: {
    title?: string;
    intro?: string;
    imdbId?: string;
    image?: {
      url?: string;
    };
  };
};

export type Screening = {
  id: number;
  attributes: {
    start_time: string;
  };
};

export type Rating = {
  value: number;
  source: "reviews" | "imdb";
};
