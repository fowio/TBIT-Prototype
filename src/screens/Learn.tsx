import { useId, useMemo, useState } from "react"
import { FAQS, FAQ_TOPICS, type FaqTopic } from "../lib/faq"

type Filter = "All" | FaqTopic

export default function Learn({ onSwitchRole }: { onSwitchRole: () => void }) {
  const [filter, setFilter] = useState<Filter>("All")
  const [query, setQuery] = useState("")
  const [openId, setOpenId] = useState<string | null>(null)
  const searchId = useId()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return FAQS.filter(
      (f) =>
        (filter === "All" || f.topic === filter) &&
        (!q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)),
    )
  }, [filter, query])

  const clear = () => {
    setFilter("All")
    setQuery("")
  }

  return (
    <div className="h-full flex flex-col page-wash overflow-y-auto">
      <div className="px-6 pt-10 pb-4 shrink-0">
        <h1 className="text-3xl font-bold text-[#1C1C1C] text-balance">Learn about TB</h1>
        <p className="text-sm text-[#7A756E] mt-1 text-pretty max-w-[60ch]">
          Plain answers to common questions about tuberculosis, for anyone who wants to understand it.
        </p>
        <button
          onClick={onSwitchRole}
          className="mt-3 min-h-11 px-4 rounded-full bg-[#FDFAF4] text-[#355C45] text-sm font-semibold shadow-sm transition-transform active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#355C45]"
        >
          Switch user type
        </button>
      </div>

      <div className="px-6 shrink-0">
        <label htmlFor={searchId} className="sr-only">
          Search questions
        </label>
        <div className="flex items-center gap-2 bg-[#FDFAF4] rounded-full px-4 h-12 shadow-sm text-[#7A756E] focus-within:ring-2 focus-within:ring-[#4A7C5F]">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" /><path d="M14 14l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          <input
            id={searchId}
            type="search"
            name="faq-search"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions, e.g. cough"
            className="flex-1 bg-transparent outline-none text-base sm:text-sm text-[#1C1C1C] placeholder:text-[#7A756E]"
          />
        </div>
      </div>

      <div
        role="group"
        aria-label="Filter by topic"
        className="snap-row flex gap-2 overflow-x-auto px-6 py-4 shrink-0"
      >
        {(["All", ...FAQ_TOPICS] as Filter[]).map((t) => {
          const active = filter === t
          return (
            <button
              key={t}
              onClick={() => setFilter(t)}
              aria-pressed={active}
              className={`shrink-0 min-h-11 px-4 rounded-full text-sm font-medium whitespace-nowrap transition-colors active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#355C45] ${
                active ? "bg-[#4A7C5F] text-white" : "bg-[#FDFAF4] text-[#1C1C1C] shadow-sm"
              }`}
            >
              {t}
            </button>
          )
        })}
      </div>

      <div className="px-6 pb-8">
        <p className="text-xs text-[#7A756E] mb-3 tabular-nums" aria-live="polite">
          {results.length} {results.length === 1 ? "question" : "questions"}
        </p>

        {results.length === 0 ? (
          <div className="bg-[#FDFAF4] rounded-2xl shadow-sm p-6 text-center">
            <p className="font-semibold text-[#1C1C1C]">
              {query.trim() ? `No results for "${query.trim()}"` : "No questions in this topic yet"}
            </p>
            <p className="text-sm text-[#7A756E] mt-1">Try a shorter word or another topic.</p>
            <button
              onClick={clear}
              className="mt-4 min-h-11 px-5 rounded-full bg-[#4A7C5F] text-white text-sm font-semibold active:scale-[0.96] transition-transform"
            >
              Show all questions
            </button>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {results.map((f) => {
              const open = openId === f.id
              return (
                <li key={f.id} className="bg-[#FDFAF4] rounded-2xl shadow-sm">
                  <h2>
                    <button
                      onClick={() => setOpenId(open ? null : f.id)}
                      aria-expanded={open}
                      aria-controls={`faq-${f.id}`}
                      className="w-full min-h-14 flex items-center justify-between gap-3 px-4 py-3 text-left rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#355C45]"
                    >
                      <span className="text-[15px] font-semibold leading-snug text-[#1C1C1C] text-pretty">
                        {f.q}
                      </span>
                      <svg width="18" height="18" viewBox="0 0 12 12" fill="none" aria-hidden="true"
                        className={`shrink-0 text-[#4A7C5F] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                      ><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                  </h2>
                  {open && (
                    <div id={`faq-${f.id}`} className="px-4 pb-4">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#355C45] mb-1">
                        {f.topic}
                      </p>
                      <p className="text-sm leading-relaxed text-[#1C1C1C]/80 max-w-[65ch]">{f.a}</p>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        )}

        <p className="text-xs text-[#7A756E] mt-6 text-pretty">
          This information is general. For medical advice, talk to a licensed health worker.
        </p>
      </div>
    </div>
  )
}
