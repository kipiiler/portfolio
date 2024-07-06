import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/sanity/sanity.query";
import type { ProjectType } from "@/types";

export default async function Project() {
  const projects: ProjectType[] = await getProjects();

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <section className="max-w-7xl mb-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight">
          Featured cool stuff I&apos;ve made 🚀
        </h1>
        <p className="text-base text-zinc-400 leading-relaxed">
          Welcome to my projects page. This is where I showcase the cool stuff
          I&apos;ve been working on. Each project here has a story - late
          nights, wild ideas, and probably too much coffee. Take a look around,
          and if something catches your eye, let me know. I&apos;m always happy
          to geek out about my work!
        </p>

        <p className="text-base text-zinc-400 leading-relaxed mt-4">
          Some of mine projects are open for everyone to see, while others are
          tucked away in private repos (gotta keep a few secrets, right?). If
          you&apos;re a interested in those private ones to get a better sense
          of my craft, I&apos;d love to chat more. Don&apos;t hesitate to reach
          out to me at{" "}
          <a
            href={"mailto:hoangng@cs.washington.edu"}
            className="underline hover:text-orange-500"
          >
            hoangng@cs.washington.edu
          </a>
          .
        </p>
      </section>

      <section className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mb-12">
        {projects.map((project) => (
          <Link
            href={`/projects/${project.slug}`}
            key={project._id}
            className="flex items-center gap-x-4 bg-[#1d1d20] border border-transparent hover:border-zinc-700 p-4 rounded-lg ease-in-out"
          >
            <Image
              src={project.logo}
              width={60}
              height={60}
              alt={project.name}
              className="bg-zinc-800 rounded-md p-2"
            />
            <div>
              <h2 className="font-semibold mb-1">{project.name}</h2>
              <div className="text-sm text-zinc-400">{project.tagline}</div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
