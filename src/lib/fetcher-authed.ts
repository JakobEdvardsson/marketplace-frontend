// @ts-ignore
export const authedFetcher = (...args) =>
  // @ts-ignore
  fetch(...args, { credentials: "include" }).then((res) => res.json());
