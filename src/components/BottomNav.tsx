import type { ReactNode } from "react"
import type { AppTab } from "../App"

interface Props {
  activeTab: AppTab
  onTabChange: (tab: AppTab) => void
}

const tabs: { id: AppTab; label: string; icon: ReactNode }[] = [
  {
    id: "home",
    label: "Home",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 9.5L11 3l8 6.5V19a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M8 20v-8h6v8" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "map",
    label: "Nearby",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2C7.686 2 5 4.686 5 8c0 5 6 12 6 12s6-7 6-12c0-3.314-2.686-6-6-6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <circle cx="11" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
  },
  {
    id: "chat",
    label: "Chat",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 4h14a1 1 0 011 1v9a1 1 0 01-1 1H7l-4 4V5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Profile",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M3 19c0-4 3.582-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function BottomNav({ activeTab, onTabChange }: Props) {
  return (
    <div className="bg-[#FDFAF4]/80 backdrop-blur-md border-t border-[rgba(0,0,0,0.06)] safe-bottom">
      <div className="flex items-center justify-around px-2 py-3">
        {tabs.map((tab) => {
          const active = tab.id === activeTab
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center gap-1 px-4 py-1.5 transition-all"
              style={active ? { color: "#1C1C1C" } : { color: "#B5AFA8" }}
            >
              {tab.icon}
              {tab.id === "chat" && <span className="absolute top-1 right-3 w-2 h-2 rounded-full bg-[#4A7C5F]" />}
              <span className={`text-[10px] tracking-wide ${active ? "font-bold" : "font-medium"}`}>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
