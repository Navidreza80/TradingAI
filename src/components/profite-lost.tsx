
// imports
import { ChartBar } from "lucide-react";

// tsx render
export function ProfitLost() {
  return (
    <div className="flex flex-row flex-wrap pr-2 py-4 border border-[#4b4b4b61] rounded-[16px] justify-start items-center bg-[#4b4b4b5b] gap-8 w-1/3">
      <h2 className="text-green pr-6 pl-4 border-r border-[#ffffff7e] py-4 text-lg font-bold text-[#00FF40]">P&L</h2>
      <div className="flex flex-col flex-wrap justify-center">

        {/* How much profit gained or lost */}
        <h2 className="flex flex-row w-full text-2xl items-center gap-1 font-bold text-[#00FF40]">
          1%
          <ChartBar className="-rotate-90 text-[#00FF40]" />
        </h2>

        {/* Duration */}
        <h2 className="text-[#ffffff76]">Last Month</h2>
      </div>
    </div>
  );
}
