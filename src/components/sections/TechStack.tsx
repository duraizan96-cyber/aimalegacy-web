import { Marquee } from '../ui/Marquee'
import { ScrollReveal } from '../ui/ScrollReveal'

const tools = [
  { name: 'n8n', desc: 'Automatizaci\u00f3n' },
  { name: 'Meta Ads', desc: 'Publicidad' },
  { name: 'Google Ads', desc: 'Publicidad' },
  { name: 'ChatGPT', desc: 'IA Generativa' },
  { name: 'Telegram', desc: 'Notificaciones' },
  { name: 'Airtable', desc: 'CRM' },
  { name: 'Google Sheets', desc: 'Datos' },
  { name: 'Instagram', desc: 'Contenido' },
  { name: 'ElevenLabs', desc: 'Voz IA' },
  { name: 'Creatomate', desc: 'Video IA' },
  { name: 'WhatsApp', desc: 'Comunicaci\u00f3n' },
  { name: 'Slack', desc: 'Equipo' },
]

function ToolChip({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-3 hover:border-accent/20 hover:bg-accent/[0.03] transition-all duration-300 group cursor-default whitespace-nowrap">
      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-xs font-bold text-accent group-hover:from-accent/30 group-hover:to-accent/10 transition-all">
        {name.slice(0, 2)}
      </div>
      <div>
        <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
          {name}
        </span>
        <span className="block text-[10px] text-white/30 uppercase tracking-wider">
          {desc}
        </span>
      </div>
    </div>
  )
}

export function TechStack() {
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      {/* Subtle top line */}
      <div className="line-glow mx-auto max-w-xl mb-12" />

      <ScrollReveal className="text-center mb-10 px-6">
        <span className="text-[11px] font-semibold tracking-[0.2em] text-white/30 uppercase">
          Stack tecnol\u00f3gico
        </span>
        <h3 className="mt-2 text-lg sm:text-xl font-semibold text-white/60">
          Herramientas que usamos para{' '}
          <span className="text-gradient-accent-static">tus automatizaciones</span>
        </h3>
      </ScrollReveal>

      <Marquee speed={35}>
        {tools.map((t) => (
          <ToolChip key={t.name} {...t} />
        ))}
      </Marquee>

      {/* Bottom line */}
      <div className="line-glow mx-auto max-w-xl mt-12" />
    </section>
  )
}
