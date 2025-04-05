"use client";

import { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { Card, CardContent } from "@/components/UI/card";
import { Badge } from "@/components/UI/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/UI/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/UI/select";
import { Button } from "@/components/UI/Button";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Tag, Zap, X, Sun, Moon } from "lucide-react";

// Mock events data - in a real app, you would fetch this from an API
const mockEventsData = [
  // Existing events with updated dates to include current month/year
  {
    id: 1,
    title: "Fed Interest Rate Decision",
    date: new Date(), // Today
    time: "14:00 EST",
    description:
      "Federal Reserve announces interest rate decision and monetary policy statement.",
    impact: "high",
    category: "Central Bank",
  },
  {
    id: 2,
    title: "US CPI Data Release",
    date: new Date(new Date().setDate(new Date().getDate() + 2)), // 2 days from today
    time: "08:30 EST",
    description:
      "Bureau of Labor Statistics releases Consumer Price Index data.",
    impact: "high",
    category: "Economic Data",
  },
  {
    id: 3,
    title: "ECB Monetary Policy Meeting",
    date: new Date(new Date().setDate(new Date().getDate() + 5)), // 5 days from today
    time: "07:45 CET",
    description:
      "European Central Bank's Governing Council meeting on monetary policy.",
    impact: "high",
    category: "Central Bank",
  },
  // Keep some of your existing events but update a few more to ensure visibility
  {
    id: 4,
    title: "UK Employment Report",
    date: new Date(new Date().setDate(new Date().getDate() - 2)), // 2 days ago
    time: "09:30 GMT",
    description:
      "Office for National Statistics releases employment and unemployment figures.",
    impact: "medium",
    category: "Economic Data",
  },
  {
    id: 5,
    title: "Apple Earnings Release",
    date: new Date(new Date().setDate(new Date().getDate() + 7)), // 7 days from today
    time: "16:30 EST",
    description: "Apple Inc. releases quarterly earnings report.",
    impact: "medium",
    category: "Earnings",
  },
  {
    id: 6,
    title: "OPEC+ Meeting",
    date: new Date(2023, 10, 26), // November 26, 2023
    time: "10:00 CET",
    description: "OPEC and allies meet to discuss oil production quotas.",
    impact: "high",
    category: "Commodities",
  },
  {
    id: 7,
    title: "Bank of Japan Policy Decision",
    date: new Date(2023, 10, 21), // November 21, 2023
    time: "03:00 JST",
    description: "Bank of Japan announces monetary policy decision.",
    impact: "medium",
    category: "Central Bank",
  },
  {
    id: 8,
    title: "US Non-Farm Payrolls",
    date: new Date(2023, 10, 3), // November 3, 2023
    time: "08:30 EST",
    description:
      "Bureau of Labor Statistics releases employment situation report.",
    impact: "high",
    category: "Economic Data",
  },
  {
    id: 9,
    title: "Eurozone GDP Preliminary Release",
    date: new Date(2023, 10, 14), // November 14, 2023
    time: "10:00 CET",
    description:
      "Eurostat releases preliminary GDP growth figures for the Eurozone.",
    impact: "medium",
    category: "Economic Data",
  },
  {
    id: 10,
    title: "Tesla Earnings Call",
    date: new Date(2023, 10, 22), // November 22, 2023
    time: "17:30 EST",
    description: "Tesla Inc. quarterly earnings conference call.",
    impact: "medium",
    category: "Earnings",
  },

  // Additional events for current and upcoming months
  {
    id: 13,
    title: "FOMC Meeting Minutes",
    date: new Date(2023, 11, 5), // December 5, 2023
    time: "14:00 EST",
    description:
      "Release of the Federal Open Market Committee meeting minutes providing insights into monetary policy discussions.",
    impact: "medium",
    category: "Central Bank",
  },
  {
    id: 14,
    title: "US Retail Sales",
    date: new Date(2023, 11, 14), // December 14, 2023
    time: "08:30 EST",
    description:
      "Census Bureau releases data on retail and food services sales for the previous month.",
    impact: "medium",
    category: "Economic Data",
  },
  {
    id: 15,
    title: "Bank of England Rate Decision",
    date: new Date(2023, 11, 21), // December 21, 2023
    time: "12:00 GMT",
    description:
      "Bank of England's Monetary Policy Committee announces interest rate decision.",
    impact: "high",
    category: "Central Bank",
  },
  {
    id: 16,
    title: "US GDP Final Estimate",
    date: new Date(2023, 11, 22), // December 22, 2023
    time: "08:30 EST",
    description:
      "Bureau of Economic Analysis releases the final estimate of GDP growth for the previous quarter.",
    impact: "high",
    category: "Economic Data",
  },
  {
    id: 17,
    title: "Amazon Q4 Earnings",
    date: new Date(2024, 0, 31), // January 31, 2024
    time: "16:00 EST",
    description: "Amazon.com Inc. releases fourth quarter earnings report.",
    impact: "high",
    category: "Earnings",
  },
  {
    id: 18,
    title: "Crude Oil Inventories",
    date: new Date(2023, 11, 13), // December 13, 2023
    time: "10:30 EST",
    description:
      "Energy Information Administration releases weekly petroleum status report.",
    impact: "medium",
    category: "Commodities",
  },
  {
    id: 19,
    title: "ECB Economic Bulletin",
    date: new Date(2023, 11, 28), // December 28, 2023
    time: "10:00 CET",
    description:
      "European Central Bank publishes its economic bulletin with analysis of economic and monetary developments.",
    impact: "low",
    category: "Central Bank",
  },
  {
    id: 20,
    title: "Google Fiscal Year Results",
    date: new Date(2024, 0, 25), // January 25, 2024
    time: "16:30 EST",
    description:
      "Alphabet Inc. announces full fiscal year results and outlook.",
    impact: "high",
    category: "Earnings",
  },
  {
    id: 21,
    title: "China Manufacturing PMI",
    date: new Date(2023, 11, 31), // December 31, 2023
    time: "09:00 CST",
    description:
      "National Bureau of Statistics releases Purchasing Managers' Index data for manufacturing sector.",
    impact: "medium",
    category: "Economic Data",
  },
  {
    id: 22,
    title: "Gold Futures Expiration",
    date: new Date(2023, 11, 27), // December 27, 2023
    time: "13:30 EST",
    description: "Expiration of COMEX gold futures contracts.",
    impact: "medium",
    category: "Commodities",
  },
  {
    id: 23,
    title: "Microsoft Q2 Earnings Call",
    date: new Date(2024, 0, 24), // January 24, 2024
    time: "17:30 EST",
    description:
      "Microsoft Corporation quarterly earnings conference call with analysts.",
    impact: "high",
    category: "Earnings",
  },
  {
    id: 24,
    title: "US Jobs Report",
    date: new Date(2024, 0, 5), // January 5, 2024
    time: "08:30 EST",
    description:
      "Bureau of Labor Statistics releases the Employment Situation Summary.",
    impact: "high",
    category: "Economic Data",
  },
  {
    id: 25,
    title: "OPEC Monthly Report",
    date: new Date(2024, 0, 16), // January 16, 2024
    time: "12:00 CET",
    description:
      "Organization of the Petroleum Exporting Countries releases its monthly oil market report.",
    impact: "medium",
    category: "Commodities",
  },
  {
    id: 26,
    title: "Bank of Canada Rate Decision",
    date: new Date(2024, 0, 24), // January 24, 2024
    time: "10:00 EST",
    description:
      "Bank of Canada announces its interest rate decision and releases monetary policy report.",
    impact: "medium",
    category: "Central Bank",
  },
  {
    id: 27,
    title: "Facebook Earnings Release",
    date: new Date(2024, 0, 31), // January 31, 2024
    time: "16:05 EST",
    description: "Meta Platforms Inc. releases quarterly financial results.",
    impact: "high",
    category: "Earnings",
  },
  {
    id: 28,
    title: "Eurozone Inflation Data",
    date: new Date(2024, 0, 7), // January 7, 2024
    time: "11:00 CET",
    description:
      "Eurostat releases flash estimate of inflation in the euro area.",
    impact: "medium",
    category: "Economic Data",
  },
  {
    id: 29,
    title: "Natural Gas Storage Report",
    date: new Date(2023, 11, 7), // December 7, 2023
    time: "10:30 EST",
    description:
      "Energy Information Administration releases weekly natural gas storage report.",
    impact: "low",
    category: "Commodities",
  },
  {
    id: 30,
    title: "Reserve Bank of Australia Meeting",
    date: new Date(2024, 1, 6), // February 6, 2024
    time: "14:30 AEDT",
    description: "RBA board meeting to decide on the cash rate target.",
    impact: "medium",
    category: "Central Bank",
  },
];

export default function EventsCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState(mockEventsData);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Categories for filtering
  const categories = [
    "All",
    "Central Bank",
    "Economic Data",
    "Earnings",
    "Commodities",
  ];

  // Get days for the current month view
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Filter events by category
  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  // Get events for selected date
  const eventsForSelectedDate = filteredEvents.filter((event) =>
    isSameDay(event.date, selectedDate)
  );

  // Get events for a specific day
  const getEventsForDay = (day) => {
    return filteredEvents.filter((event) => isSameDay(event.date, day));
  };

  // Handle month navigation
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // Add the missing handleDayClick function
  const handleDayClick = (day) => {
    setSelectedDate(day);
    setIsDialogOpen(true);
  };

  // Enhanced impact color mapping with gradients
  const getImpactColor = (impact) => {
    switch (impact) {
      case "high":
        return "bg-gradient-to-r from-red-500 to-red-400 dark:from-red-600 dark:to-red-500";
      case "medium":
        return "bg-gradient-to-r from-amber-400 to-yellow-300 dark:from-amber-500 dark:to-yellow-400";
      case "low":
        return "bg-gradient-to-r from-green-500 to-green-400 dark:from-green-600 dark:to-green-500";
      default:
        return "bg-gradient-to-r from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-500";
    }
  };

  // Get impact text color
  const getImpactTextColor = (impact) => {
    return impact === "medium" ? "text-gray-800 dark:text-white" : "text-white";
  };

  return (
    <div className="container pt-24 mx-auto px-4 bg-blue-50 dark:bg-gradient-to-b dark:from-gray-950 dark:to-black text-gray-900 dark:text-white min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold text-center p-5"
      >
        Trading Events Calendar
      </motion.h1>

      {/* Calendar Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 rounded-xl backdrop-blur-sm bg-white/80 dark:bg-gray-900/50 shadow-md dark:shadow-none"
      >
        <div className="flex items-center space-x-2">
          <Button
            onClick={prevMonth}
            variant="outline"
            size="icon"
            className="rounded-full bg-white hover:bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/80 dark:hover:bg-gray-700 dark:text-white dark:border-none"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Button>
          <h2 className="text-xl font-semibold px-4 text-gray-800 dark:text-white">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <Button
            onClick={nextMonth}
            variant="outline"
            size="icon"
            className="rounded-full bg-white hover:bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/80 dark:hover:bg-gray-700 dark:text-white dark:border-none"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
          <Button
            onClick={goToToday}
            variant="default"
            className="ml-4 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800"
          >
            Today
          </Button>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">Filter:</span>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px] backdrop-blur-sm bg-white border-gray-200 text-gray-800 dark:bg-gray-800/80 dark:border-gray-700 dark:text-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Calendar Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400 dark:border-blue-500"></div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-4 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center py-2 font-medium text-sm text-gray-500 dark:text-gray-400"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-4">
            {daysInMonth.map((day, i) => {
              const dayEvents = getEventsForDay(day);
              const isCurrentMonth = isSameMonth(day, currentDate);
              const isSelected = isSameDay(day, selectedDate);
              const isToday = isSameDay(day, new Date());

              return (
                <motion.div
                  key={i}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                  onClick={() => handleDayClick(day)}
                  className={`h-32 rounded-2xl shadow-lg p-3 cursor-pointer transition-all duration-200 relative overflow-hidden
                    ${
                      isCurrentMonth
                        ? "bg-gradient-to-br from-white to-blue-50/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-sm"
                        : "bg-gray-100/70 text-gray-400 dark:bg-gray-950/70 dark:text-gray-600"
                    }
                    ${isSelected ? "ring-2 ring-blue-400 dark:ring-blue-500" : ""}
                    ${
                      isToday
                        ? "border border-blue-400 dark:border-blue-500"
                        : "border border-gray-200/50 dark:border-gray-800/50"
                    }
                    hover:shadow-blue-100/50 dark:hover:shadow-blue-900/20 hover:shadow-xl`}
                >
                  {/* Large centered day number */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span 
                      className={`text-6xl font-bold ${
                        isToday 
                          ? 'text-blue-400/30 dark:text-blue-500/60' 
                          : isCurrentMonth 
                            ? 'text-gray-300/40 dark:text-gray-400/50' 
                            : 'text-gray-200/30 dark:text-gray-600/40'
                      }`}
                    >
                      {format(day, "d")}
                    </span>
                  </div>
                  
                  <Card className="h-full w-full bg-transparent border-none shadow-none relative z-10">
                    <CardContent className="flex flex-col justify-between h-full p-0">
                      <div className="flex justify-between items-start">
                        <span
                          className={`text-lg font-medium 
                          ${
                            !isCurrentMonth 
                              ? "text-gray-400 dark:text-gray-600" 
                              : "text-gray-700 dark:text-gray-200"
                          } 
                          ${
                            isToday
                              ? "bg-gradient-to-r from-blue-400 to-blue-500 dark:from-blue-500 dark:to-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center"
                              : ""
                          }`}
                        >
                          {format(day, "d")}
                        </span>
                        {dayEvents.length > 0 && (
                          <Badge
                            variant="default"
                            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800"
                          >
                            {dayEvents.length}
                          </Badge>
                        )}
                      </div>

                      {/* Event indicators as colorful labels */}
                      <div className="mt-2 space-y-1.5">
                        {dayEvents.slice(0, 3).map((event) => (
                          <motion.div
                            key={event.id}
                            whileHover={{ x: 3 }}
                            className={`text-xs truncate px-2 py-1 rounded-md flex items-center
                              ${getImpactColor(event.impact)} ${getImpactTextColor(event.impact)} 
                              shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm bg-opacity-90 z-20`}
                          >
                            <div
                              className="w-2 h-2 rounded-full mr-1.5 bg-white bg-opacity-70"
                            ></div>
                            <span className="truncate">{event.title}</span>
                          </motion.div>
                        ))}
                        {dayEvents.length > 3 && (
                          <div className="text-xs pl-1 flex items-center backdrop-blur-sm rounded-md px-2 py-1 bg-gray-200/70 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400">
                            <span className="w-2 h-2 rounded-full mr-1.5 bg-gray-400 dark:bg-gray-500"></span>
                            +{dayEvents.length - 3} more
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Event Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md rounded-xl bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-white border-gray-200 dark:border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-blue-500 dark:text-blue-400" />
              Events for {format(selectedDate, "MMMM d, yyyy")}
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              {eventsForSelectedDate.length} events scheduled for this date
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4 max-h-[60vh] overflow-y-auto pr-2">
            {eventsForSelectedDate.length === 0 ? (
              <p className="text-center py-8 text-gray-500 dark:text-gray-400">
                No events scheduled for this date.
              </p>
            ) : (
              <AnimatePresence>
                {eventsForSelectedDate.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="backdrop-blur-sm rounded-lg p-4 hover:bg-opacity-100 transition-colors bg-white/80 border border-gray-200/50 hover:bg-white dark:bg-gray-800/80 dark:border-gray-700/50 dark:hover:bg-gray-800"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-lg">{event.title}</h4>
                        <p className="text-sm flex items-center mt-1 text-gray-600 dark:text-gray-300">
                          <Clock className="h-3.5 w-3.5 mr-1.5 text-gray-500 dark:text-gray-400" />
                          {event.time}
                        </p>
                      </div>
                      <Badge className={`${getImpactColor(event.impact)}`}>
                        {event.impact.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">{event.description}</p>
                    <p className="mt-2 text-sm flex items-center text-gray-500 dark:text-gray-400">
                      <Tag className="h-3.5 w-3.5 mr-1.5 text-gray-500 dark:text-gray-400" />
                      {event.category}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          <DialogFooter>
            <Button
              onClick={() => setIsDialogOpen(false)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <Dialog
          open={!!selectedEvent}
          onOpenChange={(open) => !open && setSelectedEvent(null)}
        >
          <DialogContent className="max-w-md rounded-xl bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-white border-gray-200 dark:border-gray-800">
            <DialogHeader className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                onClick={() => setSelectedEvent(null)}
              >
                <X className="h-4 w-4" />
              </Button>
              <DialogTitle className="text-xl font-bold pr-6">
                {selectedEvent.title}
              </DialogTitle>
              <Badge
                className={`${getImpactColor(
                  selectedEvent.impact
                )} mt-2 self-start`}
              >
                {selectedEvent.impact.toUpperCase()} IMPACT
              </Badge>
            </DialogHeader>

            <div className="space-y-4 my-2">
              <div className="flex items-center p-3 rounded-lg bg-blue-50/50 dark:bg-gray-800/50">
                <Calendar className="h-5 w-5 mr-3 text-blue-500 dark:text-blue-400" />
                <span>{format(selectedEvent.date, "MMMM d, yyyy")}</span>
              </div>

              <div className="flex items-center p-3 rounded-lg bg-blue-50/50 dark:bg-gray-800/50">
                <Clock className="h-5 w-5 mr-3 text-blue-500 dark:text-blue-400" />
                <span>{selectedEvent.time}</span>
              </div>

              <div className="flex items-center p-3 rounded-lg bg-blue-50/50 dark:bg-gray-800/50">
                <Tag className="h-5 w-5 mr-3 text-blue-500 dark:text-blue-400" />
                <span>{selectedEvent.category}</span>
              </div>

              <div className="flex items-start p-3 rounded-lg bg-blue-50/50 dark:bg-gray-800/50">
                <Zap className="h-5 w-5 mr-3 mt-0.5 text-blue-500 dark:text-blue-400" />
                <div>
                  <h4 className="text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">
                    Description
                  </h4>
                  <p className="text-gray-800 dark:text-gray-200">{selectedEvent.description}</p>
                </div>
              </div>

              <DialogFooter className="pt-2">
                <Button
                  onClick={() => setSelectedEvent(null)}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800"
                >
                  Close
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
