import Image, { ImageProps } from "next/image";

export const StaticImage = ({ src, ...rest }: ImageProps) => {
  if (typeof src === "string")
    return <Image src={"/shardbound-site/" + src} {...rest} />;
  return <Image src={src} {...rest} />;
};
