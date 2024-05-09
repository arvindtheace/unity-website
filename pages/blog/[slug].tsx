import {
  builder,
  BuilderComponent,
  BuilderContent,
  useIsPreviewing,
} from "@builder.io/react";
import React from 'react';
import Head from "next/head";
import DefaultErrorPage from "next/error";
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from "react-share";
import { Facebook, Twitter, Instagram, LinkedIn, Copy } from "@/components/icons";
import styled from "styled-components";
import Navbar from "@/components/Navbar";
import { formatDistanceToNow } from "date-fns";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY as string);

function BlogArticle({ article }: { article: any }) {
  console.log(article)
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const isPreviewing = useIsPreviewing();
  if (!article && !isPreviewing) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  // function to copy the url to clipboard
  const copyUrl = () => {
    navigator.clipboard.writeText(shareUrl);
  }
  let newDate  = new Date(article?.data?.date);
  //@ts-ignore
  const elapsedTime = isNaN(newDate) ? '' : formatDistanceToNow(newDate, { addSuffix: true });

  return (
    <>
      <BuilderContent
        content={article}
        model="blog-articles"
      >
        {(data, loading, fullContent) => (
          <React.Fragment>
            <Head>
              {/* Render meta tags from custom field */}
              <title>{article?.data?.title}</title>
              <meta name="description" content={article?.data?.excerpt} />
              <meta name="og:image" content={article?.data?.image} />
            </Head>

            <Navbar color="light" />

            <section>
              <div className="container mx-auto">

                <img src={article?.data?.image} alt={article?.data?.title} className="w-full object-cover rounded-x mb-12" />

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                  <div className="col-span-2">
                    <h3 className="mb-4">{article?.data?.title}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                      {/* {article?.data?.categories.map((category: any, index: number) => (
                        <p key={category}>
                          <span className="uppercase text-[#B97A00] font-semibold tracking-wider">{category}</span>
                          {index !== data.categories.length - 1 && <span>,</span>}
                        </p>
                      ))} */}
                      <span className="uppercase text-[#B97A00] font-semibold tracking-wider">{article?.data?.primaryCategory}</span>
                      <p className='text-gray-500'>{article?.data?.readTime} min read&nbsp;&nbsp;|&nbsp;&nbsp;{elapsedTime}</p>
                    </div>  
                    <hr className="mt-4 mb-8" />
                    <BlogContent className="mb-12">
                      {/* Render the Builder drag/drop'd content */}
                      <BuilderComponent
                        model="blog-articles"
                        content={fullContent}
                      />
                    </BlogContent>
                  </div>
                  
                  {/* Sidebar */}
                  <div className="col-span-2 sm:col-span-1">
                    <div>
                      <h6 className='mb-6'>Share this blog</h6>
                      <div className="flex flex-wrap items-center gap-2">
                        <FacebookShareButton url={shareUrl}>
                          <Facebook fill="#6F7276" />
                        </FacebookShareButton>
                        <TwitterShareButton url={shareUrl}>
                          <Twitter fill="#6F7276" />
                        </TwitterShareButton>
                        <LinkedinShareButton url={shareUrl}>
                          <LinkedIn fill="#6F7276" />
                        </LinkedinShareButton>
                        <a onClick={copyUrl} className="cursor-pointer px-3">
                          <Copy fill="#6F7276" />
                        </a>
                      </div>
                    </div>
                    
                    <hr className="my-10" />

                    <h6 className='mb-6'>Related Blogs</h6>
                    {
                      article?.data.related?.map((item: any) => (
                        <div key={item.article.value.data.slug} className="mb-6">
                          <img src={item.article.value.data.image} alt={item.article.value.data.title} className="w-full h-44 object-cover rounded-xl mb-4" />
                          <h6 className="mb-2">{item.article.value.data.title}</h6>
                        </div>
                      ))
                    }
                  </div>
                </div>

              </div>
            </section>

          </React.Fragment>
        )}
      </BuilderContent>
    </>
  );
}

export async function getStaticProps({ params }: { params: any }) {
  const article = await builder
    .get("blog-articles", {
      query: {
        // Get the specific article by slug
        "data.slug": params.slug,
      },
    })
    .promise() || null;

  return {
    props: {
      article,
    },
    revalidate: 10
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export default BlogArticle;

const BlogContent = styled.div`
  margin: 24px auto;
`
