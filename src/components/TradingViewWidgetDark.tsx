import React, { useEffect, useRef } from 'react';

export function TradingViewWidgetDark({ symbol }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = '';

      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        "autosize": true,
        "symbol": symbol,
        "interval": "60",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "hide_top_toolbar": false,
        "withdateranges": true,
        "save_image": false,
        "allow_symbol_change": true,
        "details": true,
        "hotlist": true,
        "calendar": true,
        "studies": [
          "MACD@tv-basicstudies",
          "RSI@tv-basicstudies",
          "Volume@tv-basicstudies"
        ],
        "container_id": "tradingview-widget-container"
      });

      containerRef.current.appendChild(script);
    }
  }, [symbol]);

  return (
    <div className="tradingview-widget-container" ref={containerRef} style={{ width: '100%', height: '500px' }} />
  );
}
