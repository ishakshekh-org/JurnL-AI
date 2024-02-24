import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

import { api } from "@/utils/api";
import Link from "next/link";

export default function Home() {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>AI Journal App</title>
        <meta
          name="description"
          content="AI Enabled Personalized Journal App"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen w-full items-center justify-center text-center ">
        <div className="">
          <h1 className="bg-gradient-to-br from-white to-fuchsia-900 box-decoration-slice bg-clip-text font-poppins text-5xl font-extrabold text-transparent sm:text-7xl">
            JurnL AI !
          </h1>
          <h2 className="mb-5 p-2 font-montserrat text-3xl sm:text-5xl ">
            An AI Journaling App
          </h2>
          {!sessionData ? (
            <div className="flex flex-col gap-3">
              <hr />
              <p className="font-montserrat text-xl font-semibold">
                <span className="font-bold text-amber-700">SignIn </span>To
                Start Journalling
              </p>
              <button
                onClick={() => void signIn()}
                className="focus:ring-offset mx-auto animate-shimmer rounded-full border border-slate-700 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-10 py-2 font-poppins font-medium text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-slate-50"
              >
                Sign In
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center gap-5  max-sm:w-full max-sm:flex-col">
                <button className="duration-400 to transform rounded-lg  border border-white bg-gradient-to-br from-amber-500 to-violet-600  bg-clip-text px-8 py-2 font-bold capitalize text-transparent  shadow-[0_0_0_3px_#000000_inset] backdrop-blur-[2px] transition hover:-translate-y-1">
                  <Link href={`/entries`}>View Journls</Link>
                </button>
                <button className="duration-400 to transform rounded-lg  border border-white bg-gradient-to-br from-violet-600 to-amber-500  bg-clip-text px-8 py-2 font-bold capitalize text-transparent  shadow-[0_0_0_3px_#000000_inset] backdrop-blur-[2px] transition hover:-translate-y-1">
                  <Link href={`/write`}>Exprss Thoughts !</Link>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.post.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Log out" : "Sign in"}
      </button>
    </div>
  );
}
