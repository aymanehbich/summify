import { Image } from "@mantine/core";
import github from "./svg/github.svg";
export interface DevIconProps extends React.HTMLAttributes<HTMLImageElement> {
  size?: number;
}

export function GithubIcon({ size, style, ...others }: DevIconProps) {
  return (
    <Image
      src={github}
      alt="GitHub Icon"
      width={size}
      height={size}
      style={style}
      {...others}
    />
  );
}
