export interface Fighter {
  id: string;
  name: string;
  imageUrl: string;
  record?: string;
  weight?: string;
}

export interface Fight {
  id: string;
  fighter1: Fighter;
  fighter2: Fighter;
  eventDate: string;
  weightClass: string;
  votes: {
    fighter1: number;
    fighter2: number;
  };
}