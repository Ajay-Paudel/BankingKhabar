"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";

function page() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Keep this

  useEffect(() => {
    // Fetch data immediately on mount
    fetch("https://bankingkhabar.com/wp-json/wp/v2/posts?_embed")
      .then((res) => res.json())
      .then((data) => {
        setPosts(
          data.map((post) => ({
            ...post,
            featured_image_src:
              post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "", // fallback
          }))
        );
        setLoading(false); // ✅ Hide loading once data is in
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
        setLoading(false); // Hide loader on error too
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircleLoader color="#d63636" size={80} />
      </div>
    );
  }

  return (
    <>
      <section className="container mx-auto px-4">
        <img
          className="w-full"
          src="https://bankingkhabar.com/wp-content/uploads/2024/09/1000-x-100.gif"
          alt="Banner"
        />
        <div>
          <Link href={`/post/${posts[0]?.id}`}>
            <p className="text-red-500 text-5xl font-bold text-center leading-20 mt-10">{posts[0]?.title?.rendered}</p>
            <img className="w-full pb-10" src={posts[0]?.featured_image_src} alt="" />
          </Link>

          <div className="h-60 relative mb-10">
            <Link href={`/post/${posts[3]?.id}`}>
              <img className="w-full h-full object-cover" src={posts[3]?.featured_image_src} alt="" />
              <p className="absolute inset-0 flex items-center justify-center bg-black/55 text-white text-4xl font-semibold">
                {posts[3]?.title?.rendered}
              </p>
            </Link>
          </div>

          <div className="h-60 relative mb-10">
            <Link href={`/post/${posts[2]?.id}`}>
              <img className="w-full h-full object-cover" src={posts[2]?.featured_image_src} alt="" />
              <p className="absolute inset-0 flex items-center justify-center bg-black/55 text-white text-4xl font-semibold">
                {posts[2]?.title?.rendered}
              </p>
            </Link>
          </div>
          {/* AD */}
          <div className="flex justify-center">
            <img src="https://bankingkhabar.com/wp-content/uploads/2019/03/prabhumoney.gif" alt="" />
          </div>
        </div>
      </section>


      <section className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Link href={`/post/${posts[0]?.id}`}>
              <img src={posts[2]?.featured_image_src} alt="" />
              <p className="text-red-500 font-bold text-2xl">{posts[5]?.title?.rendered}</p>
            </Link>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Link href={`/post/${posts[0]?.id}`}>
              <img src={posts[2]?.featured_image_src} alt="" />
              <p className="text-red-500 font-bold text-2xl">{posts[5]?.title?.rendered}</p>
            </Link>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Link href={`/post/${posts[0]?.id}`}>
              <img src={posts[2]?.featured_image_src} alt="" />
              <p className="text-red-500 font-bold text-2xl">{posts[5]?.title?.rendered}</p>
            </Link>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <img src="https://bankingkhabar.com/wp-content/uploads/2025/02/900x150.gif" alt="" />
        </div>
      </section>



      {/* मुख्य Section */}
      <section className=" bg-gray-300 p-6">
        <div className="container mx-auto flex flex-col lg:flex-row gap-6">

          {/* Left  */}
          <div className="lg:w-1/2 relative h-[400px]">
            <img className="w-full h-full object-cover" src={posts[1]?.featured_image_src} alt="" />
            <Link href={`/post/${posts[1]?.id}`}>
              <p className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-3xl font-bold p-4 text-center">
                {posts[1]?.title?.rendered}
              </p>
            </Link>
          </div>

          {/* Right-side  */}
          <div className="lg:w-1/4 flex flex-col gap-4">
            {[2, 3, 4, 5].map((index) => (
              <div key={index} className="flex border-b border-dotted pb-2">
                <Link href={`/post/${posts[index]?.id}`} className="flex gap-2 items-center">
                  <img className="h-[70px] w-[80px] object-cover" src={posts[index]?.featured_image_src} alt="" />
                  <p className="text-md font-semibold">{posts[index]?.title?.rendered}</p>
                </Link>
              </div>
            ))}
          </div>

          {/* Right-side ads */}
          <div className="lg:w-1/4 flex flex-col gap-4">
            <img className="w-full" src="https://bankingkhabar.com/wp-content/uploads/2019/09/subisu.gif" alt="Ad 1" />
            <img className="w-full" src="https://bizmandu.com/wp-content/uploads/2025/01/Bizmandu-Design_300x150.gif" alt="Ad 2" />
          </div>

        </div>
      </section>


      {/*विशेष*/}
      <section className="bg-[#eeeeee] py-6 px-4">
        <div className="container mx-auto">
          <h2 className="text-white bg-red-600 text-2xl px-4 py-1 inline-block mb-4">विशेष</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.slice(6, 9).map((post) => (
              <Link key={post.id} href={`/post/${post.id}`} className="bg-white rounded overflow-hidden shadow hover:shadow-lg transition duration-300">
                <img className="w-full h-[200px] object-cover" src={post.featured_image_src} alt={post.title.rendered} />
                <p className="text-red-600 font-bold text-lg p-3">{post.title.rendered}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* मुख्य Section */}
      <section className="bg-gray-300 p-6">
        <div className="container mx-auto">
          <h2 className="text-white bg-red-600 text-2xl px-4 py-1 inline-block mb-4">बैंकिङ खबर</h2>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left */}
            <div className="lg:w-1/2 relative h-[400px]">
              <img className="w-full h-full object-cover" src={posts[1]?.featured_image_src} alt="" />
              <Link href={`/post/${posts[1]?.id}`}>
                <p className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-3xl font-bold p-4 text-center">
                  {posts[1]?.title?.rendered}
                </p>
              </Link>
            </div>

            {/* Right-side */}
            <div className="lg:w-1/4 flex flex-col gap-4">
              {[2, 3, 4, 5].map((index) => (
                <div key={index} className="flex border-b border-dotted pb-2">
                  <Link href={`/post/${posts[index]?.id}`} className="flex gap-2 items-center">
                    <img className="h-[70px] w-[80px] object-cover" src={posts[index]?.featured_image_src} alt="" />
                    <p className="text-md font-semibold">{posts[index]?.title?.rendered}</p>
                  </Link>
                </div>
              ))}
            </div>

            {/* Right-side ads */}
            <div className="lg:w-1/4 flex flex-col gap-4">
              <img className="w-full" src="https://bankingkhabar.com/wp-content/uploads/2019/09/subisu.gif" alt="Ad 1" />
              <img className="w-full" src="https://bizmandu.com/wp-content/uploads/2025/01/Bizmandu-Design_300x150.gif" alt="Ad 2" />
            </div>
          </div>
        </div>
      </section>


      {/* राष्ट्र बैंक Section */}
      <section className="bg-[#dedcec] py-6 px-4">
        <div className="container mx-auto">
          <h2 className="text-white bg-red-600 text-2xl px-4 py-1 inline-block mb-4">राष्ट्र बैंक</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

            
            <Link href={`/post/${posts[0]?.id}`} className="relative h-full">
              <img src={posts[0]?.featured_image_src} alt={posts[0]?.title.rendered} className="w-full h-[330px] object-cover" />
              <div className="absolute inset-0 bg-[#00000055] bg-opacity-40 flex items-end">
                <h3 className="text-white text-xl font-bold p-4">{posts[0]?.title.rendered}</h3>
              </div>
            </Link>

            
            <div className="col-span-1 space-y-4">
              {[1, 2, 3].map((index) => (
                <Link key={posts[index]?.id} href={`/post/${posts[index]?.id}`} className="flex gap-4 border-b pb-3 hover:bg-gray-100 transition duration-200">
                  <img src={posts[index]?.featured_image_src} alt={posts[index]?.title.rendered} className="w-24 h-20 object-cover rounded" />
                  <p className="font-semibold text-black">{posts[index]?.title.rendered}</p>
                </Link>
              ))}
            </div>

            {/* Scrollable*/}
            <div className="col-span-1">
              <h3 className="bg-red-600 text-white text-md px-3 py-1 mb-3">नयाँ अपडेट</h3>
              <div className="space-y-3 max-h-[330px] overflow-y-auto pr-2">
                {[4, 5, 6, 7, 8, 9].map((index) => (
                  <Link key={posts[index]?.id} href={`/post/${posts[index]?.id}`} className="flex gap-3 hover:bg-gray-100 p-1 transition duration-200">
                    <img src={posts[index]?.featured_image_src} alt={posts[index]?.title.rendered} className="w-16 h-12 object-cover" />
                    <p className="text-sm">{posts[index]?.title.rendered}</p>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* बीमा, शेयर बजार, अर्थ Section */}
      <section className="bg-white py-6 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* बीमा Section */}
          <div className="bg-white border rounded shadow">
            <h3 className="bg-red-600 text-white text-xl text-center py-2">बीमा</h3>
            <img src={posts[0]?.featured_image_src} alt={posts[0]?.title.rendered} className="w-full h-[160px] object-cover" />
            <p className="text-blue-700 font-semibold text-md px-4 py-2 hover:underline cursor-pointer">
              <Link href={`/post/${posts[0]?.id}`}>{posts[0]?.title.rendered}</Link>
            </p>
            <div className="px-4 h-[300px] overflow-y-auto space-y-3 text-sm text-gray-700">
              {posts.slice(1, 10).map((post, index) => (
                <p key={post?.id || index} className="flex items-start gap-2">
                  <span>🕒</span>
                  <Link href={`/post/${post?.id}`} className="hover:underline">{post?.title.rendered}</Link>
                </p>
              ))}
            </div>
          </div>

          {/* शेयर बजार Section */}
          <div className="bg-white border rounded shadow">
            <h3 className="bg-red-600 text-white text-xl text-center py-2">शेयर बजार</h3>
            <img src={posts[0]?.featured_image_src} alt={posts[0]?.title.rendered} className="w-full h-[160px] object-cover" />
            <p className="text-blue-700 font-semibold text-md px-4 py-2 hover:underline cursor-pointer">
              <Link href={`/post/${posts[0]?.id}`}>{posts[0]?.title.rendered}</Link>
            </p>
            <div className="px-4 h-[300px] overflow-y-auto space-y-3 text-sm text-gray-700">
              {posts.slice(1, 10).map((post, index) => (
                <p key={post?.id || index} className="flex items-start gap-2">
                  <span>🕒</span>
                  <Link href={`/post/${post?.id}`} className="hover:underline">{post?.title.rendered}</Link>
                </p>
              ))}
            </div>
          </div>

          {/* अर्थ Section */}
          <div className="bg-white border rounded shadow">
            <h3 className="bg-red-600 text-white text-xl text-center py-2">अर्थ</h3>
            <img src={posts[0]?.featured_image_src} alt={posts[0]?.title.rendered} className="w-full h-[160px] object-cover" />
            <p className="text-blue-700 font-semibold text-md px-4 py-2 hover:underline cursor-pointer">
              <Link href={`/post/${posts[0]?.id}`}>{posts[0]?.title.rendered}</Link>
            </p>
            <div className="px-4 h-[300px] overflow-y-auto space-y-3 text-sm text-gray-700">
              {posts.slice(1, 10).map((post, index) => (
                <p key={post?.id || index} className="flex items-start gap-2">
                  <span>🕒</span>
                  <Link href={`/post/${post?.id}`} className="hover:underline">{post?.title.rendered}</Link>
                </p>
              ))}
            </div>
          </div>

        </div>
      </section>

 {/* ताजा समाचारहरू Section */}
      <section className="container mx-auto py-6">
        <h2 className="text-2xl font-bold text-red-600 mb-4 px-4">ताजा समाचारहरू</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Link href={`/post/${post.id}`}>
                <div className="w-full h-[250px]">
                  <img
                    className="w-full h-full object-cover"
                    src={post.featured_image_src}
                    alt={post.title.rendered}
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {post.title.rendered}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>



    </>
  );
}

export default page;
