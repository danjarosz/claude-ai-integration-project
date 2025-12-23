import {
  Heading,
  Text,
  Card,
  CardBody,
  Grid,
  VStack,
  InitialsAvatar,
} from "@/ui";
import type { ColorVariant } from "@/ui";

const teamMembers: { name: string; role: string; color: ColorVariant }[] = [
  { name: "Sarah Johnson", role: "CEO", color: "primary" },
  { name: "Michael Chen", role: "CTO", color: "info" },
  { name: "Emily Davis", role: "Design Lead", color: "success" },
  { name: "James Wilson", role: "Engineering", color: "warning" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen p-8">
      <Heading level={1} className="mb-4">
        About
      </Heading>
      <Text className="mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>

      <Heading level={2} className="mb-6">
        Our Team
      </Heading>
      <Grid cols={2} gap={6} colsMd={4}>
        {teamMembers.map((member) => (
          <Card key={member.name}>
            <CardBody>
              <VStack gap={2} align="center">
                <InitialsAvatar
                  name={member.name}
                  size="xl"
                  color={member.color}
                  variant="solid"
                />
                <Heading level={3} size="sm" className="text-center">
                  {member.name}
                </Heading>
                <Text size="sm" color="muted">
                  {member.role}
                </Text>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </main>
  );
}
