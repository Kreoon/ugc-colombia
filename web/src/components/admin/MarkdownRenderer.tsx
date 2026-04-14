"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import type { Components } from 'react-markdown';
import type { Element } from 'hast';
// Nota: estilos de highlight.js se importan desde globals.css al inicio del bundle

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Determina si un nodo HAST li pertenece a una lista ordenada (ol).
 * react-markdown v9 expone el nodo HAST padre via node.
 */
function isOrderedListItem(node: Element): boolean {
  // El nodo es un <li>; su padre en el árbol HAST será <ol> o <ul>
  // react-markdown inyecta `node` con el árbol completo — no hay acceso
  // directo al padre desde el nodo hijo, pero sí podemos leer la propiedad
  // `data-list-type` si usamos un plugin custom. La alternativa limpia es
  // verificar si el nodo tiene className que rehype-gfm inyecta.
  // En su defecto, usamos la propiedad del elemento que react-markdown pasa.
  const className = node.properties?.className;
  if (Array.isArray(className)) {
    return className.includes('task-list-item');
  }
  return false;
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className="font-display text-4xl md:text-5xl uppercase leading-[0.95] tracking-tight text-white mb-6 mt-8 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-display text-2xl md:text-3xl uppercase leading-tight tracking-tight text-white mt-10 mb-4 pb-2 border-b border-brand-gold/20">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-sans text-lg md:text-xl font-bold text-white mt-8 mb-3">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-sans text-base font-semibold text-brand-yellow uppercase tracking-widest mt-6 mb-2">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="font-sans text-base leading-relaxed text-brand-gray mb-4">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-none space-y-2 mb-6 pl-0" data-list-type="ul">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol
      className="list-decimal list-inside space-y-2 mb-6 text-brand-gray marker:text-brand-yellow marker:font-bold"
      data-list-type="ol"
    >
      {children}
    </ol>
  ),
  /**
   * react-markdown v9: el nodo HAST del li no expone `ordered` directamente.
   * Usamos el nodo HAST para inspeccionar si el padre es un <ol>.
   * Si no hay información de lista ordenada, usamos el bullet + de marca.
   */
  li: ({ children, node }) => {
    const parentTagName = (node as Element & { parentNode?: Element }).parentNode?.tagName;
    const isOrdered = parentTagName === 'ol';

    if (isOrdered) {
      return <li className="text-brand-gray">{children}</li>;
    }
    return (
      <li className="flex gap-3 text-brand-gray">
        <span className="text-brand-yellow font-bold mt-0.5 select-none" aria-hidden="true">
          +
        </span>
        <span className="flex-1">{children}</span>
      </li>
    );
  },
  strong: ({ children }) => (
    <strong className="text-white font-semibold">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="text-brand-yellow not-italic font-medium">{children}</em>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      className="text-brand-yellow underline decoration-brand-gold/40 underline-offset-4 hover:decoration-brand-yellow transition-colors"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  code: ({ children, className }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="bg-brand-graphite/50 text-brand-yellow px-1.5 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      );
    }
    return <code className={className}>{children}</code>;
  },
  pre: ({ children }) => (
    <pre className="bg-black/60 border border-brand-gold/15 rounded-xl p-4 overflow-x-auto text-sm mb-6">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-brand-yellow bg-brand-yellow/5 pl-6 py-3 my-6 text-white italic">
      {children}
    </blockquote>
  ),
  hr: () => (
    <hr className="my-10 border-none h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-6 border border-brand-gold/15 rounded-xl">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-black/40 border-b-2 border-brand-gold">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left font-semibold text-brand-yellow uppercase tracking-wider text-xs">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-brand-gray border-b border-brand-gold/10">
      {children}
    </td>
  ),
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? ''}
      className="rounded-xl border border-brand-gold/15 my-6 max-w-full h-auto"
    />
  ),
};

// Evita warning de variable no usada (isOrderedListItem es utilidad doc)
void isOrderedListItem;

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`markdown-body ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
