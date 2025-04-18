// Server actions
import {
  updatePnL,
  updateTotalTrades,
  updateWinRate,
} from "@/actions/user.action";
// Shadcn components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/tabs";
import { Switch } from "../UI/switch";
// Framer motion for animation
import { AnimatePresence, motion } from "framer-motion";
// Icons
import { GlobeLock } from "lucide-react";


// React hot toast to create toasts
import toast from "react-hot-toast";
export default function UserTabs({
  hideWin,
  setHideWin,
  hideTotal,
  setHideTotal,
  hidePnL,
  setHidePnL,
  user,
}) {
  
  
  return (
    <Tabs defaultValue="security" className="mt-12">
      <TabsList className="flex flex-wrap justify-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        <TabsTrigger
          value="privacy"
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <GlobeLock className="w-5 h-5" />
          Privacy
        </TabsTrigger>
      </TabsList>

      <AnimatePresence mode="wait">
        {/* Privacy Tab */}
        <TabsContent key={"privacy"} value="privacy">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="justify-start flex flex-col flex-wrap"
          >
            <div className="flex flex-row w-full items-center flex-nowrap gap-1">
              <h2 className="text-gray-600 whitespace-nowrap">
                Privacy
              </h2>
              <div className="w-full border border-[#9f9f9f90]"></div>
            </div>
            <div className="flex flex-row w-full items-center justify-between flex-nowrap gap-1 mt-6">
              <h2 className="dark:text-white text-black whitespace-nowrap">
                Hide Win Rate
              </h2>
              {/* Switch To Hide Win Rate Status */}
              <Switch
                defaultChecked={hideWin}
                onCheckedChange={async (e) => {
                  const request = await updateWinRate(user.id, e);
                  if (request.success) {
                    toast.success(request.message);
                    setHideWin(e);
                  }
                }}
              />
            </div>
            <div className="flex flex-row w-full items-center justify-between flex-nowrap gap-1 mt-6">
              <h2 className="dark:text-white text-black whitespace-nowrap">
                Hide Total Trades
              </h2>
              {/* Switch To Hide Total Trades Status */}
              <Switch
                defaultChecked={hideTotal}
                onCheckedChange={async (e) => {
                  const request = await updateTotalTrades(user.id, e);
                  if (request.success) {
                    toast.success(request.message);
                    setHideTotal(e);
                  }
                }}
              />
            </div>
            <div className="flex flex-row w-full items-center justify-between flex-nowrap gap-1 mt-6">
              <h2 className="dark:text-white text-black whitespace-nowrap">
                Hide P&L
              </h2>
              {/* Switch To Hide Profit And Losses Status */}
              <Switch
                defaultChecked={hidePnL}
                onCheckedChange={async (e) => {
                  const request = await updatePnL(user.id, e);
                  if (request.success) {
                    toast.success(request.message);
                    setHidePnL(e);
                  }
                }}
              />
            </div>
          </motion.div>
        </TabsContent>
      </AnimatePresence>
    </Tabs>
  );
}
