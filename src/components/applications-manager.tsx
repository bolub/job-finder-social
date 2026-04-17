"use client";

import {
  Box,
  Button,
  Heading,
  Input,
  Link,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import type { Session } from "@supabase/supabase-js";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  type Application,
  type ApplicationStatus,
  statusOptions,
} from "@/lib/application-types";
import { getSupabaseBrowserClient } from "@/lib/supabase";

export function ApplicationsManager() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [loadingApplications, setLoadingApplications] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [filter, setFilter] = useState<"all" | ApplicationStatus>("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [appliedAt, setAppliedAt] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!supabase) {
      setLoadingSession(false);
      return;
    }

    void supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        setErrorMessage(error.message);
      } else {
        setSession(data.session);
      }

      setLoadingSession(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setErrorMessage(null);
      setMessage(null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const loadApplications = useCallback(async () => {
    if (!supabase || !session) return;

    setLoadingApplications(true);

    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setApplications((data ?? []) as Application[]);
    }

    setLoadingApplications(false);
  }, [session, supabase]);

  useEffect(() => {
    if (!supabase || !session) {
      setApplications([]);
      return;
    }

    void loadApplications();
  }, [loadApplications, session, supabase]);

  async function handleAddApplication() {
    if (!supabase || !session || !company || !jobTitle) return;

    setErrorMessage(null);
    setMessage(null);

    const { error } = await supabase.from("applications").insert({
      user_id: session.user.id,
      company,
      job_title: jobTitle,
      status: "saved",
      location: location || null,
      job_url: jobUrl || null,
      applied_at: appliedAt || null,
      notes: notes || null,
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setCompany("");
    setJobTitle("");
    setLocation("");
    setJobUrl("");
    setAppliedAt("");
    setNotes("");
    setShowAddForm(false);
    setMessage("Application saved.");
    await loadApplications();
  }

  async function handleStatusChange(id: string, status: ApplicationStatus) {
    if (!supabase) return;

    const { error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", id);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setApplications((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item)),
    );
  }

  async function handleDelete(id: string) {
    if (!supabase) return;

    const { error } = await supabase.from("applications").delete().eq("id", id);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setApplications((current) => current.filter((item) => item.id !== id));
  }

  const filteredApplications = applications.filter((item) =>
    filter === "all" ? true : item.status === filter,
  );

  if (!supabase) {
    return (
      <Box
        bg="amber.50"
        borderColor="amber.200"
        borderRadius="xl"
        borderWidth="1px"
        p="6"
      >
        <Stack gap="3">
          <Heading fontSize="xl">Supabase setup needed</Heading>
          <Text color="gray.700">
            Add your Supabase environment variables, then refresh this page.
          </Text>
        </Stack>
      </Box>
    );
  }

  if (loadingSession) {
    return <Spinner size="sm" />;
  }

  if (!session) {
    return (
      <Box bg="white" borderRadius="xl" borderWidth="1px" p="6">
        <Stack gap="3">
          <Heading fontSize="xl">Sign in first</Heading>
          <Text color="gray.700">
            Your saved applications are tied to your account.
          </Text>
          <Button asChild colorPalette="blue" px="6" width="fit-content">
            <a href="/auth">Go to sign in</a>
          </Button>
        </Stack>
      </Box>
    );
  }

  return (
    <Stack gap="6">
      <Box
        bg="white"
        borderRadius="xl"
        borderWidth="1px"
        p={{ base: "5", md: "6" }}
      >
        <Stack gap="5">
          <Stack
            align={{ base: "start", md: "center" }}
            direction={{ base: "column", md: "row" }}
            justify="space-between"
          >
            <Stack
              align={{ base: "start", md: "center" }}
              direction={{ base: "column", md: "row" }}
              gap="3"
            >
              <Heading fontSize="2xl">Your applications</Heading>
              <Button
                colorPalette="blue"
                onClick={() => setShowAddForm((current) => !current)}
                px="6"
                width="fit-content"
              >
                {showAddForm ? "Hide form" : "Add application"}
              </Button>
            </Stack>
            <Stack direction="row" flexWrap="wrap" gap="2">
              <Button
                onClick={() => setFilter("all")}
                px="4"
                size="sm"
                variant={filter === "all" ? "solid" : "outline"}
              >
                All
              </Button>
              {statusOptions.map((status) => (
                <Button
                  key={status}
                  onClick={() => setFilter(status)}
                  px="4"
                  size="sm"
                  textTransform="capitalize"
                  variant={filter === status ? "solid" : "outline"}
                >
                  {status}
                </Button>
              ))}
            </Stack>
          </Stack>

          {showAddForm ? (
            <Box
              bg="gray.50"
              borderRadius="xl"
              borderWidth="1px"
              p={{ base: "5", md: "6" }}
            >
              <Stack gap="4">
                <Heading fontSize="xl">Add an application</Heading>
                <Input
                  placeholder="Company"
                  px="4"
                  py="6"
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                />
                <Input
                  placeholder="Job title"
                  px="4"
                  py="6"
                  value={jobTitle}
                  onChange={(event) => setJobTitle(event.target.value)}
                />
                <Input
                  placeholder="Location"
                  px="4"
                  py="6"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                />
                <Input
                  placeholder="Job link"
                  px="4"
                  py="6"
                  value={jobUrl}
                  onChange={(event) => setJobUrl(event.target.value)}
                />
                <Input
                  px="4"
                  py="6"
                  type="date"
                  value={appliedAt}
                  onChange={(event) => setAppliedAt(event.target.value)}
                />
                <Textarea
                  minH="24"
                  placeholder="Notes"
                  px="4"
                  py="4"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                />
                <Button
                  colorPalette="blue"
                  onClick={handleAddApplication}
                  px="6"
                  width="fit-content"
                >
                  Save application
                </Button>
              </Stack>
            </Box>
          ) : null}

          {message ? <Text color="green.700">{message}</Text> : null}
          {errorMessage ? <Text color="red.700">{errorMessage}</Text> : null}

          {loadingApplications ? (
            <Spinner size="sm" />
          ) : filteredApplications.length === 0 ? (
            <Text color="gray.600">No saved applications yet.</Text>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
              {filteredApplications.map((application) => (
                <Box
                  key={application.id}
                  bg="gray.50"
                  borderRadius="xl"
                  borderWidth="1px"
                  p="5"
                >
                  <Stack gap="3">
                    <Stack gap="1">
                      <Text color="gray.900" fontSize="lg" fontWeight="700">
                        {application.job_title}
                      </Text>
                      <Text color="gray.700">{application.company}</Text>
                      {application.location ? (
                        <Text color="gray.600" fontSize="sm">
                          {application.location}
                        </Text>
                      ) : null}
                    </Stack>

                    <Text
                      color="blue.700"
                      fontSize="sm"
                      fontWeight="600"
                      textTransform="capitalize"
                    >
                      {application.status}
                    </Text>

                    {application.applied_at ? (
                      <Text color="gray.600" fontSize="sm">
                        Applied: {application.applied_at}
                      </Text>
                    ) : null}

                    {application.job_url ? (
                      <Link
                        color="blue.600"
                        href={application.job_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open job post
                      </Link>
                    ) : null}

                    {application.notes ? (
                      <Text color="gray.700" fontSize="sm">
                        {application.notes}
                      </Text>
                    ) : null}

                    <Stack direction="row" flexWrap="wrap" gap="2">
                      {statusOptions.map((status) => (
                        <Button
                          key={status}
                          onClick={() =>
                            handleStatusChange(application.id, status)
                          }
                          px="3"
                          size="xs"
                          textTransform="capitalize"
                          variant={
                            application.status === status ? "solid" : "outline"
                          }
                        >
                          {status}
                        </Button>
                      ))}
                    </Stack>

                    <Button
                      colorPalette="red"
                      onClick={() => handleDelete(application.id)}
                      px="4"
                      size="sm"
                      variant="outline"
                      width="fit-content"
                    >
                      Delete
                    </Button>
                  </Stack>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Stack>
      </Box>
    </Stack>
  );
}
