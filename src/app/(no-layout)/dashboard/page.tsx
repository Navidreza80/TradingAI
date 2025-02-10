import { ProfitLost } from "@/components/dashboard/profit-lost";
import Welcome from "../../../components/dashboard/welcome";
import { Stats } from "@/components/dashboard/stats";
import { Chart } from "@/components/dashboard/charts";
import Plan from "@/components/dashboard/plan";
import Position from "@/components/dashboard/current-position";
import Comment from "@/components/dashboard/comments";
import Course from "@/components/dashboard/course";
import Blog from "@/components/dashboard/blog";

export default function Dashboard() {
  return (
    <div className="flex flex-row gap-2 px-3 py-3 w-full">
      <div className="w-[60%] flex flex-row flex-wrap gap-3">
        <Welcome />
        <div className="w-full flex flex-row gap-3">
          <ProfitLost />
          <Stats />
        </div>
        <div className="w-full flex flex-row gap-3 h-[243px]">
          <Position />
          <Chart />
        </div>
        <div className="w-full flex flex-row gap-3">
          <Plan />
          <Comment />
        </div>
      </div>
      <div className="w-[40%] flex flex-col gap-3">
        <Course />
        <Blog />
      </div>
    </div>
  );
}
