import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useFightStore } from './store/fightStore';
import { FightCard } from './components/FightCard';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Trophy } from 'lucide-react';

function App() {
  const { fights } = useFightStore();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gray-100">
              <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-6">
                  <div className="flex items-center justify-center gap-2">
                    <Trophy className="h-8 w-8 text-red-600" />
                    <h1 className="text-3xl font-bold text-gray-900">RUF Nation Fight Predictions</h1>
                  </div>
                  <p className="mt-2 text-center text-gray-600">Vote on upcoming MMA fights and see what the community thinks!</p>
                </div>
              </header>

              <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="space-y-8">
                  {fights.map((fight) => (
                    <FightCard key={fight.id} fight={fight} />
                  ))}
                </div>
              </main>

              <footer className="bg-white border-t mt-12">
                <div className="max-w-7xl mx-auto px-4 py-6">
                  <p className="text-center text-gray-600">© 2024 RUF Nation. All rights reserved.</p>
                </div>
              </footer>
            </div>
          }
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;