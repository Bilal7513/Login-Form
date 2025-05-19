"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { setCookie, setUsername } from "@/utlis/cookies";
import { jwtDecode } from "jwt-decode";


export default function CallbackClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const DOMAIN = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
  const CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI;

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) return;

    async function exchangeCode() {
      const body = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: CLIENT_ID,
        code,
        redirect_uri: REDIRECT_URI,
      });

      const res = await fetch(
        `https://${DOMAIN}/oauth2/token`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body,
        }
      );

      if (res.ok) {
        const tokens = await res.json();
        const decoded = jwtDecode(tokens.id_token);
        console.log(decoded);
        const username = decoded.name || decoded["custom:display_name"] || decoded["cognito:username"];

        if (username) {
          setUsername("username", username);
        }
        setCookie('accessToken', tokens.id_token, 3600)
        router.push("/");
      } else {
        console.error("Token exchange failed", await res.text());
      }
    }

    exchangeCode();
  }, [searchParams, router]);
}