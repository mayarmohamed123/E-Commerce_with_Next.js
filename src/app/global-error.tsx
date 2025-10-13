"use client";

import React from "react";

export default function GlobalError() {
  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-red-600 text-3xl font-semibold">
        <h2>Something went terribly wrong 😔</h2>
      </body>
    </html>
  );
}
