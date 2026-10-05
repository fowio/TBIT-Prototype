export interface Drug {
  name: string
  dose: string
  description: string
  usage: string
}

export const REGIMEN: Drug[] = [
  {
    name: "Isoniazid (H)",
    dose: "300 mg · 1x daily",
    description:
      "A bactericidal antibiotic that kills actively dividing TB bacteria. It is the backbone of almost every TB regimen.",
    usage:
      "Taken for the full 6 months (2 months intensive, 4 months continuation). Take on an empty stomach. Your doctor may add vitamin B6 to prevent tingling in hands and feet.",
  },
  {
    name: "Rifampicin (R)",
    dose: "600 mg · 1x daily",
    description:
      "A powerful antibiotic that kills TB bacteria, including slow-growing ones hiding in tissue. It shortens treatment time.",
    usage:
      "Taken for 6 months, ideally 30-60 minutes before breakfast. It harmlessly turns urine, sweat and tears orange-red. It can weaken hormonal contraceptives.",
  },
  {
    name: "Pyrazinamide (Z)",
    dose: "1500 mg · 1x daily",
    description:
      "A sterilizing drug that works in the acidic environment inside infected cells, clearing bacteria other drugs miss.",
    usage:
      "Taken only in the first 2 months (intensive phase). Report joint pain, dark urine or yellowing of the eyes to your doctor right away.",
  },
  {
    name: "Ethambutol (E)",
    dose: "1200 mg · 1x daily",
    description:
      "A bacteriostatic drug that stops TB bacteria from multiplying and protects the other drugs from resistance.",
    usage:
      "Taken in the first 2 months, sometimes longer. Report blurred vision or difficulty telling red from green colors immediately.",
  },
]

export interface Appointment {
  doctor: string
  specialty: string
  date: Date
  time: string
}

export const APPOINTMENTS: Appointment[] = [
  { doctor: "Dr. Siti Rahmawati, Sp.P", specialty: "Pulmonologist (Sp.P)", date: new Date(2026, 9, 12), time: "10:00 AM" },
  { doctor: "dr. Budi Santoso", specialty: "Puskesmas TB Program", date: new Date(2026, 10, 15), time: "2:30 PM" },
]

export function addDays(d: Date, n: number) {
  const r = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  r.setDate(r.getDate() + n)
  return r
}

export function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}
