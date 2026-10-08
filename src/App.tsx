import { useState } from "react"
import Onboarding, { type Role } from "./screens/Onboarding"
import RiskQuiz from "./screens/RiskQuiz"
import Home from "./screens/Home"
import Map from "./screens/Map"
import Chat from "./screens/Chat"
import Learn from "./screens/Learn"
import Profile from "./screens/Profile"
import BottomNav from "./components/BottomNav"

export type AppTab = "home" | "learn" | "map" | "chat" | "profile"
type AppScreen = "onboarding" | "risk-quiz" | "app"

export interface UserData {
  name: string
  hasTB: boolean
  role: Role
  pillsToday: number
  drugsTaken: string[]
  dailyTarget: number
  treatmentDayStart: Date
  treatmentDays: number
}

const defaultUser: UserData = {
  name: "Andi",
  hasTB: true,
  role: "patient",
  pillsToday: 2,
  drugsTaken: ["Isoniazid (H)", "Rifampicin (R)"],
  dailyTarget: 4,
  treatmentDayStart: new Date(2026, 6, 1),
  treatmentDays: 180,
}

export default function App() {
  const [screen, setScreen] = useState<AppScreen>("onboarding")
  const [activeTab, setActiveTab] = useState<AppTab>("home")
  const [userData, setUserData] = useState<UserData>(defaultUser)

  const handleOnboardingComplete = (role: Role) => {
    const hasTB = role === "patient"
    setUserData((u) => ({ ...u, hasTB, role }))
    setActiveTab(hasTB ? "home" : "learn")
    setScreen(role === "curious" ? "risk-quiz" : "app")
  }

  const handleQuizComplete = (choice: "app" | "learn") => {
    const useApp = choice === "app"
    setUserData((u) => ({ ...u, hasTB: useApp }))
    setActiveTab(useApp ? "home" : "learn")
    setScreen("app")
  }

  const switchRole = () => {
    setActiveTab("home")
    setScreen("onboarding")
  }

  const saveLog = (count: number, drugs: string[]) => {
    setUserData((u) => ({
      ...u,
      pillsToday: Math.max(0, Math.min(u.dailyTarget, count)),
      drugsTaken: drugs,
    }))
  }

  if (screen === "onboarding") {
    return <Onboarding onComplete={handleOnboardingComplete} />
  }

  if (screen === "risk-quiz") {
    return <RiskQuiz onComplete={handleQuizComplete} />
  }

  return (
    <div className="flex flex-col h-dvh bg-[#EDE8DF] max-w-lg mx-auto">
      <div className="flex-1 overflow-hidden relative">
        {activeTab === "home" && (
          <Home userData={userData} onSaveLog={saveLog} />
        )}
        {activeTab === "learn" && <Learn onSwitchRole={switchRole} />}
        {activeTab === "map" && <Map />}
        {activeTab === "chat" && <Chat userName={userData.name} />}
        {activeTab === "profile" && <Profile userData={userData} onSwitchRole={switchRole} />}
      </div>
      <BottomNav hasTB={userData.hasTB} activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
