import { create } from 'zustand';
import { Fight } from '../types';

interface FightStore {
  fights: Fight[];
  votedFights: Set<string>;
  addFight: (fight: Fight) => void;
  vote: (fightId: string, fighterNumber: 1 | 2) => void;
  hasVoted: (fightId: string) => boolean;
}

export const useFightStore = create<FightStore>((set, get) => ({
  fights: [
    {
      id: '1',
      fighter1: {
        id: '1',
        name: 'Alexander Volkanovski',
        imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop',
        record: '26-3-0',
        weight: '145 lbs'
      },
      fighter2: {
        id: '2',
        name: 'Ilia Topuria',
        imageUrl: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=1600&auto=format&fit=crop',
        record: '14-0-0',
        weight: '145 lbs'
      },
      eventDate: '2024-04-13',
      weightClass: 'Featherweight',
      votes: {
        fighter1: 425,
        fighter2: 389
      }
    }
  ],
  votedFights: new Set(),
  
  addFight: (fight) => set((state) => ({ fights: [...state.fights, fight] })),
  
  vote: (fightId, fighterNumber) => {
    set((state) => ({
      fights: state.fights.map((fight) => {
        if (fight.id === fightId) {
          return {
            ...fight,
            votes: {
              ...fight.votes,
              [`fighter${fighterNumber}`]: fight.votes[`fighter${fighterNumber}`] + 1
            }
          };
        }
        return fight;
      }),
      votedFights: new Set([...state.votedFights, fightId])
    }));
  },
  
  hasVoted: (fightId) => get().votedFights.has(fightId)
}));