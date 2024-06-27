import { createTokenPool } from "@/utils/sundaeSwapUtils";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {

  const result = await createTokenPool();
  res.status(200).json({ name: "John Doe" });
}
