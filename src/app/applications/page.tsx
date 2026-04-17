import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { ApplicationsManager } from "@/components/applications-manager";

export default function ApplicationsPage() {
  return (
    <Box bg="gray.50" minH="100vh" py={{ base: "8", md: "12" }}>
      <Box maxW="5xl" mx="auto">
        <Stack gap="6">
          <Stack gap="3">
            <Heading
              fontSize={{ base: "3xl", md: "4xl" }}
              letterSpacing="-0.03em"
            >
              Applications
            </Heading>
            <Text color="gray.700">
              Save new roles, update statuses, and keep all your applications in
              one place.
            </Text>
          </Stack>
          <ApplicationsManager />
        </Stack>
      </Box>
    </Box>
  );
}
