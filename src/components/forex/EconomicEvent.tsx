import React from 'react';

interface EconomicEvent {
  time: string;
  currency: string;
  event: string;
  impact: "high" | "medium" | "low";
  actual: string;
  forecast: string;
  previous: string;
}

interface EconomicEventProps {
  event: EconomicEvent;
}

export function EconomicEvent({ event }: EconomicEventProps) {
  const getImpactClass = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getValueClass = (actual: string, forecast: string) => {
    if (actual === "-") return "text-gray-500 dark:text-gray-400";
    
    if (forecast === "-") return "text-gray-800 dark:text-gray-200";
    
    const actualValue = parseFloat(actual);
    const forecastValue = parseFloat(forecast);
    
    if (isNaN(actualValue) || isNaN(forecastValue)) return "text-gray-800 dark:text-gray-200";
    
    return actualValue > forecastValue 
      ? "text-green-600 dark:text-green-400 font-medium"
      : actualValue < forecastValue
      ? "text-red-600 dark:text-red-400 font-medium"
      : "text-gray-800 dark:text-gray-200";
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {event.time}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        {event.currency}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
        {event.event}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span className={`px-2 py-1 text-xs font-medium ${getImpactClass(event.impact)} rounded-full`}>
          {event.impact.charAt(0).toUpperCase() + event.impact.slice(1)}
        </span>
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm ${getValueClass(event.actual, event.forecast)}`}>
        {event.actual}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {event.forecast}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {event.previous}
      </td>
    </tr>
  );
}