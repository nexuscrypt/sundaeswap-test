import type { NextApiRequest, NextApiResponse } from "next";
import { createPool } from "@/utils/sundaeSwapUtils";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    const result = await createPool();
    res.status(200).json(result);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}
