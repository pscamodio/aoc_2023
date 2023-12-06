
import { AocRunner } from "../islands/AocRunner.tsx";

export default function Home() {
  return (
    <div class="full-screen bg-[#86efac]">
      <div class="mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">Welcome to Deno AOC 2023</h1>
        <AocRunner></AocRunner>
      </div>
    </div>
  );
}
