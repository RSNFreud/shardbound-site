"use client";
import { useSearchParams } from "next/navigation";

export const useAuthParams = () => {
  const searchParams = useSearchParams();

  return searchParams.get("authKey");
};
