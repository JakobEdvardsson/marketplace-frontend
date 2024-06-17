"use client";

export function PostedDate(props: { readonly createdAt: string }) {
  return `Posted: ${new Date(props.createdAt).toLocaleString(
    ["en-SE", "en-US"],
    {
      day: "numeric",
      month: "numeric",
      hour: "numeric",
      minute: "numeric",
    },
  )} in `;
}
