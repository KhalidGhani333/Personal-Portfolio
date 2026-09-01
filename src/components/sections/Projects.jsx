import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '../../data/content'

function ProjectCard({ project }) {
  const card = (
    <article
      className={`relative flex h-[420px] w-[85vw] shrink-0 snap-center-item flex-col justify-between overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-br from-[#403f3b] to-[#151412] p-5 sm:h-[440px] sm:w-[60vw] lg:w-[38vw] ${
        project.link ? 'cursor-pointer' : ''
      }`}
    >
      {project.image && (
        <>
          <img src={project.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-center opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0b] via-[#0c0c0b]/60 to-[#0c0c0b]/20" />
        </>
      )}

      <div className="relative flex items-start justify-between gap-3">
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
          {project.number}
        </span>
        <div className="flex flex-wrap justify-end gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white/80 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="relative flex items-end justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">{project.name}</h3>
          <p className="mt-1 text-sm text-white/55">{project.description}</p>
        </div>
        <span
          aria-label={`View ${project.name} project`}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8C200] text-[#1A1A1A]"
        >
          <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
    </article>
  )

  if (!project.link) return card

  return (
    <Link to={project.link} className="contents" aria-label={`Open ${project.name}`}>
      {card}
    </Link>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 bg-[#0c0c0b] py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-[-0.03em] text-white">
          Featured <span className="text-[#E8C200]">Projects</span>
        </h2>
        <p className="mt-4 max-w-xl text-base leading-[1.7] text-white/55">
          Automation systems designed, built, and shipped for teams that needed more than a script - a
          look at some of that work.
        </p>
      </div>

      <div className="no-scrollbar mt-12 snap-x-mandatory overflow-x-auto pb-4">
        <div className="flex gap-6 px-4">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.number} project={project} />
          ))}
          <div className="w-px shrink-0" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
