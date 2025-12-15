import { NextApiRequest, NextApiResponse } from "next";
import tokenHandler from "../token";

export default function handleLiveKitToken(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return tokenHandler(req, res);
}
