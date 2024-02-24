import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import moment from "moment";
import { TrashIcon } from "@heroicons/react/24/solid";

const Entry = () => {
  const { status: sessionStatus } = useSession();
  const { replace, query } = useRouter();
  const entryId = Array.isArray(query.pid) ? query.pid[0] : query.pid;

  const {
    data: entryData,
    status: entryStatus,
    refetch: reFetchEntry,
  } = api.journalling.getEntryById.useQuery(
    { id: entryId! },
    {
      enabled: entryId !== undefined,
    },
  );

  const { mutate: deletionMutation } = api.journalling.deleteEntry.useMutation({
    onSuccess() {
      replace(`/entries`);
    },
  });

  const { mutate: rateMoodMuatation, status: rateMoodStatus } =
    api.ai.rateEntry.useMutation({
      onSuccess() {
        reFetchEntry();
      },
    });

  const ratingToEmoji = (rating: number) => {
    if (rating < 2) {
      return {
        text: "Very Sad 😢",
        color: "bg-red-700",
      };
    } else if (rating <= 4) {
      return {
        text: "Sad 😟",
        color: "bg-orange-600",
      };
    } else if (rating <= 6) {
      return {
        text: "Normal 😐",
        color: "bg-indigo-700",
      };
    } else if (rating <= 8) {
      return {
        text: "Happy 😊",
        color: "bg-teal-700",
      };
    } else {
      return {
        text: "Very Happy 😁",
        color: "bg-emerald-700",
      };
    }
  };

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      replace("/");
    }
  }, [sessionStatus]);

  return (
    <>
      <Head>
        <title>Entry</title>
      </Head>

      <section className="sec-container">
        {entryData !== null && (
          <div className="mx-auto flex w-[80%] flex-col gap-10  sm:w-1/2">
            <div className="flex flex-col items-center justify-between max-xl:gap-10 xl:flex-row">
              <h1 className="font-poppins text-3xl font-extrabold ">
                {moment(entryData?.dateCreated).format("Do MMMM  YYYY")}
              </h1>

              <div className="flex items-center gap-3 font-poppins max-xl:w-full  max-xl:justify-between">
                {entryData?.moodRating === null && (
                  <button
                    disabled={rateMoodStatus === "loading"}
                    className="relative p-[2px]"
                    onClick={() => rateMoodMuatation({ id: entryId! })}
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-600 to-amber-500" />
                    <div className="group relative  rounded-xl bg-black px-5 py-[6px] text-white transition duration-200 hover:bg-transparent">
                      Analyse Mood
                    </div>
                  </button>
                )}
                <button
                  onClick={() => deletionMutation({ id: entryId! })}
                  className="duration-400 transform rounded-lg border  border-white bg-transparent px-4 py-2 font-bold text-white shadow-[0_0_0_3px_#000000_inset] backdrop-blur transition hover:-translate-y-1"
                >
                  <TrashIcon width={20} />
                </button>
              </div>
            </div>

            {entryData?.moodRating && (
              <div
                className={`w-max justify-center rounded-2xl p-3 ${ratingToEmoji(entryData.moodRating).color} font-poppins text-xl font-semibold text-black`}
              >
                {ratingToEmoji(entryData.moodRating).text}
              </div>
            )}
            <p className="whitespace-pre-line rounded-lg border border-white/20  bg-transparent/10 p-5 font-montserrat text-lg backdrop-blur-[2px]">
              {entryData?.content}
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default Entry;
