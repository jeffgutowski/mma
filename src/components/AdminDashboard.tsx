import React, { useState } from 'react';
import { Layout } from './Layout';
import { FighterForm } from './admin/FighterForm';
import { FightForm } from './admin/FightForm';
import { FighterList } from './admin/FighterList';
import { FightList } from './admin/FightList';
import { Users, Swords, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fighters' | 'fights'>('fighters');
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <Layout>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
          </div>
          <nav className="mt-6">
            <button
              onClick={() => setActiveTab('fighters')}
              className={`w-full flex items-center px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 ${
                activeTab === 'fighters' ? 'bg-red-50 text-red-600' : ''
              }`}
            >
              <Users className="h-5 w-5 mr-3" />
              Fighters
            </button>
            <button
              onClick={() => setActiveTab('fights')}
              className={`w-full flex items-center px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 ${
                activeTab === 'fights' ? 'bg-red-50 text-red-600' : ''
              }`}
            >
              <Swords className="h-5 w-5 mr-3" />
              Fights
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 mt-auto"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {activeTab === 'fighters' ? (
              <div className="space-y-8">
                <FighterForm />
                <FighterList />
              </div>
            ) : (
              <div className="space-y-8">
                <FightForm />
                <FightList />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};