// Icons
import { ArrowRightOutlined } from "@ant-design/icons";
// ant components
import { Button, Typography } from "antd";
// Next built in components
import Link from "next/link";

// antd typography
const { Title, Paragraph } = Typography;

export default function NextStep() {
  return (
    <div className="max-w-6xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8 bg-gradient-to-r dark:from-blue-900/30 dark:to-purple-900/30 from-blue-100 to-purple-100 rounded-2xl">
      <Title level={2} className="dark:text-white mb-6">
        Ready to Continue Your Trading Journey?
      </Title>
      <Paragraph className="dark:text-gray-300 text-lg max-w-3xl mx-auto mb-8">
        Now that you understand the basics of trading, it's time to explore
        different markets and find the one that best suits your interests and
        goals.
      </Paragraph>
      <Link href="/education/markets">
        <Button
          type="primary"
          size="large"
          icon={<ArrowRightOutlined />}
          className="bg-blue-600 hover:bg-blue-700 h-12 px-8 text-lg"
        >
          Explore Markets
        </Button>
      </Link>
    </div>
  );
}
