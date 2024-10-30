import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setAuthToken } from '../services/api';

interface AuthStore {
  token: string | null;
  setAuth: (token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      setAuth: (token) => {
        setAuthToken(token);
        set({ token });
      },
      logout: () => {
        setAuthToken('');
        set({ token: null });
      },
      isAuthenticated: () => !!get().token,
    }),
    {
      name: 'auth-storage',
    }
  )
);