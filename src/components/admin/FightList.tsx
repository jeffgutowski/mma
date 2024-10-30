import React, { useEffect, useState } from 'react';
import { getFights } from '../../services/api';
import { Fight } from '../../types';

export const FightList: React.FC = () => {
  const [fights, setFights] = useState<Fight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadFights = async () => {
      try {
        const response = await getFights();
        setFights(response.data);
      } catch (err) {
        setError('Failed to load fights');
      } finally {
        setLoading(false);
      }
    };
    loadFights();
  }, []);

  if (loading) {
    return <div className="text-center">Loading fights...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <h2 className="text-xl font-bold p-6 border-b">Upcoming Fights</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fighter 1
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fighter 2
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Weight Class
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Votes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fights.map((fight) => (
              <tr key={fight.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={fight.fighter1.imageUrl}
                      alt={fight.fighter1.name}
                      className="h-10 w-10 rounded-full object-cover mr-3"
                    />
                    <div className="text-sm font-medium text-gray-900">
                      {fight.fighter1.name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={fight.fighter2.imageUrl}
                      alt={fight.fighter2.name}
                      className="h-10 w-10 rounded-full object-cover mr-3"
                    />
                    <div className="text-sm font-medium text-gray-900">
                      {fight.fighter2.name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(fight.eventDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{fight.weightClass}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {fight.votes.fighter1} - {fight.votes.fighter2}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};