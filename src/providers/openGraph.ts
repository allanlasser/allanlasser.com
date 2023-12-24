import ogs, { type SuccessResult } from "open-graph-scraper";

export async function getOpenGraphData(url: string) {
  const res = await ogs({ url });
  if (res.error) throw new Error("Error Result");
  return res.result;
}
