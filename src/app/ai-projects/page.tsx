import Link from 'next/link'
import { ArrowLeft, ExternalLink, FolderGit2, Bot } from 'lucide-react'
import { AI_PROJECTS } from '../../data/content'
import type { GridProject } from '../../lib/types'
import ProjectThumb from '../../components/ProjectThumb'
import Reveal from '../../components/GsapReveal'
import HeadingReveal from '../../components/HeadingReveal'

export const metadata = {
  title: 'AI Projects | Khalid Ghani',
}

function AIProjectCard({ project, index }: { project: GridProject; index: number }) {
  return (
    <Reveal
      as="article"
      effect="blur"
      delay={(index % 3) * 0.12}
      className="flex flex-col overflow-hidden rounded-[20px] border border-[#1A1A1A]/10 bg-white/60"
    >
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.name} preview`}
          loading="lazy"
          className="aspect-[5/3] w-full object-cover object-top"
        />
      ) : (
        <ProjectThumb name={project.name} Icon={project.Icon} tone={project.tone} className="aspect-[5/3] w-full" />
      )}

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold tracking-tight text-[#1A1A1A]">{project.name}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[#1A1A1A]/60">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#1A1A1A]/5 px-2.5 py-1 text-[10px] font-semibold text-[#1A1A1A]/70"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#1A1A1A] px-4 py-2.5 text-xs font-semibold text-[#E8C200]"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              Live Preview
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center justify-center gap-1.5 rounded-full border-2 border-[#1A1A1A]/15 px-4 py-2.5 text-xs font-semibold text-[#1A1A1A] ${
                project.live ? '' : 'flex-1'
              }`}
            >
              <FolderGit2 className="h-3.5 w-3.5" aria-hidden="true" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </Reveal>
  )
}

function EmptyState() {
  return (
    <div className="mt-12 flex flex-col items-center gap-3 rounded-[20px] border border-dashed border-[#1A1A1A]/15 bg-white/40 px-6 py-20 text-center">
      <Bot className="h-8 w-8 text-[#1A1A1A]/30" aria-hidden="true" />
      <p className="text-sm font-medium text-[#1A1A1A]/50">AI projects are being added here soon.</p>
    </div>
  )
}

export default function AIProjectsPage() {
  return (
    <div className="min-h-screen bg-[#DCD8CF]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A1A1A]/60 transition-colors hover:text-[#1A1A1A]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to portfolio
        </Link>

        <HeadingReveal
          as="h1"
          className="mt-6 text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[0.95] tracking-[-0.03em] text-[#1A1A1A]"
        >
          AI <span className="text-[#E8C200]">Projects</span>
        </HeadingReveal>
        <Reveal as="p" effect="up" delay={0.1} className="mt-4 max-w-xl text-base leading-[1.7] text-[#1A1A1A]/65">
          AI agents and workflows I&apos;ve built - here are some of them.
        </Reveal>

        {AI_PROJECTS.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {AI_PROJECTS.map((project, index) => (
              <AIProjectCard key={project.name} project={project} index={index} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  )
}
