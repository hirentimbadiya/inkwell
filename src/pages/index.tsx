/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import Header from "@/components/Header";
import Image from "next/image";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import Link from "next/link";

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  console.log(posts);

  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Inkwell</title>
        <link
          rel="shortcut icon"
          href="/assets/favicon.png"
          type="image/x-icon"
        />
      </Head>
      <Header />
      <div
        className="flex justify-center items-center bg-yellow-400
       border-black border-y-2 py-10 lg:py-0"
      >
        <div className="px-10 space-y-5">
          <h1 className="text-5xl sm:text-6xl  max-w-xl font-serif">
            <span className="font-ubuntu underline decoration-blue-600 decoration-4 ">
              Inkwell
            </span>{" "}
            is the place to write, read and connect
          </h1>
          <h2 className="text-[18px] font-poppins">
            It's easy and free to post your thinking on any topic and connect
            with millions of readers.
          </h2>
        </div>

        <Image
          src="/assets/logoink.png"
          alt=""
          width={200}
          height={30}
          className="w-[300px] h-[250px] hidden sm:inline-flex object-contain lg:h-full"
        />
      </div>
      {/* Posts  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 lg:p-6">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="group border rounded-lg overflow-hidden cursor-pointer">
              <img
                src={urlFor(post.mainImage).url()!}
                alt="main-image"
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform
               duration-200 ease-in-out"
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p className="text-lg font-bold font-ubuntu">{post.title}</p>
                  <p className="text-sm max-w-[290px] font-mukta">
                    {post.description} by {post.author.name}
                  </p>
                </div>
                <img
                  src={urlFor(post.author.image).url()!}
                  alt="author-image"
                  className="h-12 w-12 rounded-full"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
      title,
      author-> {
        name,
        image
      },
      description,
      mainImage,
      slug
  }`;
  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    },
  };
};
