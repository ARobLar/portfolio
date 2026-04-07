export default function CompanyBanner() {
  return (
    <section className="border-y border-slate-100 bg-slate-50 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
          Companies & clients I have worked with
        </p>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {companies.map((c) => (
            <div
              key={c.name}
              className="flex flex-col items-center justify-center rounded-xl bg-white px-6 py-5 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md"
            >
              <span className="text-2xl">{c.icon}</span>
              <span className="mt-2 text-center text-xs font-semibold text-slate-500">{c.name}</span>
              {c.country && (
                <span className="mt-0.5 text-center text-[10px] text-slate-400">{c.country}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const companies = [
  { name: 'Sopra Steria', icon: '🏢', country: 'Sweden' },
  { name: 'Region Stockholm', icon: '🏥', country: 'Sweden' },
  { name: 'ABB', icon: '⚙️', country: 'Sweden' },
  { name: 'Elefant', icon: '🐘', country: 'Sweden' },
  { name: 'Secondry', icon: '📈', country: 'Sweden' },
  { name: 'All White Online', icon: '🛒', country: 'Europe' },
  { name: 'Ingenius', icon: '🎓', country: 'Global' },
  { name: 'Celebratix', icon: '🎟️', country: 'Netherlands' },
  { name: '2M Engineering', icon: '🩺', country: 'Netherlands' },
  { name: "Yoshida's SRL", icon: '🚀', country: 'Japan' },
]
