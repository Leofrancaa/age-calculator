import AgeCalculator from "../components/ageCalculator";

export default function Home() {
  return (
    <main className="bg-[hsl(0,0%,94%)] flex items-center justify-center h-screen">
      <div className="lg:bg-[hsl(0,0%,94%)] p-12 w-[85vw] h-[85vh] flex items-center justify-center lg:shadow-2xl">
        <div>
          <AgeCalculator></AgeCalculator>
        </div>
      </div>
    </main>
  );
}
