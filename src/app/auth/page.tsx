import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { AuthPanel } from "@/components/auth-panel";

export default function AuthPage() {
  return (
    <Box bg="gray.50" minH="100vh" py={{ base: "8", md: "12" }}>
      <Box maxW="2xl" mx="auto">
        <Stack gap="6">
          <Stack gap="3">
            <Heading
              fontSize={{ base: "3xl", md: "4xl" }}
              letterSpacing="-0.03em"
            >
              Account access
            </Heading>
            <Text color="gray.700">
              Use this page to sign in, create an account, or sign out.
            </Text>
          </Stack>
          <AuthPanel />
        </Stack>
      </Box>
    </Box>
  );
}
