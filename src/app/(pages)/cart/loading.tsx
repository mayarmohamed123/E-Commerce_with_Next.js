import { Spinner } from "@/Components/ui";
import React from "react";

export default function loading() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Spinner className="size-20 text-blue-500" />
    </div>
  );
}
