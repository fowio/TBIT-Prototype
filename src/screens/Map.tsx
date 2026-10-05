import { useState } from "react"

type Category = "TB Clinic" | "Clinic" | "Pharmacy" | "Hospital"

const clinics: {
  id: number
  name: string
  type: string
  category: Category
  distance: string
  address: string
  phone: string
  hours: string
  rating: number
}[] = [
  {
    id: 1,
    name: "Puskesmas Menteng — Poli TB DOTS",
    type: "TB specialist",
    category: "TB Clinic",
    distance: "0.8 km",
    address: "Jl. Pegangsaan No. 12, Menteng, Jakarta Pusat",
    phone: "+62 21 3190 4432",
    hours: "Mon–Fri, 8 AM – 3 PM WIB",
    rating: 4.6,
  },
  {
    id: 2,
    name: "Klinik Pratama Sehat Sentosa",
    type: "General health center",
    category: "Clinic",
    distance: "1.4 km",
    address: "Jl. Cikini Raya No. 45, Jakarta Pusat",
    phone: "+62 21 3909 8821",
    hours: "Mon–Sat, 7 AM – 7 PM WIB",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Apotek Kimia Farma Cikini",
    type: "Pharmacy",
    category: "Pharmacy",
    distance: "0.3 km",
    address: "Jl. Cikini Raya No. 8, Jakarta Pusat",
    phone: "+62 21 3141 2200",
    hours: "Daily, 8 AM – 10 PM WIB",
    rating: 4.7,
  },
  {
    id: 4,
    name: "RSUP Persahabatan — Poli Paru",
    type: "Hospital specialist",
    category: "Hospital",
    distance: "2.1 km",
    address: "Jl. Persahabatan Raya No. 1, Rawamangun, Jakarta Timur",
    phone: "+62 21 4891 0000",
    hours: "Emergency 24 hours",
    rating: 4.9,
  },
]

const FILTERS: ("All" | Category)[] = ["All", "TB Clinic", "Clinic", "Pharmacy", "Hospital"]

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path
            d="M5 1l1.12 2.27 2.51.37-1.82 1.77.43 2.5L5 6.77 2.76 7.91l.43-2.5L1.37 3.64l2.51-.37z"
            fill={i < Math.floor(rating) ? "#B7791F" : "rgba(0,0,0,0.1)"}
          />
        </svg>
      ))}
      <span className="text-[10px] text-[#7A756E] ml-1">{rating}</span>
    </div>
  )
}

export default function Map() {
  const [selected, setSelected] = useState<number | null>(1)
  const [filter, setFilter] = useState<"All" | Category>("All")
  const [query, setQuery] = useState("")

  const q = query.trim().toLowerCase()
  const visible = clinics.filter(
    (c) =>
      (filter === "All" || c.category === filter) &&
      (!q || c.name.toLowerCase().includes(q) || c.address.toLowerCase().includes(q)),
  )

  return (
    <div className="h-full flex flex-col page-wash overflow-y-auto">
      <div className="px-6 pt-10 pb-4">
        <h1 className="text-3xl font-bold text-[#1C1C1C]">Nearby</h1>
        <p className="text-[#7A756E] text-sm">Clinics & pharmacies near you</p>
      </div>

      <div
        className="mx-6 mb-5 h-52 shrink-0 rounded-3xl bg-[#E6DCC8] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] flex items-center justify-center"
        role="img"
        aria-label="Map placeholder"
      >
        <span className="text-7xl font-bold tracking-[0.2em] text-[#355C45]/30 select-none">MAP</span>
      </div>

      <div className="px-6 mb-3 shrink-0">
        <label className="flex items-center gap-2 bg-white rounded-full px-4 py-3 shadow-sm">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="5" stroke="#7A756E" strokeWidth="1.5" />
            <path d="M11 11l3 3" stroke="#7A756E" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search clinics and pharmacies"
            placeholder="Search clinics & pharmacies"
            className="flex-1 bg-transparent outline-none text-base sm:text-sm placeholder:text-[#7A756E]"
          />
        </label>
      </div>

      <div className="px-6 mb-4 flex gap-2 overflow-x-auto shrink-0" role="group" aria-label="Filter by type">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`shrink-0 min-h-9 px-4 rounded-full text-xs font-medium transition-colors ${
              filter === f ? "bg-[#4A7C5F] text-white" : "bg-[#FDFAF4] text-[#7A756E]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="px-6 pb-6 flex flex-col gap-3">
        {visible.length === 0 && (
          <div className="bg-[#FDFAF4] rounded-2xl p-5 text-center shrink-0">
            <p className="font-semibold text-sm">No results</p>
            <p className="text-xs text-[#7A756E] mt-1">Try a different search or filter.</p>
            <button
              onClick={() => {
                setFilter("All")
                setQuery("")
              }}
              className="mt-3 bg-[#4A7C5F] text-white rounded-xl px-4 py-2 text-xs font-medium"
            >
              Show all places
            </button>
          </div>
        )}
        {visible.map((clinic) => (
          <div
            key={clinic.id}
            className="w-full shrink-0 bg-[#FDFAF4] rounded-2xl shadow-sm transition-shadow"
            style={selected === clinic.id ? { boxShadow: "0 0 0 2px #4A7C5F" } : {}}
          >
            <button
              onClick={() => setSelected(selected === clinic.id ? null : clinic.id)}
              aria-expanded={selected === clinic.id}
              className="w-full text-left p-4"
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: clinic.category === "Pharmacy" ? "#C8DDD1" : "#E6DCC8" }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    {clinic.category === "Pharmacy" ? (
                      <path d="M4 8h12M8 4v12M10 2h-6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V8" stroke="#4A7C5F" strokeWidth="1.5" strokeLinecap="round" />
                    ) : (
                      <>
                        <path d="M10 2C7.239 2 5 4.239 5 7c0 4.375 5 11 5 11s5-6.625 5-11c0-2.761-2.239-5-5-5z" stroke="#355C45" strokeWidth="1.5" />
                        <circle cx="10" cy="7" r="2" stroke="#355C45" strokeWidth="1.5" />
                      </>
                    )}
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[#1C1C1C] text-sm font-semibold leading-tight">{clinic.name}</p>
                      <p className="text-[#7A756E] text-xs mt-0.5">{clinic.type}</p>
                    </div>
                    <span className="text-[#4A7C5F] text-xs font-semibold flex-shrink-0">{clinic.distance}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <Stars rating={clinic.rating} />
                    <p className="text-[#7A756E] text-[10px]">{clinic.hours}</p>
                  </div>
                  {selected === clinic.id && (
                    <p className="mt-2 text-xs text-[#7A756E]">{clinic.address}</p>
                  )}
                </div>
              </div>
            </button>
            {selected === clinic.id && (
              <div className="px-4 pb-4 flex gap-3">
                <a
                  href={`tel:${clinic.phone.replace(/\s/g, "")}`}
                  className="flex-1 bg-[#4A7C5F] text-white rounded-xl py-2.5 text-xs font-medium text-center"
                >
                  Call
                </a>
                <button className="flex-1 bg-[#EDE8DF] text-[#1C1C1C] rounded-xl py-2.5 text-xs font-medium">
                  Directions
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
