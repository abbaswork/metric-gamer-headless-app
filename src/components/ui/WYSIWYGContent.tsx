import React from "react";
import styles from "./WYSIWYGContent.module.scss";

interface WYSIWYGContentProps {
  html: string;
  className?: string;
}

/**
 * Renders WordPress WYSIWYG editor content using a scoped SCSS module.
 * The styles provide sensible defaults for headings, lists, links, code,
 * images, tables, and other common elements from the WP editor.
 */
export function WYSIWYGContent({ html, className = "" }: WYSIWYGContentProps) {
  return (
    <div
      className={`${styles.wysiwyg} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
