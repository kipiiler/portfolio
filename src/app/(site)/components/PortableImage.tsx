import Image from "next/image";
import { urlFor } from "@/sanity/sanity.image";

type imageComponentProp = {
  src: {};
  alt: string;
};

function ImageComponent({ src, alt }: imageComponentProp) {
  return (
    <Image
      className="rounded-sm object-cover object-left-top aspect-auto duration-300"
      src={urlFor(src).url()}
      alt={alt}
      loading="lazy"
      width={1920}
      height={1080}
      placeholder="blur"
      quality={100}
      sizes="80vw"
      blurDataURL={urlFor(src).blur(10).quality(10).url()}
    />
  );
}

type imageProp = {
  value: {
    alt: string;
    caption: string;
  };
};

export default function SampleImageComponent({ value }: imageProp) {
  return (
    <div className="my-10">
      <ImageComponent src={value} alt={value.alt} />
      {value.caption && (
        <figcaption className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          {value.caption}
        </figcaption>
      )}
    </div>
  );
}
