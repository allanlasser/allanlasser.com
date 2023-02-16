import type { NextApiRequest, NextApiResponse } from "next";
import createSource from "src/data/createSource";
import getAllSources from "src/data/getAllSources";
import getSource from "src/data/getSource";
import { Source } from "src/types/source";

type ResponseData =
  | string
  | Source
  | Source[]
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
    if (req.headers.secret !== process.env.API_SECRET) {
      res.status(401).send("Not Authorized");
      res.end();
      return;
    }
    // create new entry in Sanity
    const source = await createSource(req.body);
    // return the link the page in the studio
    res.status(200).json({
      message: "Source successfully created",
      liveUrl: `https://allanlasser.com/library/${source._id}`,
      studioUrl: `https://allanlasser.com/studio/desk/library;${source._id}`,
    });
  } else if (req.method === "GET") {
    const { id } = req.query;
    let data: Source | Source[];
    if (id) {
      const idArray = [].concat(id);
      if (idArray.length === 1) {
        data = await getSource(idArray[0]);
      } else {
        data = await Promise.all(
          idArray.map(async (id) => await getSource(id))
        );
      }
    } else {
      data = await getAllSources();
    }
    res.status(200).json(data);
  } else {
    res.status(405).send("Method not allowed");
  }
  res.end();
}
