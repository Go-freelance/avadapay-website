import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="mt-12 text-3xl font-extrabold leading-tight text-gray-950">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-2xl font-extrabold leading-tight text-gray-950">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mt-5 text-lg leading-8 text-gray-700">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="mt-5 list-disc space-y-3 pl-6 text-lg leading-8 text-gray-700">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-3 pl-6 text-lg leading-8 text-gray-700">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="pl-1">{children}</li>,
    a: ({ children, href }) => {
      if (!href) {
        return <span>{children}</span>;
      }

      const isExternal = href.startsWith("http");

      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="font-bold text-avada-700 underline decoration-avada-500/40 underline-offset-4 hover:text-avada-800"
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          href={href}
          className="font-bold text-avada-700 underline decoration-avada-500/40 underline-offset-4 hover:text-avada-800"
        >
          {children}
        </Link>
      );
    },
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-4 border-avada-500 bg-avada-50 px-6 py-4 text-lg font-semibold leading-8 text-gray-800">
        {children}
      </blockquote>
    ),
    Image,
    ...components,
  };
}
