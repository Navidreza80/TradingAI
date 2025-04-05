// antd components
import { Timeline, Typography } from "antd";

// antd typography
const { Title, Paragraph } = Typography;

export default function TradingJourney() {
  // Trading journey sections items
  const tradingJourney = [
    {
      title: "Learn the Basics",
      content:
        "Start with understanding market fundamentals and trading terminology",
    },
    {
      title: "Choose Your Markets",
      content: "Decide which markets align with your interests and goals",
    },
    {
      title: "Develop a Strategy",
      content:
        "Create a trading plan based on your risk tolerance and time commitment",
    },
    {
      title: "Practice with Demo",
      content:
        "Use paper trading to test your strategy without risking real money",
    },
    {
      title: "Start Small",
      content:
        "Begin with small positions as you gain experience and confidence",
    },
    {
      title: "Review and Improve",
      content: "Regularly analyze your trades to refine your approach",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto mb-16 bg-white/5 dark:bg-black/20 p-8 rounded-2xl">
      <Title level={2} className="dark:text-white text-center pb-8">
        Your Trading Journey
      </Title>
      <Timeline
        mode="alternate"
        items={tradingJourney.map((item, index) => ({
          color: ["blue", "green", "red", "purple", "orange", "cyan"][
            index % 6
          ],
          children: (
            <div>
              <Title level={4} className="dark:text-white mb-2">
                {item.title}
              </Title>
              <Paragraph className="dark:text-gray-300">
                {item.content}
              </Paragraph>
            </div>
          ),
        }))}
      />
    </div>
  );
}
