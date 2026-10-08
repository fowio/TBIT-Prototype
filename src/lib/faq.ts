export type FaqTopic = "Basics" | "Spread" | "Symptoms" | "Treatment" | "Supporting someone"

export const FAQ_TOPICS: FaqTopic[] = ["Basics", "Spread", "Symptoms", "Treatment", "Supporting someone"]

export interface Faq {
  id: string
  topic: FaqTopic
  q: string
  a: string
}

export const FAQS: Faq[] = [
  {
    id: "what",
    topic: "Basics",
    q: "What is tuberculosis (TB)?",
    a: "TB is an infection caused by a bacterium called Mycobacterium tuberculosis. It most often affects the lungs, but it can also affect other parts of the body. TB is curable with the right medicine taken for the full course.",
  },
  {
    id: "latent",
    topic: "Basics",
    q: "What is the difference between latent TB and active TB disease?",
    a: "With latent TB, the bacteria are in the body but the immune system keeps them under control. You feel well and cannot pass TB to others. With active TB disease, the bacteria are multiplying and cause symptoms. Active TB can spread to other people.",
  },
  {
    id: "spread",
    topic: "Spread",
    q: "How does TB spread?",
    a: "TB spreads through the air when a person with active lung TB coughs, sneezes, speaks or sings. Others can breathe in the tiny droplets. It is not spread by sharing food, cups, bedding or by touching.",
  },
  {
    id: "hug",
    topic: "Spread",
    q: "Is it safe to live with or hug someone who has TB?",
    a: "Yes, with some care. After about two weeks of correct treatment, most people are much less infectious. Open windows for fresh air, ask the person to cover coughs, and encourage them to finish every dose. Contact tracing at the clinic checks whether close contacts need testing.",
  },
  {
    id: "symptoms",
    topic: "Symptoms",
    q: "What are the common symptoms?",
    a: "A cough lasting more than two weeks, fever, night sweats, weight loss without trying, tiredness and sometimes coughing up blood or chest pain. If you notice these, see a clinic for a test.",
  },
  {
    id: "test",
    topic: "Symptoms",
    q: "How is TB diagnosed?",
    a: "Common tests are a sputum test (a sample of phlegm), a chest X-ray and rapid molecular tests. A skin or blood test can show whether someone has been infected. A health worker decides which tests you need.",
  },
  {
    id: "length",
    topic: "Treatment",
    q: "How long does TB treatment take?",
    a: "Standard treatment for drug-sensitive TB takes about 6 months: an intensive phase of 2 months with four medicines, then a continuation phase of 4 months. Drug-resistant TB takes longer and needs specialist care.",
  },
  {
    id: "stop",
    topic: "Treatment",
    q: "Why must treatment not be stopped early?",
    a: "Symptoms often fade within weeks, but bacteria are still alive. Stopping early lets them return and can make them resistant to medicine, which is harder and longer to treat. Finish every dose even when you feel well.",
  },
  {
    id: "side",
    topic: "Treatment",
    q: "What side effects can TB medicine cause?",
    a: "Some people have nausea, orange-colored urine (harmless, from rifampicin), joint pain or itching. Yellow skin or eyes, dark urine with pale stools, or numb hands and feet need a clinic visit the same day. Never stop medicine without asking a health worker.",
  },
  {
    id: "prevent",
    topic: "Basics",
    q: "Can TB be prevented?",
    a: "Yes. Finding and treating people with active TB quickly protects others. Good ventilation, covering coughs, and preventive treatment for people at high risk also help. The BCG vaccine protects young children from severe forms of TB.",
  },
  {
    id: "help",
    topic: "Supporting someone",
    q: "How can I support a relative who has TB?",
    a: "Remind them about daily doses, go with them to appointments, and help with meals and rest. Listen without blame. TB is an illness, not a personal failing. Watch for missed doses or side effects and tell their care team.",
  },
  {
    id: "stigma",
    topic: "Supporting someone",
    q: "How do I respond to stigma about TB?",
    a: "Share the facts: TB is curable, and people on treatment for a few weeks are much less infectious. Avoid gossip, keep their diagnosis private unless they choose to share it, and make sure they still feel included at home.",
  },
]
