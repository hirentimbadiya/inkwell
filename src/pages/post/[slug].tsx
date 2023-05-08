/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState } from "react";
import { sanityClient, urlFor } from "../../../sanity";
import Header from "@/components/Header";
import { Post } from "../../../typings";
import PortableText from "react-portable-text";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface Props {
  post: Post;
}

const IndividualPost = ({ post }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data);
        setSubmitted(true);
      })
      .catch((errors) => {
        console.error(errors);
        setSubmitted(false);
      });
  };

  return (
    <main className="h-full bg-white">
      <Header />
      <div className="flex px-10">
        <img
          src={urlFor(post.mainImage).url()}
          alt="main-image"
          className="md:h-[400px] h-[250px] w-full object-cover rounded-3xl"
        />
      </div>

      {/* Article for Blog Post */}
      <article className="max-w-3xl mx-auto flex flex-col items-center px-10">
        <h1
          className="md:text-[44px] sm:text-[36px] text-[26px] mt-10 mb-4 font-mukta font-extrabold justify-center
        text-[#f237ff]"
        >
          {post.title}
        </h1>
        <h2 className="text-xl font-extralight font-hind text-gray-600 mb-2">
          {post.description}
        </h2>
        <div className="flex items-center justify-center space-x-2">
          <img
            src={urlFor(post.author.image).url()}
            alt="author-image"
            className="h-10 w-10 rounded-full"
          />
          <p className="font-extralight text-sm font-jost">
            Blog Post by{" "}
            <span className="text-green-500">{post.author.name}</span> -
            Published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>

        {/* adding Portable text for Styling using Sanity Portable text like this */}
        <div>
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="text-2xl font-bold my-5" {...props} />
              ),
              h2: (props: any) => (
                <h1 className="text-xl font-bold my-5" {...props} />
              ),
              h3: (props: any) => (
                <h1
                  className="text-[24px] font-bold my-5 font-ubuntu text-[#300a56]"
                  {...props}
                />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc font-poppins text-[#150886]">
                  {children}
                </li>
              ),
              h4: (props: any) => (
                <h1
                  className="text-[20px] font-bold my-3 font-ubuntu text-[#370f5f]"
                  {...props}
                />
              ),
              normal: (props: any) => (
                <h1 className="text-[19px] font-hind my-5" {...props} />
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-600 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>
      <hr className="max-w-lg mx-auto my-5 border border-yellow-400" />

      {/* form field  */}
      {submitted ? (
        <div
          className="flex flex-col bg-yellow-500 max-w-3xl mx-auto px-10 py-10
        text-white"
        >
          <h1 className="font-ubuntu font-bold xs:text-3xl text-2xl">
            Comment Submitted Successfully!!
          </h1>
          <p className="font-hind font-bold xs:text-xl text-md">
            Once it is Approved it will appear below the article.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-10 my-10 mx-auto max-w-2xl mb-10"
          autoComplete="off"
        >
          <h3 className="text-md text-green-500 font-ubuntu">
            Enjoyed this article?
          </h3>
          <h4 className="text-3xl font-bold font-hind">
            Leave a comment below!
          </h4>
          <hr className="py-3 mt-2" />

          {/*  */}
          <input
            {...register("_id")}
            type="hidden"
            name="_id"
            value={post._id}
            autoComplete="false"
          />

          <label className="block mb-5">
            <span className="text-green-500 font-karla font-semibold">
              Name:{" "}
            </span>
            <input
              {...register("name", { required: true })}
              type="text"
              className="shadow border rounded py-2 px-3 mt-1 block w-full ring-yellow-300 outline-none focus:ring"
              placeholder="Virat Kohli"
            />
          </label>
          <label className="block mb-5">
            <span className="text-green-500 font-karla font-semibold">
              Email:{" "}
            </span>
            <input
              {...register("email", { required: true })}
              type="text"
              className="shadow border rounded py-2 px-3 mt-1 block w-full ring-yellow-300 outline-none focus:ring"
              placeholder="imvkohli18@email.com"
            />
          </label>
          <label className="block mb-5">
            <span className="text-green-500 font-karla font-semibold">
              Comment:{" "}
            </span>
            <textarea
              {...register("comment", { required: true })}
              rows={8}
              className="shadow border rounded py-2 px-3 mt-1 block w-full ring-yellow-300 outline-none focus:ring"
              placeholder="Type a Comment!"
            />
          </label>

          {/* errors will return when field validation fails */}
          <div className="flex flex-col p-5">
            {errors.name && (
              <span className="text-red-500 font-poppins">
                The Name field is required!
              </span>
            )}
            {errors.email && (
              <span className="text-red-500 font-poppins">
                The Email field is required!
              </span>
            )}
            {errors.comment && (
              <span className="text-red-500 font-poppins">
                The Comment field is required!
              </span>
            )}
          </div>
          <button
            type="submit"
            className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline
        focus:outline-none text-white hover:text-black font-bold py-2 px-4 rounded cursor-pointer
        transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </form>
      )}
    </main>
  );
};

export default IndividualPost;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
        _id,
        slug{
            current
        }
    }`;
  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

//* Query
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author->{
          name,
          image
        },
        'comments': *[
          _type == "comment" &&
          post._ref == ^._id &&
          approved == true],
          description,
          mainImage,
          slug,
          body
      }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    //* this will update the cache after every 60 seconds!! cooooool.
    revalidate: 60,
  };
};
