/* eslint-disable @next/next/no-img-element */
import React from "react";
import { sanityClient, urlFor } from "../../../sanity";
import Header from "@/components/Header";
import { Post } from "../../../typings";
import PortableText from "react-portable-text";

interface Props {
  post: Post;
}

const IndividualPost = ({ post }: Props) => {
  console.log(post);

  return (
    <main className="bg-[#79a7a168]">
      <Header />
      <div className="flex px-10">
        <img
          src={urlFor(post.mainImage).url()}
          alt="main-image"
          className="md:h-[400px] h-[250px] w-full object-cover rounded-3xl"
        />
      </div>
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
    //* this will update the cache after every 60 seconds!! cooooool
    revalidate: 60,
  };
};
