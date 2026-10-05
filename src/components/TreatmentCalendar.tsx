import { useEffect, useRef, useState } from "react"
import { APPOINTMENTS, addDays, formatDate } from "../lib/regimen"

interface Props {
  today: Date
  start: Date
  totalDays: number
  onClose: () => void
}

type Kind = "start" | "phase" | "today" | "visit" | "end"

interface Mark {
  kind: Kind
  label: string
}

const KINDS: Record<Kind, { symbol: string; style: string; name: string }> = {
  start: { symbol: "▶", style: "bg-[#4A7C5F] text-white", name: "Treatment start" },
  phase: { symbol: "◆", style: "bg-[#C8DDD1] text-[#355C45]", name: "Intensive phase ends" },
  today: { symbol: "", style: "bg-[#1C1C1C] text-white", name: "Today" },
  visit: { symbol: "●", style: "bg-[#E6DCC8] text-[#355C45] ring-2 ring-[#355C45]", name: "Doctor visit" },
  end: { symbol: "★", style: "bg-[#355C45] text-white", name: "Predicted end" },
}

const key = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`

export default function TreatmentCalendar({ today, start, totalDays, onClose }: Props) {
  const [view, setView] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [picked, setPicked] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    ref.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      prev?.focus()
    }
  }, [onClose])

  const marks = new Map<string, Mark>()
  marks.set(key(start), { kind: "start", label: "Treatment start" })
  const phaseEnd = new Date(start.getFullYear(), start.getMonth() + 2, start.getDate())
  marks.set(key(addDays(phaseEnd, -1)), { kind: "phase", label: "Intensive phase ends" })
  marks.set(key(addDays(start, totalDays - 1)), { kind: "end", label: "Predicted end of treatment" })
  APPOINTMENTS.forEach((a) => marks.set(key(a.date), { kind: "visit", label: `${a.doctor}, ${a.time}` }))
  if (!marks.has(key(today))) marks.set(key(today), { kind: "today", label: "Today" })

  const first = view.getDay()
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate()
  const cells: (number | null)[] = [
    ...Array.from({ length: first }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const minMonth = new Date(start.getFullYear(), start.getMonth(), 1)
  const maxEnd = addDays(start, totalDays - 1)
  const maxMonth = new Date(maxEnd.getFullYear(), maxEnd.getMonth(), 1)
  const shift = (n: number) => setView(new Date(view.getFullYear(), view.getMonth() + n, 1))
  const pickedMark = picked ? marks.get(picked) : null
  const pickedDate = picked ? picked.split("-").map(Number) : null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cal-title"
        className="relative w-full max-w-sm max-h-[92dvh] overflow-y-auto bg-[#FDFAF4] rounded-t-3xl p-6 pb-10 shadow-2xl outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-[rgba(0,0,0,0.15)] rounded-full mx-auto mb-5" />
        <div className="flex items-center justify-between mb-4">
          <button
            aria-label="Previous month"
            disabled={view <= minMonth}
            onClick={() => shift(-1)}
            className="w-11 h-11 rounded-full bg-[#EDE8DF] text-lg disabled:opacity-30 active:scale-[0.96] transition-transform"
          >
            ‹
          </button>
          <h2 id="cal-title" className="text-xl font-bold">
            {view.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h2>
          <button
            aria-label="Next month"
            disabled={view >= maxMonth}
            onClick={() => shift(1)}
            className="w-11 h-11 rounded-full bg-[#EDE8DF] text-lg disabled:opacity-30 active:scale-[0.96] transition-transform"
          >
            ›
          </button>
        </div>

        <div className="grid grid-cols-7 gap-y-1 text-center text-[11px] font-medium text-[#7A756E] mb-1">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-1 text-center">
          {cells.map((n, i) => {
            if (!n) return <span key={i} />
            const d = new Date(view.getFullYear(), view.getMonth(), n)
            const k = key(d)
            const mark = marks.get(k)
            const isToday = k === key(today)
            const cls = mark ? KINDS[mark.kind].style : isToday ? KINDS.today.style : "text-[#1C1C1C]"
            return (
              <button
                key={i}
                disabled={!mark}
                onClick={() => setPicked(k)}
                aria-label={`${formatDate(d)}${mark ? `, ${mark.label}` : ""}`}
                className="flex flex-col items-center justify-center h-11 disabled:cursor-default"
              >
                <span className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium tabular-nums ${cls}`}>
                  {n}
                </span>
                {mark && mark.kind !== "today" && (
                  <span aria-hidden="true" className="text-[7px] leading-none text-[#355C45] -mt-0.5">
                    {KINDS[mark.kind].symbol}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <p className="min-h-10 mt-3 text-sm text-[#1C1C1C]" aria-live="polite">
          {pickedMark && pickedDate
            ? `${formatDate(new Date(pickedDate[0], pickedDate[1], pickedDate[2]))}: ${pickedMark.label}`
            : "Select a marked day for details."}
        </p>

        <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-[#7A756E]">
          {(Object.keys(KINDS) as Kind[]).map((k) => (
            <li key={k} className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] ${KINDS[k].style}`} aria-hidden="true">
                {KINDS[k].symbol}
              </span>
              {KINDS[k].name}
            </li>
          ))}
        </ul>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-[#4A7C5F] text-white rounded-2xl py-3.5 font-semibold active:scale-[0.96] transition-transform"
        >
          Close calendar
        </button>
      </div>
    </div>
  )
}
