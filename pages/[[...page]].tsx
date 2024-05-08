import React, { useEffect } from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { BuilderContent } from "@builder.io/sdk";
import { GetStaticProps } from "next";
import "../builder-registry";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import '@builder.io/widgets';
import Custom404 from "./404";


builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// Define a function that fetches the Builder
// content for a given page
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch the builder content for the given page
  const page = await builder
    .get("page", {
      userAttributes: {
        urlPath: "/" + ((params?.page as string[])?.join("/") || ""),
      },
    })
    .toPromise();

  // Return the page content as props
  return {
    props: {
      page: page || null,
    },
    // Revalidate the content every 5 seconds
    revalidate: 5,
  };
};

// Define a function that generates the
// static paths for all pages in Builder
export async function getStaticPaths() {
  // Get a list of all pages in Builder
  const pages = await builder.getAll("page", {
    // We only need the URL field
    fields: "data.url",
    options: { noTargeting: true },
  });

  // Generate the static paths for all pages in Builder
  return {
    paths: pages
      .map((page) => String(page.data?.url))
      .filter((url) => url !== "/"),
    fallback: "blocking",
  };
}

// Define the Page component
export default function Page({ page }: { page: BuilderContent | null }) {
  const isPreviewing = useIsPreviewing();
  const pathname = usePathname()

  useEffect(() => {
    if (page?.data?.backgroundColor) {
      document.body.style.backgroundColor = page.data.backgroundColor;
    }
  }, [page, pathname])

  // If the page content is not available
  // and not in preview mode, show a 404 error page
  if (!page && !isPreviewing) {
    return <Custom404 />;
  }

  // If the page content is available, render
  // the BuilderComponent with the page content
  return (
    <>
      <Head>
        <title>{page?.data?.title}</title>
      </Head>

      <Navbar color={page?.data?.navigationStyle} />

      <BuilderComponent 
        model="page"
        content={page || undefined} 
      />
    </>
  );
}
