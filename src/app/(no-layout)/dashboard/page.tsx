import { ProfitLost } from "@/components/dashboard/profit-lost";
import Welcome from "../../../components/dashboard/welcome";
import { Stats } from "@/components/dashboard/stats";

export default function Dashboard() {
  return (
    <div className="flex flex-row gap-2 px-3 py-3 flex-wrap w-full">
      <div className="w-[60%] flex flex-row flex-wrap gap-3">
        <Welcome />
        <div className="w-full flex flex-row gap-3">
          <ProfitLost />
          <Stats />
        </div>
      </div>
    </div>
  );
}
