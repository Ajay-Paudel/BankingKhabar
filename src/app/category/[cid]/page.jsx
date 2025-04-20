"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";


function Page() {
  const [posts, setPosts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const { cid } = useParams();
  const postsPerPage = 5; 

  useEffect(() => {
    if (!cid) return;

    // pagination
    fetch(`https://bankingkhabar.com/wp-json/wp/v2/posts?categories=${cid}&page=${currentPage}&per_page=${postsPerPage}`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));

    //category name
    fetch(`https://bankingkhabar.com/wp-json/wp/v2/categories/${cid}`)
      .then((res) => res.json())
      .then((data) => setCategoryName(data.name))
      .catch((err) => console.error("Error fetching category name:", err));

    //pagination
    fetch(`https://bankingkhabar.com/wp-json/wp/v2/posts?categories=${cid}&per_page=${postsPerPage}`)
      .then((res) => {
        const totalPages = res.headers.get("X-WP-TotalPages");
        setTotalPages(Number(totalPages));
      })
      .catch((err) => console.error("Error fetching total pages:", err));
  }, [cid, currentPage]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {categoryName}
      </h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found in this category.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Link key={post.id} href={`/post/${post.id}`}>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4 border rounded-lg p-4 shadow-md">
              
                {post.featured_image_src ? (
                  <img
                    src={post.featured_image_src}
                    alt={post.title.rendered}
                    className="w-full md:w-48 h-32 object-cover rounded-lg"
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/150"
                    alt="No Image Available"
                    className="w-full md:w-48 h-32 object-cover rounded-lg"
                  />
                )}

                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{post.title.rendered}</h2>
                  <p
                    className="text-gray-700 mt-2"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
  <Stack spacing={2}>
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={(event, value) => setCurrentPage(value)}
      color="primary"
    />
  </Stack>
</div>

    </div>
  );
}

export default Page;
