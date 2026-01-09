"use client";

import Link from "next/link";
import { use } from "react";
import projectData from "@/data/projectData";

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = projectData[slug];

  if (!project) {
    return (
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-10 sm:px-10">
        <h1 className="text-2xl font-semibold text-[#0F2A44]">Project not found</h1>
        <p className="mt-2 text-sm text-gray-600">Please return to Projects and choose another entry.</p>
        <div className="mt-4">
          <Link href="/projects" className="rounded-full bg-[var(--bbd-accent)] px-6 py-2 text-white">Back to Projects</Link>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <h1 className="text-4xl font-semibold text-[#0F2A44]">{project.name}</h1>
        <p className="mt-3 max-w-3xl text-gray-600">
          A flagship infrastructure project demonstrating execution excellence and regional impact.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 rounded-lg bg-[#0B3D91] p-6 text-white md:grid-cols-4">
          <Info title="Project Value" value={project.value} />
          <Info title="Location" value={project.location} />
          <Info title="Sector" value={project.sector} />
          <Info title="Status" value={project.status} />
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-semibold text-[#0F2A44]">Scope of Work</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
            {project.scope.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-semibold text-[#0F2A44]">Impact</h2>
          <p className="mt-4 max-w-4xl text-gray-700 leading-relaxed">{project.impact}</p>
        </div>

        <div className="mt-16 rounded-lg bg-[#0F2A44] p-8 text-white">
          <h3 className="text-xl font-semibold">Ready to discuss a similar mandate?</h3>
          <p className="mt-2 text-gray-200">
            Connect with our team to explore how we can deliver large-scale infrastructure solutions.
          </p>
          <div className="mt-4">
            <Link href="/contact" className="inline-flex items-center rounded-full bg-[var(--bbd-accent)] px-6 py-2 text-white">
              Get in touch →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-white/80">{title}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
