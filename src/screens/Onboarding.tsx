interface Props {
  onComplete: (hasTB: boolean) => void
}

export default function Onboarding({ onComplete }: Props) {
  return (
    <div className="min-h-dvh page-wash flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm flex flex-col items-center gap-10">
        {/* Logo mark */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 bg-[#4A7C5F] rounded-3xl flex items-center justify-center shadow-lg">
            <svg
              width="52"
              height="52"
              viewBox="0 0 52 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26 6C26 6 14 14 12 26C10 36 16 44 26 46C36 44 42 36 40 26C38 14 26 6 26 6Z"
                fill="white"
                fillOpacity="0.9"
              />
              <path
                d="M26 6C26 6 20 16 20 26C20 34 22 40 26 46"
                stroke="white"
                strokeWidth="1.5"
                strokeOpacity="0.4"
              />
              <path
                d="M18 22C18 22 22 20 26 22C30 24 32 20 36 18"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M16 30C16 30 20 28 24 30C26 31 28 31 30 30C32 29 34 28 36 30"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-[#1C1C1C]">
              TBIT
            </h1>
            <p className="text-[#7A756E] text-base font-light mt-1 leading-relaxed">
              Your TB treatment companion
            </p>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-center text-[#7A756E] text-sm font-light leading-relaxed max-w-xs">
          Track your daily medication, monitor treatment progress, and stay
          connected with your healthcare team.
        </p>

        {/* Choices */}
        <div className="w-full flex flex-col gap-4">
          <button
            onClick={() => onComplete(true)}
            className="w-full bg-[#4A7C5F] text-white rounded-2xl px-6 py-5 text-left hover:bg-[#3d6950] active:scale-[0.98] transition-all shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-base leading-tight">
                  I have been diagnosed
                </div>
                <div className="text-white/70 text-sm font-light mt-0.5">
                  with Tuberculosis (TB)
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={() => onComplete(false)}
            className="w-full bg-[#FDFAF4] text-[#1C1C1C] rounded-2xl px-6 py-5 text-left border border-[rgba(0,0,0,0.08)] hover:bg-white active:scale-[0.98] transition-all shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#EDE8DF] rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="#4A7C5F"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 8v5"
                    stroke="#4A7C5F"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="12"
                    cy="16"
                    r="0.5"
                    fill="#4A7C5F"
                    stroke="#4A7C5F"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-base leading-tight text-[#1C1C1C]">
                  {"I'm just curious"}
                </div>
                <div className="text-[#7A756E] text-sm font-light mt-0.5">
                  Check my TB risk level
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-[#7A756E] text-xs font-light leading-relaxed">
          This app does not replace professional medical advice. Always consult
          a licensed healthcare provider.
        </p>
      </div>
    </div>
  )
}
