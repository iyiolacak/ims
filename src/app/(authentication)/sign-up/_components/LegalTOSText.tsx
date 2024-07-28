import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const LegalTOSText = () => {
  return (
    <p className="mt-4 flex flex-row px-4 text-center text-sm text-gray-400">
      <Link
        href="/terms-of-service"
        className="flex flex-row items-center font-medium text-primary"
      >
        Terms of Service
        <ArrowUpRight size={16} />
      </Link>{" "}
      and&nbsp;
      <Link
        href={"/privacy-policy"}
        className="flex flex-row items-center font-medium text-primary"
      >
        Privacy Policy
        <ArrowUpRight size={16} />
      </Link>
      .
    </p>
  );
};

export default LegalTOSText
