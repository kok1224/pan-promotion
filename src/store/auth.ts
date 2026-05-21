import { create } from 'zustand'
import { User, Session } from '@supabase/supabase-js'
import { Profile } from '@/types/database'

interface AuthState {
  user: User | null
  profile: Profile | null
  session: Session | null
  loading: boolean
  setSession: (session: Session | null) => void
  setProfile: (profile: Profile | null) => void
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  session: null,
  loading: true,
  setSession: (session) => set({ session, user: session?.user ?? null, loading: false }),
  setProfile: (profile) => set({ profile }),
  logout: async () => {
    set({ user: null, profile: null, session: null })
  },
}))