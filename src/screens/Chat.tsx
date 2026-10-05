import { useState, useRef, useEffect } from "react"

interface Props {
  userName: string
}

interface Message {
  id: number
  from: "bot" | "user"
  text: string
  time: string
}

const BOT_RESPONSES: Record<string, string> = {
  great: "That's wonderful to hear! Consistent well-being is a great sign. Keep taking your medication as prescribed.",
  good: "Glad you're feeling good! Remember to take all 4 of your daily pills and stay hydrated.",
  okay: "Thanks for sharing. If you're experiencing any discomfort, it's worth noting it for your next appointment.",
  tired: "Fatigue can be a side effect of TB medication. Rest is important. If it persists, let Dr. Siti know.",
  pain: "I'm sorry to hear you're in pain. Please contact your healthcare provider if the pain is severe or unusual.",
  cough: "Coughing can be common during treatment. If you're coughing up blood or the cough worsens, seek care immediately.",
  side: "Side effects from TB medication can be challenging. Common ones include nausea, joint pain, and fatigue. Always report them to your doctor.",
  missed: "Missing a dose can affect your treatment. Take the missed dose as soon as you remember, unless it's almost time for the next one.",
}

function getBotReply(userText: string): string {
  const lower = userText.toLowerCase()
  for (const [key, reply] of Object.entries(BOT_RESPONSES)) {
    if (lower.includes(key)) return reply
  }
  return "Thank you for sharing. If you have specific concerns about your treatment or symptoms, please consult with Dr. Siti or a healthcare professional."
}

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

const QUICK_REPLIES = ["Feeling great!", "A bit tired", "I have a cough", "Missed a dose", "Side effects?"]

export default function Chat({ userName }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "bot",
      text: `Hi ${userName}! I'm your TB health assistant. How are you feeling today?`,
      time: getTime(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = { id: Date.now(), from: "user", text: text.trim(), time: getTime() }
    setMessages((m) => [...m, userMsg])
    setInput("")
    setIsTyping(true)
    setTimeout(() => {
      const botMsg: Message = { id: Date.now() + 1, from: "bot", text: getBotReply(text), time: getTime() }
      setMessages((m) => [...m, botMsg])
      setIsTyping(false)
    }, 900)
  }

  return (
    <div className="h-full flex flex-col bg-[#EDE8DF]">
      {/* Header */}
      <div className="px-6 pt-10 pb-4 bg-[#EDE8DF]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#4A7C5F] flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="8" r="4" stroke="white" strokeWidth="1.8"/>
              <path d="M5 19c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <p className="text-[#1C1C1C] text-base font-semibold">TB Health Assistant</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4A7C5F]" />
              <p className="text-[#7A756E] text-xs font-light">Online</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} gap-2`}
          >
            {msg.from === "bot" && (
              <div className="w-8 h-8 rounded-xl bg-[#4A7C5F] flex items-center justify-center flex-shrink-0 self-end mb-4">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="5" r="3" stroke="white" strokeWidth="1.4"/>
                  <path d="M3 14c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </div>
            )}
            <div className={`max-w-[78%] flex flex-col ${msg.from === "user" ? "items-end" : "items-start"}`}>
              <div
                className="px-4 py-3 rounded-2xl text-sm font-light leading-relaxed"
                style={
                  msg.from === "user"
                    ? { background: "#4A7C5F", color: "white", borderBottomRightRadius: "6px" }
                    : { background: "#FDFAF4", color: "#1C1C1C", borderBottomLeftRadius: "6px" }
                }
              >
                {msg.text}
              </div>
              <p className="text-[10px] text-[#B5AFA8] mt-1 px-1">{msg.time}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-end gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#4A7C5F] flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="5" r="3" stroke="white" strokeWidth="1.4"/>
                <path d="M3 14c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="bg-[#FDFAF4] rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5 items-center">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-[#B5AFA8]"
                  style={{ animation: `bounce 1s ${i * 0.15}s infinite` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick replies */}
      <div className="px-6 pb-3 flex gap-2 overflow-x-auto">
        {QUICK_REPLIES.map((reply) => (
          <button
            key={reply}
            onClick={() => sendMessage(reply)}
            className="flex-shrink-0 bg-[#FDFAF4] border border-[rgba(0,0,0,0.08)] rounded-full px-4 py-2 text-xs font-medium text-[#1C1C1C] hover:bg-white active:scale-95 transition-all"
          >
            {reply}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 pb-4">
        <div className="bg-[#FDFAF4] rounded-2xl flex items-center gap-3 px-4 py-2 shadow-sm border border-[rgba(0,0,0,0.06)]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-[#1C1C1C] text-sm font-light placeholder-[#B5AFA8] outline-none py-2"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="w-9 h-9 rounded-xl bg-[#4A7C5F] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#3d6950] active:scale-95 transition-all flex-shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14 2L7 9M14 2l-4.5 12L7 9 2 6.5 14 2z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  )
}
