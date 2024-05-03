import AddChannel from "@/components/channel/AddChannel";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { auth } from "edgedb-client";
import Link from "next/link";

const addChannel = async (name: string) => {
  "use server";

  const cleanedName = name.replace(/[^a-zA-Z0-9@]/g, "");
  const session = auth.getSession();
  await session.client.query(
    `
    with channel := (
      insert Channel { name := <str>$name }
      unless conflict on .name
      else Channel
    )
    update User
    filter .email = global current_user.email
    set {
      channels += channel
    }
  `,
    { name: cleanedName }
  );
};

export default function NewChannel() {
  return (
    <>
      <Link href="/collection">
        <button className="text-xs leading-6 text-gray-900">
          <ArrowLeftIcon className="h-4 w-4 inline-block" /> Back
        </button>
      </Link>
      <div className="mt-4">
        <AddChannel addChannel={addChannel} />
      </div>
    </>
  );
}