"use client";

import { Input } from "@/components/ui/input";
import { FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchBar(props: {
  readonly handleSearch: (_: string) => void;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParam = searchParams.get("q");

  useEffect(() => {
    if (searchParam) {
      handleSearch(searchParam);
    } else {
      handleSearch("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam]);

  const handleSearch = (e: string) => {
    props.handleSearch(e);
  };

  return (
    <form
      className="m-1 mb-2"
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const query = formData.get("query");
        const params = new URLSearchParams(searchParams);
        if (query instanceof File) {
          return;
        }

        if (query) {
          params.set("q", query);
        } else {
          params.delete("q");
        }

        replace(`${pathname}?${params.toString()}`);
      }}
    >
      <div className="flex">
        <Input
          defaultValue={searchParam ? searchParam : undefined}
          className=""
          name="query"
          type="search"
          placeholder="What are you looking for?"
        />
        <Button type="submit" variant="blue" className="rounded-l-none">
          Search
        </Button>
      </div>
    </form>
  );
}
