import Image from "next/image";
import SearchBox from './components/SearchBox';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-6xl font-bold mb-8">Roadmapper</h1>
      <SearchBox />
    </main>
  );
}
