import Loading from "@/components/Loading";
import NoEntries from "@/components/NoEntries";
import { api } from "@/utils/api";
import moment from "moment";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Entries = () => {
  const { status: sessionStatus } = useSession();
  const { replace } = useRouter();

  const { data: entriesData } = api.journalling.getAllEntries.useQuery(
    undefined,
    {
      enabled: sessionStatus === "authenticated",
    },
  );

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      replace("/");
    }
  }, [sessionStatus]);

  if (sessionStatus === "loading") {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Entries</title>
      </Head>

      <section className="sec-container">
        <h1 className="text-center font-poppins text-4xl font-bold text-neutral-50">
          Entries
        </h1>

        {entriesData?.length === 0 ? (
          <NoEntries />
        ) : (
          entriesData?.map((entry) => (
            <Link
              href={`/entries/${entry.id}`}
              key={entry.id}
              className="mx-auto flex w-[80%] flex-row rounded-lg border border-white/20 bg-transparent p-5 backdrop-blur-sm sm:w-1/2 sm:p-10"
            >
              <div className="flex flex-col gap-5 truncate">
                <p className="font-poppins text-xl text-gray-50">
                  {entry.content}
                </p>
                <p className="font-montserrat text-gray-300">
                  {moment(entry.dateCreated).format("Do MMM YY")}
                </p>
              </div>
            </Link>
          ))
        )}
      </section>
    </>
  );
};

export default Entries;
