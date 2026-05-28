"use client";
import React from "react";
import { Button } from "@/components/ui/button";

type ContentBlockClientProps = {
  html: string;
};

export function ContentBlockClient({ html }: ContentBlockClientProps) {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <section
        className="mt-6 mb-8 max-w-2xl mx-auto w-full"
        style={{ display: show ? "block" : "none" }}
        aria-label="Additional Game Context"
        id="game-content-block"
      >
        <div
          className="prose prose-neutral dark:prose-invert text-base sm:text-lg"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </section>
      {!show && (
        <div className="flex justify-center mt-4">
          <Button
            type="button"
            className="w-full bg-[#F6CA56] hover:bg-[#e0b545] text-black font-bold h-12 text-lg shadow-lg shadow-[#F6CA56]/20 max-w-xs"
            onClick={() => setShow(true)}
            aria-expanded={show}
            aria-controls="game-content-block"
          >
            See More
          </Button>
        </div>
      )}
    </>
  );
}
