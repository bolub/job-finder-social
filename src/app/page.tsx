"use client";

import {
  Box,
  Button,
  Heading,
  Link,
  List,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAuthSession } from "@/hooks/use-auth-session";

const quickSearches = [
  {
    title: "Part-time jobs on Indeed",
    href: "https://uk.indeed.com/jobs?q=part+time&l=Bermondsey",
  },
  {
    title: "Student jobs on Reed",
    href: "https://www.reed.co.uk/jobs/part-time-jobs-in-bermondsey",
  },
  {
    title: "Retail and shop jobs",
    href: "https://uk.indeed.com/jobs?q=part+time+retail&l=Bermondsey",
  },
  {
    title: "Cafe and hospitality jobs",
    href: "https://uk.indeed.com/jobs?q=part+time+hospitality&l=Bermondsey",
  },
  {
    title: "Admin and office jobs",
    href: "https://uk.indeed.com/jobs?q=part+time+admin&l=Bermondsey",
  },
  {
    title: "Warehouse and night shifts",
    href: "https://uk.indeed.com/jobs?q=part+time+warehouse&l=Bermondsey",
  },
];

const roleIdeas = [
  "Retail assistant",
  "Barista or cafe team member",
  "Receptionist or admin assistant",
  "Customer service advisor",
  "Warehouse operative",
  "Tutor or academic mentor",
  "Care assistant",
  "Event staff",
];

const tips = [
  "Search within Bermondsey, London Bridge, Canada Water, Elephant and Castle, and Peckham.",
  "Filter for part-time, evenings, weekends, and temporary shifts.",
  "Apply fast to fresh listings from the last 3 days.",
  "Keep one short CV ready for retail and hospitality, and another for admin or care roles.",
];

export default function Home() {
  const { loadingSession, session } = useAuthSession();

  return (
    <Box bg="gray.50" minH="100vh" py={{ base: "8", md: "12" }}>
      <Box maxW="5xl" mx="auto">
        <Stack gap="8">
          <Stack gap="4">
            <Text color="gray.600" fontSize="sm" fontWeight="600">
              Bermondsey part-time job finder
            </Text>
            <Heading
              color="gray.900"
              fontSize={{ base: "3xl", md: "5xl" }}
              maxW="12ch"
              lineHeight="1"
            >
              Find jobs quickly and track applications cleanly.
            </Heading>
            <Text
              color="gray.700"
              fontSize={{ base: "md", md: "lg" }}
              maxW="2xl"
            >
              Search from the links below, sign in on the auth page, and manage
              saved applications on the applications page.
            </Text>
            <Stack direction={{ base: "column", sm: "row" }} gap="3">
              {!loadingSession && !session ? (
                <Button asChild colorPalette="blue" size="lg" px="6">
                  <a href="/auth">Sign in or sign up</a>
                </Button>
              ) : null}
              <Button
                asChild
                colorPalette="blue"
                color="white"
                size="lg"
                px="6"
              >
                <a
                  href={quickSearches[0].href}
                  rel="noreferrer"
                  target="_blank"
                >
                  Open job searches
                </a>
              </Button>
              <Button asChild px="6" size="lg" variant="outline">
                <a href="/applications">Open applications</a>
              </Button>
            </Stack>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
            {quickSearches.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                _hover={{ textDecoration: "none" }}
                width="full"
              >
                <Box
                  bg="white"
                  borderRadius="xl"
                  borderWidth="1px"
                  p="5"
                  transition="border-color 0.2s ease"
                  _hover={{ borderColor: "blue.400" }}
                  width="full"
                >
                  <Text color="gray.900" fontWeight="600">
                    {item.title}
                  </Text>
                </Box>
              </Link>
            ))}
          </SimpleGrid>

          <Box
            bg="white"
            borderRadius="xl"
            borderWidth="1px"
            p={{ base: "6", md: "8" }}
          >
            <Stack gap="6">
              <Text color="gray.500" fontSize="sm" fontWeight="700">
                Best places to look
              </Text>
              <Text color="gray.800" fontSize="lg" lineHeight="1.5">
                Focus on jobs that hire quickly and fit around study:
                hospitality, retail, admin, customer service, warehouse,
                tutoring, events, and care.
              </Text>
            </Stack>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
            <Box
              bg="white"
              borderRadius="xl"
              borderWidth="1px"
              p={{ base: "6", md: "8" }}
            >
              <Stack gap="5">
                <Heading fontSize="xl">Role ideas</Heading>
                <List.Root color="gray.700" fontSize="md" gap="4" pl="5">
                  {roleIdeas.map((role) => (
                    <List.Item key={role}>{role}</List.Item>
                  ))}
                </List.Root>
              </Stack>
            </Box>

            <Box
              bg="white"
              borderRadius="xl"
              borderWidth="1px"
              p={{ base: "6", md: "8" }}
            >
              <Stack gap="5">
                <Heading fontSize="xl">Simple plan</Heading>
                <List.Root color="gray.700" fontSize="md" gap="4" pl="5">
                  {tips.map((tip) => (
                    <List.Item key={tip}>{tip}</List.Item>
                  ))}
                </List.Root>
              </Stack>
            </Box>
          </SimpleGrid>
        </Stack>
      </Box>
    </Box>
  );
}
