import SearchBox from './components/SearchBox';
import LoginButton from './components/LoginButton';

export default function Home() {
  return (
    <div>
    <div className="flex justify-between items-center  px-8 py-5">
        <h2 className="text-2xl font-semibold text-[#b0b0b0]">Roadmapper</h2>
  
          <LoginButton />
          </div>

    <div className="flex min-h-screen flex-col items-center mt-8 p-24">
      <h1 className="text-3xl font-bold mb-8 text-[#b0b0b0]">What do you want to build?</h1>
      <SearchBox />
    </div>
    </div>
  );
}
