"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../icons/dicus-cl.png";
import { getResume } from "@/sanity/sanity.query";
import { FaDownload, FaBars } from "react-icons/fa";
import { use, useEffect, useState } from "react";

import { ProfileResumeType } from "@/types";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [resumeObj, setResumeObject] = useState<ProfileResumeType[]>([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    async function fetchResume() {
      const resumeData = await getResume();
      setResumeObject(resumeData);
    }

    fetchResume();
  }, []);

  //   const resumeObj: ProfileResumeType[] = await getResume();
  return (
    <header className="py-6 md:px-16 px-6 border-b border-zinc-800 z-30 md:mb-28 mb-4">
      <div className="max-w-6xl mx-auto flex items-center justify-start">
        <div className="flex items-center md:w-full md:justify-between justify-start">
          <Link href="/" className="mr-4">
            <div className="bg-white rounded-md hidden md:block">
              <Image src={Logo} width={50} height={50} alt="logo" />
            </div>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-x-8">
              <NavItems resumeObj={resumeObj} />
            </ul>
          </nav>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <FaBars size={24} />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col items-start gap-y-4">
            <NavItems resumeObj={resumeObj} />
          </ul>
        </div>
      )}
    </header>
  );
}

function NavItems({ resumeObj }: { resumeObj: ProfileResumeType[] }) {
  return (
    <>
      <li className="ml-4 md:ml-0">
        <Link href="/" className="font-mono hover:text-orange-400 duration-300">
          /..
        </Link>
      </li>
      <li className="ml-4 md:ml-0">
        <Link
          href="/blogs"
          className="font-mono hover:text-gray-400 duration-300"
        >
          /blog
        </Link>
      </li>
      <li className="ml-4 md:ml-0">
        <Link
          href="/about"
          className="font-mono hover:text-orange-400 duration-300"
        >
          /about
        </Link>
      </li>
      <li className="ml-4 md:ml-0">
        <Link
          href="/projects"
          className="font-mono hover:text-orange-400 duration-300"
        >
          /projects
        </Link>
      </li>
      <li className="ml-4 md:ml-0">
        {resumeObj.length > 0 && (
          <Link
            onClick={() => {
              const event = ({ action, category, label, value }: any) => {
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
            }}
            href={`${resumeObj[0].resumeURL}?dl=Hoang_Nguyen_resume.pdf`}
            className="font-mono hover:text-orange-400 duration-300 flex items-center gap-x-2 border border-transparent rounded-md duration-200 py-2 text-left font-medium"
          >
            /resume <FaDownload className="text-base" />
          </Link>
        )}
      </li>
    </>
  );
}
