import { Marquee } from '../ui/Marquee'

const tools = [
  { name: 'n8n', category: 'Automatización' },
  { name: 'OpenAI GPT-4', category: 'IA Generativa' },
  { name: 'Claude AI', category: 'IA Generativa' },
  { name: 'ElevenLabs', category: 'Voz IA' },
  { name: 'WhatsApp Business', category: 'Mensajería' },
  { name: 'Google Workspace', category: 'Productividad' },
  { name: 'HubSpot', category: 'CRM' },
  { name: 'Airtable', category: 'Base de datos' },
  { name: 'Make', category: 'Automatización' },
  { name: 'Zapier', category: 'Integración' },
  { name: 'Notion', category: 'Gestión' },
  { name: 'Slack', category: 'Comunicación' },
  { name: 'Meta Ads', category: 'Publicidad' },
  { name: 'Google Ads', category: 'Publicidad' },
  { name: 'Groq AI', category: 'Inferencia IA' },
  { name: 'Google Drive', category: 'Almacenamiento' },
]

function ToolItem({ name, category }: { name: string; category: string }) {
  return (
    <div className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] hover:border-accent/20 hover:bg-accent/[0.03] transition-all duration-300 group cursor-default flex-shrink-0">
      <div className="h-1.5 w-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors shadow-[0_0_6px_rgba(212,175,55,0.3)]" />
      <span className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors whitespace-nowrap">
        {name}
      </span>
      <span className="text-[10px] text-white/20 group-hover:text-accent/40 transition-colors tracking-wider uppercase font-medium">
        {category}
      </span>
    </div>
  )
}

export function ToolsMarquee() {
  return (
    <section className="relative py-10 overflow-hidden">
      {/* Top/bottom fade lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

      <div className="mb-4 text-center">
        <span className="text-[10px] font-semibold tracking-[0.25em] text-white/20 uppercase">
          Herramientas que integramos
        </span>
      </div>

      <Marquee speed={40} pauseOnHover>
        {tools.map((tool) => (
          <ToolItem key={tool.name} {...tool} />
        ))}
      </Marquee>
    </section>
  )
}
