import { useState } from "react"
import type { UserData } from "../App"
import Calendar, { type DayData } from "../components/Calendar"
import MedicineModal from "../components/MedicineModal"
import TreatmentCalendar from "../components/TreatmentCalendar"
import { REGIMEN } from "../lib/regimen"

interface Props {
  userData: UserData
  onSaveLog: (count: number, drugs: string[]) => void
}

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const PILL_HISTORY: Record<number, number> = {
  28: 4,
  29: 3,
  30: 4,
  1: 4,
  2: 4,
  3: 3,
  4: 4,
}

function getTreatmentDay(start: Date, now: Date) {
  const diff = Math.floor(
    (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  )
  return Math.max(1, diff + 1)
}

function buildWeekDays(
  today: Date,
  pillsToday: number,
  dailyTarget: number,
): DayData[] {
  const days: DayData[] = []
  const weekStart = today.getDate() - today.getDay() - 7
  for (let i = weekStart; i <= weekStart + 20; i++) {
    const d = new Date(today.getFullYear(), today.getMonth(), i)
    const dayNum = d.getDate()
    const isFuture = d > today
    const isToday = d.toDateString() === today.toDateString()
    const taken = isToday
      ? pillsToday
      : isFuture
        ? 0
        : (PILL_HISTORY[dayNum] ?? 4)
    days.push({
      date: dayNum,
      month: d.getMonth(),
      dayLabel: DAY_LABELS[d.getDay()],
      pillsTaken: taken,
      pillsTarget: dailyTarget,
      isFuture,
      isToday,
    })
  }
  return days
}

export default function Home({ userData, onSaveLog }: Props) {
  const today = new Date(2026, 9, 5)
  const [selectedDate, setSelectedDate] = useState(today.getDate())
  const [showModal, setShowModal] = useState(false)
  const [showCal, setShowCal] = useState(false)

  const treatmentDay = getTreatmentDay(userData.treatmentDayStart, today)
  const treatmentPct = Math.round((treatmentDay / userData.treatmentDays) * 100)
  const weekDays = buildWeekDays(
    today,
    userData.pillsToday,
    userData.dailyTarget,
  )

  const selectedDayData = weekDays.find((d) => d.date === selectedDate)
  const pillsForSelected = selectedDayData?.pillsTaken ?? 0
  const isSelectedToday = selectedDate === today.getDate()
  const selectedMonth = MONTH_NAMES[selectedDayData?.month ?? today.getMonth()]
  const dateLabel = `${selectedMonth} ${selectedDate}`
  const [openDrug, setOpenDrug] = useState<string | null>(null)

  const r = 52
  const circumference = Math.PI * r
  const offset = circumference * (1 - treatmentPct / 100)

  return (
    <div className="h-full flex flex-col page-wash overflow-y-auto">
      <div className="hero-green text-white pb-14 shrink-0">
        <div className="px-5 pt-10 pb-5 flex items-center justify-between">
          <div className="relative w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="7" r="4" stroke="white" strokeWidth="1.8" />
              <path
                d="M3 19c0-4 3.582-7 8-7s8 3 8 7"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#C8DDD1] border-2 border-[#4A7C5F]" />
          </div>
          <h2 className="text-lg font-medium">{dateLabel}</h2>
          <button
            onClick={() => setShowCal(true)}
            aria-haspopup="dialog"
            className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center transition-transform active:scale-[0.96]"
            aria-label="Open treatment calendar"
          >
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
              <rect
                x="2"
                y="3"
                width="14"
                height="13"
                rx="2"
                stroke="white"
                strokeWidth="1.5"
              />
              <path
                d="M5 1.5v3M13 1.5v3M2 7h14"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="px-3">
          <Calendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            days={weekDays}
          />
        </div>

        <div className="text-center mt-8">
          <p className="h-7 text-xl font-medium text-white/80 tabular-nums">
            {isSelectedToday ? "Treatment:" : `${dateLabel}:`}
          </p>
          <p className="h-[72px] text-6xl font-bold leading-[72px] tabular-nums">
            {isSelectedToday
              ? `Day ${treatmentDay}`
              : `${pillsForSelected}/${userData.dailyTarget}`}
          </p>
          <p className="h-5 text-sm font-light text-white/70 mt-1">
            {isSelectedToday
              ? `of ${userData.treatmentDays} days`
              : "pills taken"}
          </p>
          <div className="mt-5 h-11 flex items-center justify-center">
            {isSelectedToday ? (
              <button
                onClick={() => setShowModal(true)}
                className="h-11 bg-white text-[#355C45] rounded-full px-6 text-sm font-semibold shadow-md transition-transform active:scale-[0.96]"
              >
                Log today&apos;s pills
              </button>
            ) : (
              <span className="h-11 inline-flex items-center rounded-full bg-white/15 px-6 text-sm font-medium text-white/80">
                {selectedDayData?.isFuture ? "Upcoming day" : "Past day · read only"}
              </span>
            )}
          </div>
        </div>
      </div>

      <h3 className="px-5 text-lg font-semibold text-[#1C1C1C] mb-3 mt-6">
        My daily insights &middot; {isSelectedToday ? "Today" : dateLabel}
      </h3>
      <div className="snap-row flex gap-3 overflow-x-auto px-8 py-1 shrink-0">
        <button
          onClick={() => isSelectedToday && setShowModal(true)}
          className="shrink-0 w-32 h-44 bg-white rounded-2xl p-3 flex flex-col items-center justify-between text-center shadow-sm"
        >
          <p className="font-semibold text-sm leading-tight pt-1">
            Log your pills
          </p>
          <span className="w-11 h-11 rounded-full bg-[#4A7C5F] text-white text-2xl flex items-center justify-center">
            +
          </span>
        </button>

        <div className="shrink-0 w-32 h-44 bg-[#C8DDD1] rounded-2xl ring-2 ring-[#4A7C5F] p-3 flex flex-col items-center justify-between text-center">
          <p className="font-semibold text-sm leading-tight pt-1">
            Pills taken
          </p>
          <div>
            <p className="text-4xl font-bold text-[#355C45] tabular-nums">
              {pillsForSelected}/{userData.dailyTarget}
            </p>
            {isSelectedToday && pillsForSelected < userData.dailyTarget && (
              <p className="text-[10px] leading-tight text-[#355C45]/80 mt-1">
                Missing:{" "}
                {REGIMEN.filter((d) => !userData.drugsTaken.includes(d.name))
                  .map((d) => d.name.split(" ")[0])
                  .join(", ")}
              </p>
            )}
          </div>
          <span className="w-9 h-9 rounded-full bg-[#E6DCC8] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#355C45">
              <path d="M12 21s-8-5.5-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5.5-8 11-8 11z" />
            </svg>
          </span>
        </div>

        <div className="shrink-0 w-32 h-44 bg-[#E6DCC8] rounded-2xl p-3 flex flex-col items-center justify-between text-center">
          <p className="font-semibold text-sm leading-tight pt-1">Next visit</p>
          <div className="w-16 h-16 bg-[#FDFAF4] rounded-full rounded-br-none -rotate-45 flex items-center justify-center">
            <span className="rotate-45 text-3xl font-bold text-[#355C45]">
              12
            </span>
          </div>
          <p className="text-[11px] text-[#7A756E] leading-tight">
            Oct &middot; Dr. Siti
            <br />
            10:00 AM
          </p>
        </div>

        <div className="shrink-0 w-32 h-44 bg-[#FDFAF4] rounded-2xl p-3 flex flex-col items-center justify-between text-center shadow-sm">
          <p className="font-semibold text-sm leading-tight pt-1">Progress</p>
          <svg width="104" height="64" viewBox="0 0 128 80">
            <path
              d={`M12 72 A${r} ${r} 0 0 1 116 72`}
              fill="none"
              stroke="#C8DDD1"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d={`M12 72 A${r} ${r} 0 0 1 116 72`}
              fill="none"
              stroke="#4A7C5F"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={`${circumference}`}
              strokeDashoffset={`${offset}`}
            />
            <text
              x="64"
              y="64"
              textAnchor="middle"
              fill="#1C1C1C"
              fontSize="22"
              fontWeight="700"
              fontFamily="League Spartan"
            >
              {treatmentPct}%
            </text>
          </svg>
          <p className="text-[11px] text-[#7A756E]">
            Day {treatmentDay} of {userData.treatmentDays}
          </p>
        </div>
      </div>

      <div className="px-5 mt-4 pb-6 shrink-0">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <p className="px-4 py-3 font-semibold border-b border-[rgba(0,0,0,0.06)]">
            For you &middot; During treatment
          </p>
          <div className="p-4">
            <label className="flex items-center gap-2 bg-[#EDE8DF] rounded-full px-4 py-3 text-[#7A756E]">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle
                  cx="9"
                  cy="9"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M14 14l4 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              <input
                placeholder="Search TB tips, side effects..."
                className="bg-transparent outline-none text-sm flex-1 placeholder:text-[#7A756E]"
              />
            </label>
            <ul className="mt-3 divide-y divide-[rgba(0,0,0,0.06)]">
              {REGIMEN.map((drug) => {
                const open = openDrug === drug.name
                return (
                  <li key={drug.name}>
                    <button
                      onClick={() => setOpenDrug(open ? null : drug.name)}
                      aria-expanded={open}
                      className="w-full flex items-center justify-between py-2.5 text-left"
                    >
                      <span className="text-sm font-medium">{drug.name}</span>
                      <span className="flex items-center gap-2 text-xs text-[#7A756E]">
                        {drug.dose}
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          className={`transition-transform ${open ? "rotate-180" : ""}`}
                        >
                          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                    {open && (
                      <div className="mb-3 rounded-xl bg-[#EDE8DF] p-3 text-xs leading-relaxed text-[#1C1C1C]">
                        <p className="font-semibold text-[#355C45] mb-0.5">What it is</p>
                        <p className="mb-2 text-[#7A756E]">{drug.description}</p>
                        <p className="font-semibold text-[#355C45] mb-0.5">Use in treatment</p>
                        <p className="text-[#7A756E]">{drug.usage}</p>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>

      {showCal && (
        <TreatmentCalendar
          today={today}
          start={userData.treatmentDayStart}
          totalDays={userData.treatmentDays}
          onClose={() => setShowCal(false)}
        />
      )}

      {showModal && (
        <MedicineModal
          pillsTaken={userData.pillsToday}
          drugsTaken={userData.drugsTaken}
          dailyTarget={userData.dailyTarget}
          onSave={onSaveLog}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
