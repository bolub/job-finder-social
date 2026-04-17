import {
  Box,
  Heading,
  Link,
  List,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

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
  return (
    <Box bg="gray.50" minH="100vh" py={{ base: "10", md: "16" }}>
      <Box maxW="4xl" mx="auto">
        <Stack gap="10">
          <Stack gap="4">
            <Text color="gray.600" fontSize="sm" fontWeight="600">
              Part-time jobs in Bermondsey
            </Text>
            <Heading
              color="gray.900"
              fontSize={{ base: "3xl", md: "5xl" }}
              letterSpacing="-0.03em"
              maxW="12ch"
            >
              Find straightforward part-time jobs near you.
            </Heading>
            <Text
              color="gray.700"
              fontSize={{ base: "md", md: "lg" }}
              maxW="2xl"
            >
              This page is for a student in Bermondsey who wants part-time work.
              It is not limited to social work roles.
            </Text>
            <Stack direction={{ base: "column", sm: "row" }} gap="3">
              <Link
                alignItems="center"
                bg="blue.600"
                borderRadius="md"
                color="white"
                display="inline-flex"
                href="#searches"
                fontWeight="600"
                h="12"
                justifyContent="center"
                px="6"
                _hover={{ bg: "blue.700", textDecoration: "none" }}
              >
                Open job searches
              </Link>
              <Link
                alignItems="center"
                borderColor="gray.300"
                borderRadius="md"
                borderWidth="1px"
                color="gray.800"
                display="inline-flex"
                href="#ideas"
                fontWeight="600"
                h="12"
                justifyContent="center"
                px="6"
                _hover={{ bg: "gray.100", textDecoration: "none" }}
              >
                See role ideas
              </Link>
            </Stack>
          </Stack>

          <Box
            bg="white"
            borderRadius="xl"
            borderWidth="1px"
            p={{ base: "5", md: "6" }}
          >
            <Stack gap="3">
              <Text color="gray.500" fontSize="sm" fontWeight="600">
                Best places to look
              </Text>
              <Text color="gray.800" fontSize="md">
                Focus on jobs that hire quickly and fit around study:
                hospitality, retail, admin, customer service, warehouse,
                tutoring, events, and care.
              </Text>
            </Stack>
          </Box>

          <Stack gap="4" id="searches">
            <Heading color="gray.900" fontSize={{ base: "2xl", md: "3xl" }}>
              Quick searches
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
              {quickSearches.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  _hover={{ textDecoration: "none" }}
                >
                  <Box
                    bg="white"
                    borderRadius="xl"
                    borderWidth="1px"
                    p="5"
                    transition="border-color 0.2s ease"
                    _hover={{ borderColor: "blue.400" }}
                  >
                    <Text color="gray.900" fontWeight="600">
                      {item.title}
                    </Text>
                  </Box>
                </Link>
              ))}
            </SimpleGrid>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
            <Box
              id="ideas"
              bg="white"
              borderRadius="xl"
              borderWidth="1px"
              p={{ base: "5", md: "6" }}
            >
              <Stack gap="4">
                <Heading color="gray.900" fontSize="xl">
                  Role ideas
                </Heading>
                <List.Root gap="2">
                  {roleIdeas.map((role) => (
                    <List.Item key={role} color="gray.700">
                      {role}
                    </List.Item>
                  ))}
                </List.Root>
              </Stack>
            </Box>

            <Box
              bg="white"
              borderRadius="xl"
              borderWidth="1px"
              p={{ base: "5", md: "6" }}
            >
              <Stack gap="4">
                <Heading color="gray.900" fontSize="xl">
                  Simple plan
                </Heading>
                <List.Root gap="2">
                  {tips.map((tip) => (
                    <List.Item key={tip} color="gray.700">
                      {tip}
                    </List.Item>
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
