// Third party components
import MostTradedCurrencies from "@/components/dashboard/currency-table";
import UserPlan from "@/components/dashboard/current-plan";
import TradeHistory from "@/components/dashboard/history";
import AnalyticsDashboard from "@/components/dashboard/profit-analytics";
import Stats from "@/components/dashboard/stats";
import TradesAnalyticsChart from "@/components/dashboard/winning-loosing-trades";

export default async function Dashboard() {

  return (
      <>
        {/* User Status: Total Trades, Win Rate, Total Profit */}
        <Stats />
        <div className="flex flex-row xl:flex-nowrap lg:flex-nowrap md:flex-nowrap sm:flex-wrap xs:flex-wrap max-[740px]:flex-wrap gap-3 w-full">
          {/* User Profit Past 6 Months */}
          <AnalyticsDashboard />
          {/* User Winning And Loosing Trades Past 6 Months */}
          <TradesAnalyticsChart />
        </div>
        <div className="flex flex-row lg:flex-nowrap md:flex-wrap sm:flex-wrap xs:flex-wrap gap-3 w-full overflow-hidden">
          <div className="flex h-auto flex-row justify-between lg:flex-nowrap md:flex-nowrap gap-3 w-1/2 md:w-full sm:w-full xs:w-full sm:flex-wrap xs:flex-wrap">
            {/* User Current PLan */}
            <UserPlan />
            {/* User Most Traded Currencies */}
            <MostTradedCurrencies />
          </div>
          <TradeHistory />
        </div>
      </>
    )
}
