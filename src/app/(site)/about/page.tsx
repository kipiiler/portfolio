// app/about/page.tsx
"use client";

import Image from "next/image";
import { getProfile } from "@/sanity/sanity.query";
import type { ProfileType } from "@/types";
import { PortableText } from "@portabletext/react";
import { BiEnvelope, BiFile } from "react-icons/bi";
import { useEffect, useState } from "react";

const CustomLink = ({ children, value }: any) => {
  const { href } = value;
  return (
    <a
      className="font-semibold underline"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default function About() {
  //   const profile: ProfileType[] = await getProfile();

  const [profile, setProfile] = useState<ProfileType[]>([]);

  useEffect(() => {
    async function fetchProfile() {
      const profileData = await getProfile();
      setProfile(profileData);
      console.log(profileData);
    }

    fetchProfile();
  }, []);

  const components = {
    marks: {
      link: ({ children, value }: any) => {
        return <CustomLink value={value}>{children}</CustomLink>;
      },
    },
  };

  return (
    <main className="lg:max-w-7xl mx-auto max-w-3xl md:px-16 px-6">
      {profile &&
        profile.map((data) => (
          <div key={data._id}>
            <section className="grid lg:grid-cols-2 grid-cols-1 gap-x-6 justify-items-center">
              <div className="order-2 lg:order-none">
                <h1 className="lg:text-5xl text-4xl lg:leading-tight basis-1/2 font-bold mb-8">
                  Hi, I&apos;m {data.fullName} based in {data.location}.
                </h1>

                <div className="flex flex-col gap-y-3 text-zinc-400 leading-relaxed">
                  <PortableText components={components} value={data.fullBio} />
                </div>
              </div>

              <div className="flex flex-col lg:justify-self-center justify-self-start gap-y-8 lg:order-1 order-none mb-12">
                <div>
                  <Image
                    className="rounded-2xl mb-4 object-cover max-h-96 min-h-96 bg-top bg-[#1d1d20]"
                    src={data.profileImage.image}
                    width={400}
                    height={400}
                    quality={100}
                    alt={data.profileImage.alt}
                  />

                  <button
                    onClick={() => {
                      const event = ({
                        action,
                        category,
                        label,
                        value,
                      }: any) => {
                        (window as any).gtag("event", action, {
                          event_category: category,
                          event_label: label,
                          value: value,
                        });
                      };
                      event({
                        action: "download",
                        category: "resume",
                        label: "resume",
                        value: 1,
                      });
                      window.open(
                        `${data.resumeURL}?dl=${data.fullName}_resume.pdf`,
                        "_blank"
                      );
                    }}
                    className="w-full flex items-center justify-center gap-x-2 bg-[#1d1d20] border border-transparent hover:border-zinc-700 rounded-md duration-200 py-2 text-center cursor-cell font-medium"
                  >
                    <BiFile className="text-base" /> Download Resumé
                  </button>
                </div>

                <ul>
                  <li>
                    <a
                      href={`mailto:${data.email}`}
                      className="flex items-center gap-x-2 hover:text-orange-400 duration-300"
                    >
                      <BiEnvelope className="text-lg" />
                      {data.email}
                    </a>
                  </li>
                </ul>
              </div>
            </section>

            <section className="mt-24 max-w-5xl">
              <h2 className="font-semibold text-4xl mb-4">Expertise</h2>
              <p className="text-zinc-400 max-w-lg">
                Over the years, I&apos;ve cultivated a diverse set of skills.
                Here&apos;s a snapshot of what I bring to the table:
              </p>

              <ul className="flex flex-wrap items-center gap-3 mt-8">
                {data.skills.map((skill, id) => (
                  <li
                    key={id}
                    className="bg-[#1d1d20] border border-transparent hover:border-zinc-700 rounded-md px-2 py-1"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        ))}
    </main>
  );
}
