import type { UserData } from "../App"
import { APPOINTMENTS, addDays, formatDate } from "../lib/regimen"

interface Props {
  userData: UserData
  onSwitchRole: () => void
}

function getTreatmentDay(start: Date, now: Date) {
  const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  return Math.max(1, diff + 1)
}

export default function Profile({ userData, onSwitchRole }: Props) {
  const today = new Date(2026, 9, 5)
  const treatmentDay = getTreatmentDay(userData.treatmentDayStart, today)
  const treatmentPct = Math.round((treatmentDay / userData.treatmentDays) * 100)

  const stats = [
    { label: "Days on Treatment", value: treatmentDay.toString(), sub: `of ${userData.treatmentDays}` },
    { label: "Adherence Rate", value: "94%", sub: "last 30 days" },
    { label: "Pills Taken", value: `${treatmentDay * 3 + 2}`, sub: "total" },
    { label: "Missed Doses", value: "4", sub: "this month" },
  ]

  return (
    <div className="h-full flex flex-col page-wash overflow-y-auto">
      {/* Header */}
      <div className="hero-green px-6 pt-10 pb-20 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="10" r="6" stroke="white" strokeWidth="2"/>
              <path d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <p className="text-white/60 text-sm font-light">Patient</p>
            <h2 className="text-white text-2xl font-bold">{userData.name} Pratama</h2>
            <p className="text-white/60 text-xs font-light">ID: TB-2026-00482</p>
          </div>
        </div>
        <button
          onClick={onSwitchRole}
          className="mt-5 min-h-11 px-4 rounded-full bg-white/15 text-white text-sm font-semibold transition-transform active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Switch user type
        </button>
      </div>

      {/* Stats card — overlapping green header */}
      <div className="px-6 -mt-12 mb-6 shrink-0">
        <div className="bg-[#FDFAF4] rounded-3xl p-5 shadow-sm grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold text-[#355C45]">{s.value}</p>
              <p className="text-[10px] text-[#7A756E] font-light uppercase tracking-wide">{s.label}</p>
              <p className="text-[10px] text-[#B5AFA8] font-light">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Treatment progress */}
      <div className="px-6 mb-5 shrink-0">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-3">
            <p className="text-[#1C1C1C] text-sm font-semibold">Treatment Progress</p>
            <p className="text-[#4A7C5F] text-sm font-bold">{treatmentPct}%</p>
          </div>
          <div className="h-3 bg-[#EDE8DF] rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-[#4A7C5F] rounded-full transition-all"
              style={{ width: `${treatmentPct}%` }}
            />
          </div>
          <div className="flex justify-between">
            <p className="text-[#7A756E] text-xs font-light">Started {formatDate(userData.treatmentDayStart)}</p>
            <p className="text-[#7A756E] text-xs font-light">Ends {formatDate(addDays(userData.treatmentDayStart, userData.treatmentDays - 1))}</p>
          </div>
        </div>
      </div>

      {/* Regimen */}
      <div className="px-6 mb-5 shrink-0">
        <p className="text-[#7A756E] text-xs font-light uppercase tracking-widest mb-3">Treatment Regimen</p>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {[
            { drug: "Isoniazid (H)", dose: "300 mg", frequency: "Once daily" },
            { drug: "Rifampicin (R)", dose: "600 mg", frequency: "Once daily" },
            { drug: "Pyrazinamide (Z)", dose: "1500 mg", frequency: "Once daily" },
            { drug: "Ethambutol (E)", dose: "1200 mg", frequency: "Once daily" },
          ].map((item, i, arr) => (
            <div
              key={item.drug}
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}
            >
              <div>
                <p className="text-[#1C1C1C] text-sm font-medium">{item.drug}</p>
                <p className="text-[#7A756E] text-xs font-light">{item.frequency}</p>
              </div>
              <span className="text-[#355C45] text-sm font-semibold">{item.dose}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Appointments */}
      <div className="px-6 mb-6 shrink-0">
        <p className="text-[#7A756E] text-xs font-light uppercase tracking-widest mb-3">Upcoming Appointments</p>
        {APPOINTMENTS.map((apt) => (
          <div key={apt.doctor} className="bg-white rounded-2xl shadow-sm p-4 mb-3 flex gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#C8DDD1] flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="3" width="16" height="15" rx="2" stroke="#4A7C5F" strokeWidth="1.5"/>
                <path d="M6 1.5v3M14 1.5v3M2 8h16" stroke="#4A7C5F" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[#1C1C1C] text-sm font-semibold">{apt.doctor}</p>
              <p className="text-[#7A756E] text-xs font-light">{apt.specialty}</p>
              <p className="text-[#4A7C5F] text-xs font-medium mt-1">{formatDate(apt.date)} · {apt.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
