import Image, { ImageProps } from "next/image";

export const StaticImage = ({ src, ...rest }: ImageProps) => {
  return (
    <Image
      src={typeof src === "string" ? "/shardbound-site/" : "" + src}
      {...rest}
    />
  );
};
