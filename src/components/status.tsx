import React from "react";
import getStatus from "src/data/getStatus";

export const revalidate = 60;

export default async function Status({
  children,
}: React.PropsWithChildren<{}>) {
  const status = await getStatus();
  return <p>{status}</p>;
}
