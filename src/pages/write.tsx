import Loading from "@/components/Loading";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Write = () => {
  const { status: sessionStatus } = useSession();
  const { replace } = useRouter();

  const [journalEntry, setJournalEntry] = useState("");

  const { mutate: createEntry } = api.journalling.createEntry.useMutation({
    onSuccess(data) {
      replace(`/entries/${data.id}`);
    },
  });

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      replace("/");
    }
  }, [sessionStatus]);

  if (sessionStatus === "loading") {
    return <Loading />;
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createEntry({ content: journalEntry });
  };
  return (
    <>
      <Head>
        <title>Write</title>
      </Head>

      <section className="sec-container">
        <h1 className="text-center font-poppins text-4xl font-bold text-neutral-50">
          Write With AI
        </h1>

        <form
          onSubmit={(e) => handleFormSubmit(e)}
          className="flex flex-col justify-center gap-5"
        >
          <textarea
            className="mx-auto w-[80%] rounded-xl border border-slate-800 bg-transparent p-5 font-montserrat tracking-wide backdrop-blur-sm md:w-1/2"
            cols={30}
            rows={10}
            placeholder="write down your thoughts"
            required
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="group relative mx-auto w-fit whitespace-pre-line rounded-md border border-white/80 bg-transparent  px-10 py-2 font-poppins text-xl font-semibold text-black transition duration-200"
          >
            <div className="absolute -bottom-2 -right-2 -z-10 h-full w-full rounded-md bg-purple-700 transition-all duration-200 group-hover:bottom-0 group-hover:right-0" />
            <span className="relative"></span>
            Finish!!
          </button>
        </form>
      </section>
    </>
  );
};

export default Write;
