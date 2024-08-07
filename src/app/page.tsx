import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <div>
          <h1 className="font-bold text-6xl">
          Einv
          </h1>
          <p>
            Hassle-free inventory management system.
          </p>
          </div>
      </section>
    </main>
  );
}
