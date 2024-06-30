import Image from "next/image";
import Link from "next/link";
import Logo from "../../icons/dicus-cl.png";
import { getResume } from "@/sanity/sanity.query";
import { FaDownload } from "react-icons/fa";

import { ProfileResumeType } from "@/types";

export default async function Navbar() {
  const resumeObj: ProfileResumeType[] = await getResume();

  return (
    <header className="py-6 md:px-16 px-6 border-b border-zinc-800 z-30 md:mb-28 mb-20">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/">
          <div className="bg-white rounded-md">
            <Image src={Logo} width={50} height={50} alt="logo" />
          </div>
        </Link>
        <nav>
          <ul className="flex items-center gap-x-8">
            <li>
              <Link href="/" className="hover:text-purple-400 duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-gray-400 duration-300 cursor-not-allowed"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-purple-400 duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="hover:text-purple-400 duration-300"
              >
                Projects
              </Link>
            </li>
            <li>
              {resumeObj && (
                <Link
                  href={`${resumeObj[0].resumeURL}?dl=Hoang_Nguyen_resume`}
                  className="hover:text-purple-400 duration-300 flex items-center justify-center gap-x-2 border border-transparent rounded-md duration-200 py-2 text-center font-medium"
                >
                  <FaDownload className="text-base" /> Resume
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
