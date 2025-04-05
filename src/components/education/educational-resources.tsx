// antd components
import { Button, Col, Divider, Row, Typography } from "antd";
// Next built in component
import Link from "next/link";

// antd typography
const { Text } = Typography;
export default function Resources() {
  // Resources items
  const resourcesItems = [
    { title: "Test Your Knowledge", href: "/education/test" },
    { title: "Technical Analysis", href: "/education/technical" },
    { title: "Trading Indicators", href: "/education/indicators" },
  ];
  return (
    <div className="max-w-6xl mx-auto mt-16">
      <Divider className="dark:border-gray-800">
        <Text className="dark:text-gray-400">Additional Resources</Text>
      </Divider>
      <Row gutter={[16, 16]} className="text-center">
        {resourcesItems.map((item, index) => {
          return (
            <Col key={index} xs={24} sm={8}>
              <Link href={item.href}>
                <Button
                  type="link"
                  className="dark:text-blue-400 text-blue-600"
                >
                  {item.title}
                </Button>
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
