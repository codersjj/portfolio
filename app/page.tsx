import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="relative flex flex-col justify-center items-center mx-auto px-5 sm:px-10 overflow-hidden">
      <div className="max-w-7xl w-full">
        <Hero />
      </div>
    </main>
  );
}
