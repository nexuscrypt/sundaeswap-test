import { createPool } from "@/utils/sundaeSwapUtils";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  const result = await createPool();

  res.status(200).json(result);
}
