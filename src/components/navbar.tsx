"use client";

import { Box, Link, Spacer, Stack } from "@chakra-ui/react";
import { useAuthSession } from "@/hooks/use-auth-session";

export function Navbar() {
  const { session } = useAuthSession();

  return (
    <Box
      bg="white"
      borderBottomWidth="1px"
      position="sticky"
      top="0"
      zIndex="10"
    >
      <Box maxW="5xl" mx="auto" px={{ base: "4", md: "0" }} py="4">
        <Stack align="center" direction="row" gap="4">
          <Link href="/">Home</Link>
          <Link href="/applications">Applications</Link>
          <Spacer />
          <Link href="/auth">{session ? "Profile" : "Log in"}</Link>
        </Stack>
      </Box>
    </Box>
  );
}
