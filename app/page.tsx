import AgeCalculator from "../components/ageCalculator";

export default function Home() {
  return (
    <main className="bg-gray-300 flex items-center justify-center h-screen">
      <div className="bg-gray-200 p-12 w-[85vw] h-[85vh] flex items-center justify-center">
        <div>
          <AgeCalculator></AgeCalculator>
        </div>
      </div>
    </main>
  );
}
