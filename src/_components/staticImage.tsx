import Image, { ImageProps } from "next/image";

export const StaticImage = ({ src, ...rest }: ImageProps) => {
  return <Image src={"/shardbound-site/" + src} {...rest} />;
};
