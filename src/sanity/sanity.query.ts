import { groq } from "next-sanity";
import client from "./sanity.client";

export async function getProfile() {
  const query = groq`*[_type == "profile"]{
      _id,
      fullName,
      headline,
      profileImage {alt, "image": asset->url},
      shortBio,
      location,
      fullBio,
      email,
      "resumeURL": resumeURL.asset->url,
      socialLinks,
      skills
    }`;
  return await client.fetch(query);
}

export async function getJob() {
  const query = groq`*[_type == "job"]{
      _id,
      name,
      jobTitle,
      "logo": logo.asset->url,
      url,
      description,
      startDate,
      endDate,
    }`;
  return await client.fetch(query);
}

export async function getProjects() {
  const query = groq`*[_type == "project"]{
      _id, 
      name,
      "slug": slug.current,
      tagline,
      "logo": logo.asset->url,
    }`;
  return await client.fetch(query);
}

export async function getSingleProject(slug: string) {
  return client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      name,
      projectUrl,
      coverImage { alt, "image": asset->url },
      tagline,
      description
    }`,
    { slug }
  );
}
