import { AgentDispatchClient } from "livekit-server-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. Ensure this is a POST request
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 2. Body parsing is handled automatically by Next.js in Pages Router
    const { roomName, agentName, metadata } = req.body;

    const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || "ws://localhost:7880";
    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;
    const PRIMARY_SIP_TRUNK_NUMBER = process.env.PRIMARY_SIP_TRUNK_NUMBER;

    // Safety check for metadata
    const safeMetadata = metadata || {};
    if (PRIMARY_SIP_TRUNK_NUMBER) {
      safeMetadata["sipTrunkNumbers"] = [PRIMARY_SIP_TRUNK_NUMBER];
    }

    console.log("Dispatching agent:", { roomName, agentName, metadata: safeMetadata });

    if (!apiKey || !apiSecret) {
      return res.status(500).json({ error: "LiveKit API credentials not configured" });
    }

    const agentDispatchClient = new AgentDispatchClient(wsUrl, apiKey, apiSecret);

    const dispatch = await agentDispatchClient.createDispatch(roomName, agentName, {
      metadata: JSON.stringify(safeMetadata),
    });

    console.log("Created dispatch:", dispatch);

    return res.status(200).json({ success: true, dispatch });
  } catch (error) {
    console.error("Error dispatching agent:", error);
    return res.status(500).json({ error: "Failed to dispatch agent" });
  }
}
