import { Box } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ILogo {
  size?: number;
  text?: boolean;
  className?: string;
}

const Logo: React.FC<ILogo> = ({ size = 20, text = false, className }) => {
  return (
    <Link href={"/dashboard/"} className={`w-min ${className}`}>
      <Box size={size} />
      {/* <Image
            src={"/notionlogo.png"}
            alt='Logo'
            width={size}
            height={size}
            priority // Ensures the image is loaded as soon as possible
          /> */}
    </Link>
  );
};

export default Logo;
