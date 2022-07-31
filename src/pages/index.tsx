import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

//login page
const Home: NextPage = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <div>
        <p>You're in!</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  } else
    return (
      <div className="flex flex-col justify-center items-center">
        <Head>
          <title>Home</title>
        </Head>
        <h1>Home</h1>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
};

export default Home;
