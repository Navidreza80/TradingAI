import { ProfitLost } from "@/components/dashboard/profite-lost";
import Welcome from '../../../components/dashboard/welcome'

export default function Dashboard() {

  return (
    <div className="flex flex-row gap-2 pl-3 pt-3 flex-wrap w-full">
      <div className="w-1/2 flex flex-row flex-wrap gap-3">
        <Welcome />
        <ProfitLost />
      </div>
    </div>
  );
}
