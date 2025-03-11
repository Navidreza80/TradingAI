import MostTradedCurrencies from "@/components/dashboard/currency-table";
import UserPlan from "@/components/dashboard/current-plan";
import TradeHistory from "@/components/dashboard/history";
import AnalyticsDashboard from "@/components/dashboard/profit-analytics";
import Stats from "@/components/dashboard/stats";
import TradesAnalyticsChart from "@/components/dashboard/winning-loosing-trades";

export default function Dashboard() {
  return (
    <>
      <Stats />
      <div className="flex flex-row lg:flex-nowrap md:flex-nowrap sm:flex-wrap xs:flex-wrap gap-3 w-full">
        <AnalyticsDashboard />
        <TradesAnalyticsChart />
      </div>
      <div className="flex flex-row lg:flex-nowrap md:flex-wrap sm:flex-wrap xs:flex-wrap sm:gap-y-3 xs:gap-y-3 gap-3 w-full">
        <div className="flex flex-row justify-between lg:flex-nowrap md:flex-nowrap gap-3 w-1/2 md:w-full sm:w-full xs:w-full sm:flex-wrap xs:flex-wrap h-[350px]">
          <UserPlan />
          <MostTradedCurrencies />
        </div>
        <TradeHistory />
      </div>
    </>
  );
}
