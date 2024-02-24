import { PencilIcon } from "@heroicons/react/24/solid";

const NoEntries = () => (
  <div className="mx-auto flex w-3/4 flex-row items-center justify-center gap-8 rounded-2xl border border-gray-400 bg-transparent p-10 font-montserrat text-lg text-gray-50 backdrop-blur-sm md:w-1/2">
    <PencilIcon width={40} />
    <p>You Don&apos;t have any entries</p>
  </div>
);

export default NoEntries;
