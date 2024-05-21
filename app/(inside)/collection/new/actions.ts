import { auth } from "edgedb-client";

export const addChannel = async (name: string) => {
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
      filter .id = global current_user.id
      set {
        channels += channel
      }
    `,
    { name: cleanedName }
  );
};