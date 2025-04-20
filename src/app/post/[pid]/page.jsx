"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const [post, setPost] = useState([]);
  const { pid } = useParams();

  const sanitizeHtml = (html) => {
    if (!html) return "";
    return html
      .replace(/data-src=/g, "src=")
      .replace(/data-srcset=/g, "srcset=");
  };

  useEffect(() => {
    fetch(`https://bankingkhabar.com/wp-json/wp/v2/posts/${pid}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error("Error fetching post:", err));
  }, [pid]);

  return (
    <>
      <section className="container mx-auto px-4">
        <div
          className="flex flex-col items-center gap-2 text-2xl leading-10"
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(post?.content?.rendered || ""),
          }}
        ></div>
      </section>
    </>
  );
}

export default Page;
