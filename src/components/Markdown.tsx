"use client";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

export default function Markdown({ source }: { source: string }) {
  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeHighlight]}>{source}</ReactMarkdown>
  );
}
