import type { CSSProperties } from "react"

export interface DayData {
  date: number
  month: number
  dayLabel: string
  pillsTaken: number
  pillsTarget: number
  isFuture: boolean
  isToday: boolean
}

interface Props {
  selectedDate: number
  onSelectDate: (date: number) => void
  days: DayData[]
}

function bubbleStyle(day: DayData, selected: boolean) {
  let base: CSSProperties
  if (day.isFuture) {
    base = { background: "transparent", color: "white" }
  } else if (day.pillsTaken >= day.pillsTarget) {
    base = { background: "#FDFAF4", color: "#355C45" }
  } else if (day.pillsTaken > 0) {
    base = { background: "#B7791F", color: "white" }
  } else {
    base = { background: "rgba(255,255,255,0.14)", color: "white", border: "1.5px solid rgba(200,221,209,0.8)" }
  }
  if (selected) {
    base.boxShadow = "0 0 0 3px #FDFAF4, 0 6px 14px rgba(0,0,0,0.25)"
  }
  return base
}

export default function Calendar({ selectedDate, onSelectDate, days }: Props) {
  const selIdx = Math.max(0, days.findIndex((d) => d.date === selectedDate))
  const weekIdx = Math.floor(selIdx / 7)
  const week = days.slice(weekIdx * 7, weekIdx * 7 + 7)
  const canPrev = weekIdx > 0
  const canNext = (weekIdx + 1) * 7 < days.length

  const shift = (dir: -1 | 1) => {
    const target = days[(weekIdx + dir) * 7 + (selIdx % 7)]
    if (target) onSelectDate(target.date)
  }

  return (
    <div className="flex items-center gap-1">
      <button
        aria-label="Previous week"
        disabled={!canPrev}
        onClick={() => shift(-1)}
        className="w-5 text-white/70 disabled:opacity-20 text-lg leading-none"
      >
        ‹
      </button>
      <div className="flex-1 grid grid-cols-7 gap-1">
        {week.map((day) => {
          const selected = day.date === selectedDate
          return (
            <button
              key={`${day.dayLabel}-${day.date}`}
              onClick={() => onSelectDate(day.date)}
              className="flex flex-col items-center gap-2"
            >
              <span
                className={`text-[10px] tracking-wider ${day.isToday ? "font-bold text-white" : "font-medium text-white/60"}`}
              >
                {day.isToday ? "TODAY" : day.dayLabel[0]}
              </span>
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center text-base font-semibold transition-all"
                style={bubbleStyle(day, selected)}
              >
                {day.date}
              </span>
            </button>
          )
        })}
      </div>
      <button
        aria-label="Next week"
        disabled={!canNext}
        onClick={() => shift(1)}
        className="w-5 text-white/70 disabled:opacity-20 text-lg leading-none"
      >
        ›
      </button>
    </div>
  )
}
