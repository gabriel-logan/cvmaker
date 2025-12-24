import { useCVStore } from "../stores/cVStore";

export default function HomePage() {
  const { firstName } = useCVStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">
        Welcome to the Home Page {firstName ? `, ${firstName}` : ""}!
      </h1>
    </main>
  );
}
