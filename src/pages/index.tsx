import type { NextPage } from "next";
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect } from 'react';

import Navbar from '../components/Navbar';
import { trpc } from '../utils/trpc';

//login page
const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <div>
        <p>You&apos;re in!</p>
        <Navbar />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  } else
    return (
      <div className="flex flex-col items-center justify-center">
        <Head>
          <title>Home</title>
        </Head>
        <h1>Home</h1>
        <button onClick={() => signIn("google")}>Sign in</button>
      </div>
    );
};

export default Home;
