import { create } from 'zustand'

interface SysStore {
  theme: string
  handleThemeChange: (theme: Theme) => void
}
export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}
export const useSysStore = create<SysStore>((set) => ({
  theme: 'dark',
  handleThemeChange: (theme: Theme) => set({ theme }),
}))
