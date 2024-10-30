import React from 'react';
import { Fight } from '../types';
import { Trophy } from 'lucide-react';
import { useFightStore } from '../store/fightStore';
import clsx from 'clsx';

interface FightCardProps {
  fight: Fight;
}

export const FightCard: React.FC<FightCardProps> = ({ fight }) => {
  const { vote, hasVoted } = useFightStore();
  const voted = hasVoted(fight.id);
  
  const totalVotes = fight.votes.fighter1 + fight.votes.fighter2;
  const fighter1Percentage = totalVotes ? Math.round((fight.votes.fighter1 / totalVotes) * 100) : 50;
  const fighter2Percentage = totalVotes ? Math.round((fight.votes.fighter2 / totalVotes) * 100) : 50;

  const handleVote = (fighterNumber: 1 | 2) => {
    if (!voted) {
      vote(fight.id, fighterNumber);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-red-600 to-red-800 p-4 text-white">
        <h3 className="text-center text-xl font-bold">{fight.weightClass} Division</h3>
        <p className="text-center text-sm opacity-80">Event Date: {new Date(fight.eventDate).toLocaleDateString()}</p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between p-6 gap-8">
        {[fight.fighter1, fight.fighter2].map((fighter, index) => (
          <div key={fighter.id} className="flex-1">
            <div className="relative group">
              <img
                src={fighter.imageUrl}
                alt={fighter.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              <button
                onClick={() => handleVote(index === 0 ? 1 : 2)}
                disabled={voted}
                className={clsx(
                  "absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity",
                  "text-white text-2xl font-bold",
                  voted && "cursor-not-allowed"
                )}
              >
                {voted ? 'Voted' : 'Vote'}
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <h4 className="text-xl font-bold">{fighter.name}</h4>
              <p className="text-gray-600">{fighter.record}</p>
              
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={clsx(
                      "h-2.5 rounded-full transition-all duration-500",
                      index === 0 ? "bg-blue-600" : "bg-red-600"
                    )}
                    style={{
                      width: `${index === 0 ? fighter1Percentage : fighter2Percentage}%`
                    }}
                  ></div>
                </div>
                <p className="mt-2 text-lg font-semibold">
                  {index === 0 ? fighter1Percentage : fighter2Percentage}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {voted && (
        <div className="bg-gray-50 p-4 text-center">
          <p className="text-sm text-gray-600">
            Total Votes: {totalVotes}
          </p>
        </div>
      )}
    </div>
  );
};