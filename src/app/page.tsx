import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

export default function Home() {
  const { userId } = auth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <div>IMS</div>
      </section>
    </main>
  );
}
