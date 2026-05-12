// Lägg alla TypeScript typer i den här filen

export type movie = { 
  id: number;
  attributes: {
    title: string;
    imdb: string;
    intro: string;
    image: {
      url: string;
    }
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}