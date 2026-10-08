import { useState } from "react"

interface Props {
  onComplete: (choice: "app" | "learn") => void
}

const questions = [
  { id: 1, text: "Have you had a persistent cough for more than 2 weeks?", weight: 20 },
  { id: 2, text: "Have you experienced unexplained weight loss recently?", weight: 15 },
  { id: 3, text: "Do you have night sweats that soak through your clothes?", weight: 15 },
  { id: 4, text: "Have you coughed up blood or blood-tinged sputum?", weight: 20 },
  { id: 5, text: "Have you been in close contact with a known TB patient?", weight: 15 },
  { id: 6, text: "Do you feel persistent fatigue or loss of appetite?", weight: 10 },
  { id: 7, text: "Do you have a fever that doesn't resolve after a week?", weight: 15 },
  { id: 8, text: "Have you recently traveled to or lived in a TB-prevalent region?", weight: 10 },
]

function getRiskLevel(score: number): { label: string; color: string; bg: string; description: string } {
  if (score < 25) return { label: "Low Risk", color: "#4A7C5F", bg: "#C8DDD1", description: "Your responses suggest a low likelihood of TB infection. Continue monitoring your health." }
  if (score < 60) return { label: "Moderate Risk", color: "#B7791F", bg: "#FEF3C7", description: "Some symptoms align with TB indicators. A medical evaluation is strongly recommended." }
  return { label: "High Risk", color: "#9B2226", bg: "#F3D0D1", description: "Your responses indicate several TB-related symptoms. Please seek medical attention promptly." }
}

export default function RiskQuiz({ onComplete }: Props) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [showResult, setShowResult] = useState(false)

  const totalScore = answers.reduce((sum, ans, i) => sum + (ans ? questions[i].weight : 0), 0)
  const risk = getRiskLevel(totalScore)

  const handleAnswer = (yes: boolean) => {
    const next = [...answers, yes]
    setAnswers(next)
    if (step + 1 >= questions.length) {
      setShowResult(true)
    } else {
      setStep(step + 1)
    }
  }

  if (showResult) {
    return (
      <div className="min-h-dvh bg-[#EDE8DF] flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm flex flex-col items-center gap-8">
          <div className="text-center">
            <p className="text-[#7A756E] text-sm font-light uppercase tracking-widest mb-2">Your Risk Assessment</p>
            <h2 className="text-3xl font-bold text-[#1C1C1C]">Assessment Complete</h2>
          </div>

          {/* Score dial */}
          <div
            className="w-full rounded-3xl p-8 flex flex-col items-center gap-3"
            style={{ background: risk.bg }}
          >
            <div className="relative flex items-center justify-center">
              <svg width="140" height="100" viewBox="0 0 140 100">
                <path d="M10 90 A60 60 0 0 1 130 90" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="10" strokeLinecap="round"/>
                <path
                  d="M10 90 A60 60 0 0 1 130 90"
                  fill="none"
                  stroke={risk.color}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(totalScore / 120) * 188} 188`}
                />
              </svg>
              <div className="absolute bottom-1 text-center">
                <div className="text-4xl font-bold" style={{ color: risk.color }}>{Math.min(totalScore, 100)}%</div>
              </div>
            </div>
            <div className="text-xl font-semibold" style={{ color: risk.color }}>{risk.label}</div>
            <p className="text-center text-sm font-light text-[#1C1C1C] leading-relaxed">{risk.description}</p>
          </div>

          {/* Healthcare disclaimer */}
          <div className="w-full bg-[#FDFAF4] rounded-2xl p-5 border border-[rgba(0,0,0,0.08)]">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-[#9B2226]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.5" stroke="#9B2226" strokeWidth="1.5"/>
                  <path d="M8 5v4" stroke="#9B2226" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="8" cy="11" r="0.5" fill="#9B2226" stroke="#9B2226"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1C1C1C] mb-1">Important Notice</p>
                <p className="text-xs font-light text-[#7A756E] leading-relaxed">
                  This assessment is not a medical diagnosis. Please consult a licensed healthcare professional or visit a clinic for proper testing. TB is treatable when caught early.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-3">
            <p className="text-sm font-semibold text-[#1C1C1C] text-center">What would you like to do next?</p>
            <button
              onClick={() => onComplete("learn")}
              className="w-full bg-[#4A7C5F] text-white rounded-2xl py-4 font-semibold text-base hover:bg-[#3d6950] active:scale-[0.98] transition-[background-color,transform] shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#355C45]"
            >
              Learn about TB
            </button>
            <button
              onClick={() => onComplete("app")}
              className="w-full bg-[#FDFAF4] text-[#1C1C1C] rounded-2xl py-4 font-semibold text-base hover:bg-white active:scale-[0.98] transition-[background-color,transform] shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#355C45]"
            >
              Use the treatment app
            </button>
          </div>
        </div>
      </div>
    )
  }

  const progress = (step / questions.length) * 100
  const q = questions[step]

  return (
    <div className="min-h-dvh bg-[#EDE8DF] flex flex-col px-6 py-12">
      <div className="w-full max-w-sm mx-auto flex flex-col gap-8 flex-1">
        {/* Header */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-light text-[#7A756E] uppercase tracking-widest">Risk Assessment</span>
            <span className="text-xs font-medium text-[#4A7C5F]">{step + 1} / {questions.length}</span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 bg-[rgba(0,0,0,0.08)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4A7C5F] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="flex-1 flex flex-col justify-center gap-8">
          <div className="bg-[#FDFAF4] rounded-3xl p-8 shadow-sm">
            <div className="w-10 h-10 bg-[#9B2226]/10 rounded-xl flex items-center justify-center mb-5">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8.5" stroke="#9B2226" strokeWidth="1.5"/>
                <path d="M10 6.5v5" stroke="#9B2226" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="10" cy="13.5" r="0.5" fill="#9B2226" stroke="#9B2226"/>
              </svg>
            </div>
            <p className="text-[#1C1C1C] text-xl font-medium leading-snug">{q.text}</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => handleAnswer(true)}
              className="flex-1 bg-[#9B2226] text-white rounded-2xl py-5 font-semibold text-base hover:bg-[#801d21] active:scale-[0.98] transition-all shadow-md"
            >
              Yes
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="flex-1 bg-[#FDFAF4] text-[#1C1C1C] rounded-2xl py-5 font-semibold text-base border border-[rgba(0,0,0,0.08)] hover:bg-white active:scale-[0.98] transition-all shadow-sm"
            >
              No
            </button>
          </div>
        </div>

        <p className="text-center text-[#7A756E] text-xs font-light">
          Answer honestly for an accurate assessment
        </p>
      </div>
    </div>
  )
}
