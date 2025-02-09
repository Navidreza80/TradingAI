import { ProfitLost } from "@/components/profite-lost";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="flex flex-row items-center gap-2 ml-3 mt-3 flex-wrap w-full">
      <div className="w-1/2 flex flex-row flex-wrap gap-3">
        <div className="flex flex-row gap-2">
          <Image
            src="/image/gesture.png"
            alt="wave hand"
            width={40}
            height={40}
          />
          <h1 className="text-4xl font-extrabold w-full">Welcome back, Navidreza!</h1>
        </div>

        <ProfitLost />
      </div>
    </div>
  );
}
