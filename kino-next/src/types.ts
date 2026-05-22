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
}