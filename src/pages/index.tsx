import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { signIn, signOut, useSession } from "next-auth/react";

//login page
const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return <p>You are signed in!</p>;
  }

  //discord sign in
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
