"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getJob } from "@/sanity/sanity.query";
import type { JobType } from "@/types";
import { PortableText } from "next-sanity";
import { CustomPortableText } from "./CustomPortableText";

function JobDetail({ data }: { data: JobType }) {
  const [open, setOpen] = useState(false);

  function handleClickReadMore() {
    setOpen(!open);
  }

  return (
    <>
      <p
        onClick={handleClickReadMore}
        className="text-base text-zinc-400 my-1 underline cursor-pointer hover:text-orange-500 text-right w-full"
      >
        {!open ? "Read more technical details" : "Close"}
      </p>
      {open && (
        <div className="text-zinc-400 my-1 w-full">
          <PortableText
            value={data.detail_description}
            components={CustomPortableText}
          />
        </div>
      )}
    </>
  );
}

export default function Job() {
  const [job, setJob] = useState<JobType[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchJob() {
      const jobData = await getJob();
      setJob(jobData);
    }

    fetchJob();
  }, []);

  return (
    <section className="mt-32">
      <div className="mb-16">
        <h2 className="font-semibold text-4xl mb-4">Work Experience</h2>
      </div>

      <div className="flex flex-col gap-y-12">
        {job.length == 0 && (
          <p className="text-base text-zinc-400 my-4">Loading...</p>
        )}
        {job &&
          job
            .sort(function (a, b) {
              return (
                new Date(b.startDate).getTime() -
                new Date(a.startDate).getTime()
              );
            })
            .map((data) => (
              <div
                key={data._id}
                className="flex items-start lg:gap-x-8 gap-x-4 max-w-5xl relative before:absolute before:bottom-0 before:top-[4.5rem] before:left-7 before:w-[1px] before:h-[calc(100%-50px)] before:bg-zinc-800"
              >
                <a
                  href={data.url}
                  rel="noreferrer noopener"
                  className="min-h-[60px] min-w-[60px] rounded-md overflow-clip relative"
                >
                  <Image
                    src={data.logo}
                    className="object-cover"
                    alt={`${data.name} logo`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  />
                </a>
                <div className="flex flex-col items-start">
                  <a
                    href={data.url}
                    rel="noreferrer noopener"
                    className="min-h-[60px] min-w-[60px] rounded-md overflow-clip relative"
                  >
                    <h3 className="text-xl font-bold">{data.name}</h3>
                    <p>{data.jobTitle}</p>
                  </a>
                  <small className="text-sm text-zinc-500 mt-2 tracking-widest uppercase">
                    {data.startDate.toString()} -{" "}
                    {new Date(data.endDate).getTime() > Date.now()
                      ? "Present"
                      : data.endDate.toString()}
                  </small>
                  <p className="text-base text-zinc-400 mt-4 mb-2">
                    {data.company_description}
                  </p>
                  <p className="text-base text-zinc-400 my-4">
                    {data.description}
                  </p>
                  <JobDetail data={data} />
                </div>
              </div>
            ))}
      </div>
    </section>
  );
}
