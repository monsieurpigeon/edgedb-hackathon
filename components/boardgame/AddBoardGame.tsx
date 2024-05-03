"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";
import { useState } from "react";

export default function AddBoardGame({
  addBoardGame,
}: {
  addBoardGame: (name: string) => Promise<void>;
}) {
  const [boardGameName, setBoardGameName] = useState("");
  const router = useRouter();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await addBoardGame(boardGameName);
        setBoardGameName("");
        posthog.capture("boardgame_add");
        router.refresh();
      }}
    >
      <div className="space-y-12">
        <div className="pb-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold leading-1 text-gray-900">
            New Board Game
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Pandemic"
                    value={boardGameName}
                    onChange={(e) => setBoardGameName(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-x-6">
        <Link href="/dashboard">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Save
        </button>
      </div>
    </form>
  );
}