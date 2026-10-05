import { useEffect, useRef, useState } from "react"
import { REGIMEN } from "../lib/regimen"

interface Props {
  pillsTaken: number
  drugsTaken: string[]
  dailyTarget: number
  onSave: (count: number, drugs: string[]) => void
  onClose: () => void
}

export default function MedicineModal({ pillsTaken, drugsTaken, dailyTarget, onSave, onClose }: Props) {
  const [count, setCount] = useState(pillsTaken)
  const [drugs, setDrugs] = useState<string[]>(drugsTaken)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    dialogRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      prev?.focus()
    }
  }, [onClose])

  const needsPick = count > 0 && count < dailyTarget
  const remaining = count - drugs.length

  const changeCount = (next: number) => {
    setCount(next)
    if (next >= dailyTarget) setDrugs(REGIMEN.map((d) => d.name))
    else if (next === 0) setDrugs([])
    else setDrugs((d) => d.slice(0, next))
  }

  const toggle = (name: string) =>
    setDrugs((d) => (d.includes(name) ? d.filter((x) => x !== name) : d.length < count ? [...d, name] : d))

  const canSave = !needsPick || remaining === 0

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="log-title"
        className="relative w-full max-w-sm max-h-[92dvh] overflow-y-auto bg-[#FDFAF4] rounded-t-3xl p-6 pb-10 shadow-2xl outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-[rgba(0,0,0,0.15)] rounded-full mx-auto mb-6" />

        <h2 id="log-title" className="text-2xl font-bold text-[#1C1C1C] mb-1">Log medicine</h2>
        <p className="text-[#7A756E] text-sm mb-6">How many pills have you taken today?</p>

        <div className="flex items-center justify-center gap-6 mb-6">
          <button
            aria-label="Take one fewer pill"
            onClick={() => changeCount(count - 1)}
            disabled={count <= 0}
            className="w-14 h-14 rounded-2xl bg-[#EDE8DF] text-[#1C1C1C] text-2xl flex items-center justify-center disabled:opacity-30 active:scale-[0.96] transition-transform"
          >
            −
          </button>
          <div className="text-center">
            <div className="text-6xl font-bold text-[#355C45] leading-none tabular-nums">{count}</div>
            <div className="text-[#7A756E] text-sm mt-1">of {dailyTarget} pills</div>
          </div>
          <button
            aria-label="Take one more pill"
            onClick={() => changeCount(count + 1)}
            disabled={count >= dailyTarget}
            className="w-14 h-14 rounded-2xl bg-[#4A7C5F] text-white text-2xl flex items-center justify-center disabled:opacity-30 active:scale-[0.96] transition-transform"
          >
            +
          </button>
        </div>

        {needsPick && (
          <fieldset className="mb-6">
            <legend className="text-sm font-semibold text-[#1C1C1C] mb-2">Which pills did you take?</legend>
            <div className="flex flex-col gap-2">
              {REGIMEN.map((d) => {
                const checked = drugs.includes(d.name)
                const blocked = !checked && remaining === 0
                return (
                  <label
                    key={d.name}
                    className={`flex items-center gap-3 min-h-11 rounded-xl px-3 py-2 cursor-pointer ${checked ? "bg-[#C8DDD1]" : "bg-[#EDE8DF]"} ${blocked ? "opacity-50" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={blocked}
                      onChange={() => toggle(d.name)}
                      className="w-5 h-5 accent-[#4A7C5F]"
                    />
                    <span className="text-sm font-medium flex-1">{d.name}</span>
                    <span className="text-xs text-[#7A756E]">{d.dose.split(" · ")[0]}</span>
                  </label>
                )
              })}
            </div>
            <p className="text-xs text-[#7A756E] mt-2" aria-live="polite">
              {remaining > 0 ? `Select ${remaining} more ${remaining === 1 ? "pill" : "pills"}.` : "All selected."}
            </p>
          </fieldset>
        )}

        <button
          onClick={() => {
            onSave(count, drugs)
            onClose()
          }}
          disabled={!canSave}
          className="w-full bg-[#4A7C5F] text-white rounded-2xl py-4 font-semibold text-base shadow-md disabled:opacity-40 active:scale-[0.96] transition-transform"
        >
          Save log
        </button>
      </div>
    </div>
  )
}
