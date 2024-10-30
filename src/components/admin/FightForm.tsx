import React, { useState, useEffect } from 'react';
import { getFighters, createFight } from '../../services/api';
import { Fighter } from '../../types';

export const FightForm: React.FC = () => {
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [fighter1Id, setFighter1Id] = useState('');
  const [fighter2Id, setFighter2Id] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [weightClass, setWeightClass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadFighters = async () => {
      try {
        const response = await getFighters();
        setFighters(response.data);
      } catch (err) {
        setError('Failed to load fighters');
      }
    };
    loadFighters();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createFight({
        fighter1: fighter1Id,
        fighter2: fighter2Id,
        eventDate,
        weightClass,
      });
      
      setFighter1Id('');
      setFighter2Id('');
      setEventDate('');
      setWeightClass('');
    } catch (err) {
      setError('Failed to create fight');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-6">Create New Fight</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Fighter 1</label>
          <select
            value={fighter1Id}
            onChange={(e) => setFighter1Id(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            required
          >
            <option value="">Select Fighter 1</option>
            {fighters.map((fighter) => (
              <option key={fighter.id} value={fighter.id}>
                {fighter.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Fighter 2</label>
          <select
            value={fighter2Id}
            onChange={(e) => setFighter2Id(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            required
          >
            <option value="">Select Fighter 2</option>
            {fighters.map((fighter) => (
              <option key={fighter.id} value={fighter.id}>
                {fighter.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Event Date</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Weight Class</label>
          <input
            type="text"
            value={weightClass}
            onChange={(e) => setWeightClass(e.target.value)}
            placeholder="Lightweight"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Fight'}
        </button>
      </form>
    </div>
  );
};