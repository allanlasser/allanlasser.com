import type { NextApiRequest, NextApiResponse } from "next";
import createNote from "src/data/createNote";
import getAllNotes from "src/data/getAllNotes";
import getNote from "src/data/getNote";
import { Note } from "src/types/note";

type ResponseData =
  | string
  | Note
  | Note[]
  | {
      message: string;
      liveUrl?: string;
      studioUrl?: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    // ensure secret
    if (req.body.secret !== process.env.API_SECRET) {
      res.status(401).send("Not Authorized");
      res.end();
      return;
    }
    // create new entry in Sanity
    const { note } = await createNote(req.body);
    // return the link the page in the studio
    res.status(200).json({
      message: "Note successfully created",
      liveUrl: `https://allanlasser.com/notes/${note._id}`,
      studioUrl: `https://allanlasser.com/studio/desk/notes;${note._id}`,
    });
  } else if (req.method === "GET") {
    const { id } = req.query;
    let data: Note | Note[];
    if (id) {
      const idArray = [].concat(id);
      if (idArray.length === 1) {
        data = await getNote(idArray[0]);
      } else {
        data = await Promise.all(idArray.map(async (id) => await getNote(id)));
      }
    } else {
      data = await getAllNotes();
    }
    res.status(200).json(data);
  } else {
    res.status(405).send("Method not allowed");
  }
  res.end();
}
