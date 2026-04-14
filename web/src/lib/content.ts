import { readFile, readdir, stat } from 'fs/promises';
import { join, relative } from 'path';
import matter from 'gray-matter';
import { getSupabaseAdmin } from './supabase';

// En Next.js App Router, process.cwd() apunta a la carpeta web/
const WEB_ROOT = process.cwd();

export interface ContentMeta {
  path: string;        // "content/viralidad/00-modelo.md"
  title: string;       // del frontmatter o primer H1
  description?: string;
  category?: string;   // "viralidad" | "marca" | etc.
  slug: string;        // "00-modelo"
  updatedAt?: string;
}

export interface ContentFile {
  meta: ContentMeta;
  raw: string;               // markdown original del archivo en el repo
  current: string;           // markdown activo (override si existe, sino raw)
  isOverridden: boolean;
  overrideUpdatedAt?: string;
  overrideEditedBy?: string;
}

/**
 * Lista todos los archivos .md en una carpeta, opcionalmente recursivo.
 * @param dir - ruta relativa a web/, ej: "content/viralidad"
 */
export async function listContentFiles(
  dir: string,
  options?: { recursive?: boolean }
): Promise<ContentMeta[]> {
  const fullPath = join(WEB_ROOT, dir);
  const entries = await readdir(fullPath, { withFileTypes: true });
  const files: ContentMeta[] = [];

  for (const entry of entries) {
    const entryPath = join(fullPath, entry.name);
    const relativePath = relative(WEB_ROOT, entryPath).replace(/\\/g, '/');

    if (entry.isDirectory() && options?.recursive) {
      const nested = await listContentFiles(relativePath, options);
      files.push(...nested);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const raw = await readFile(entryPath, 'utf-8');
      const { data, content } = matter(raw);
      const firstH1 = content.match(/^#\s+(.+)$/m)?.[1] ?? entry.name.replace('.md', '');
      const fileStat = await stat(entryPath);

      files.push({
        path: relativePath,
        title: data.title ?? firstH1,
        description: data.description,
        category: relativePath.split('/')[0],
        slug: entry.name.replace('.md', ''),
        updatedAt: fileStat.mtime.toISOString(),
      });
    }
  }

  return files.sort((a, b) => a.path.localeCompare(b.path));
}

/**
 * Lee un archivo .md del filesystem y extrae frontmatter.
 * @param filePath - ruta relativa a web/, ej: "content/viralidad/00-modelo.md"
 */
export async function readContentFile(
  filePath: string
): Promise<{ raw: string; meta: ContentMeta } | null> {
  try {
    const fullPath = join(WEB_ROOT, filePath);
    const fileRaw = await readFile(fullPath, 'utf-8');
    const { data, content } = matter(fileRaw);
    const firstH1 = content.match(/^#\s+(.+)$/m)?.[1] ?? filePath;
    const fileStat = await stat(fullPath);

    return {
      raw: content,
      meta: {
        path: filePath,
        title: data.title ?? firstH1,
        description: data.description,
        category: filePath.split('/')[0],
        slug: filePath.split('/').pop()?.replace('.md', '') ?? '',
        updatedAt: fileStat.mtime.toISOString(),
      },
    };
  } catch {
    return null;
  }
}

/**
 * Lee un .md del filesystem y aplica el override de Supabase si existe.
 * Si no hay Supabase configurado, retorna solo el contenido del archivo.
 * @param filePath - ruta relativa a web/, ej: "content/viralidad/00-modelo.md"
 */
export async function getContentWithOverrides(filePath: string): Promise<ContentFile | null> {
  const fileData = await readContentFile(filePath);
  if (!fileData) return null;

  const supabase = getSupabaseAdmin();
  let override: { content: string; updated_at: string; edited_by: string } | null = null;

  if (supabase) {
    const { data } = await supabase
      .from('content_overrides')
      .select('content, updated_at, edited_by')
      .eq('file_path', filePath)
      .maybeSingle();
    override = data;
  }

  return {
    meta: fileData.meta,
    raw: fileData.raw,
    current: override?.content ?? fileData.raw,
    isOverridden: !!override,
    overrideUpdatedAt: override?.updated_at,
    overrideEditedBy: override?.edited_by,
  };
}
