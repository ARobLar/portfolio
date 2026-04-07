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
              className="flex flex-col items-center justify-center rounded-xl bg-white px-6 py-5 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md min-h-[90px]"
            >
              {c.logo ? (
                <img src={c.logo} alt={c.name} className="h-8 w-auto object-contain" />
              ) : (
                <span className="text-sm font-bold text-slate-700 text-center leading-tight">{c.name}</span>
              )}
              {c.country && (
                <span className="mt-2 text-center text-[10px] text-slate-400">{c.country}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const companies = [
  { name: 'Sopra Steria',      logo: '/logos/soprasteria.svg',    country: 'Sweden' },
  { name: 'Region Stockholm',  logo: '/logos/regionstockholm.svg', country: 'Sweden' },
  { name: 'ABB',               logo: '/logos/abb.svg',             country: 'Sweden' },
  { name: 'Elefant',           logo: null,                         country: 'Sweden' },
  { name: 'Ubit',              logo: null,                         country: 'Sweden' },
  { name: 'Secondry',          logo: null,                         country: 'Sweden' },
  { name: 'All White Online',  logo: null,                         country: 'Europe' },
  { name: 'Ingenius',          logo: null,                         country: 'Global' },
  { name: 'Celebratix',        logo: null,                         country: 'Netherlands' },
  { name: '2M Engineering',    logo: '/logos/2m-engineering.svg',  country: 'Netherlands' },
  { name: "Yoshida's SRL",     logo: null,                         country: 'Japan' },
]
