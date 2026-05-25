import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  username: string
  email: string
  role: 'admin' | 'user'
  avatar_url: string | null
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  setAuth: (user: User, token: string) => void
  logout: () => void
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: true,

      setAuth: (user, token) => {
        set({ user, token, loading: false })
      },

      logout: () => {
        set({ user: null, token: null, loading: false })
      },

      initialize: async () => {
        const { token } = get()
        if (!token) {
          set({ loading: false })
          return
        }

        try {
          const response = await fetch('/api/auth/session', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          const data = await response.json()
          if (data.user) {
            set({ user: data.user, loading: false })
          } else {
            set({ user: null, token: null, loading: false })
          }
        } catch (error) {
          console.error('Session initialization failed:', error)
          set({ user: null, token: null, loading: false })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token }),
    }
  )
)
