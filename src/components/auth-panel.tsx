"use client";

import {
  Box,
  Button,
  Heading,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuthSession } from "@/hooks/use-auth-session";

export function AuthPanel() {
  const { loadingSession, session, supabase } = useAuthSession();
  const [authLoading, setAuthLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    if (!supabase) return;

    setAuthLoading(true);
    setErrorMessage(null);
    setMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setMessage("Signed in.");
    }

    setAuthLoading(false);
  }

  async function handleSignUp() {
    if (!supabase) return;

    setAuthLoading(true);
    setErrorMessage(null);
    setMessage(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setMessage(
        "Account created. If email confirmation is enabled, confirm your email and then sign in.",
      );
    }

    setAuthLoading(false);
  }

  async function handleSignOut() {
    if (!supabase) return;

    await supabase.auth.signOut();
    setMessage("Signed out.");
  }

  return (
    <Box
      bg="white"
      borderRadius="xl"
      borderWidth="1px"
      p={{ base: "5", md: "6" }}
    >
      <Stack gap="4">
        <Heading fontSize="2xl">
          {session ? "You are signed in" : "Sign in or create an account"}
        </Heading>

        {!supabase ? (
          <Text color="gray.700">
            Add your Supabase environment variables first, then this page will
            connect.
          </Text>
        ) : loadingSession ? (
          <Spinner size="sm" />
        ) : session ? (
          <>
            <Text color="gray.700">{session.user.email}</Text>
            <Button onClick={handleSignOut} px="6" width="fit-content">
              Sign out
            </Button>
          </>
        ) : (
          <>
            <Input
              placeholder="Email"
              px="4"
              py="6"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              placeholder="Password"
              px="4"
              py="6"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Stack direction={{ base: "column", sm: "row" }} gap="3">
              <Button
                colorPalette="blue"
                loading={authLoading}
                onClick={handleSignIn}
                px="6"
              >
                Sign in
              </Button>
              <Button
                loading={authLoading}
                onClick={handleSignUp}
                px="6"
                variant="outline"
              >
                Sign up
              </Button>
            </Stack>
          </>
        )}

        {message ? <Text color="green.700">{message}</Text> : null}
        {errorMessage ? <Text color="red.700">{errorMessage}</Text> : null}
      </Stack>
    </Box>
  );
}
