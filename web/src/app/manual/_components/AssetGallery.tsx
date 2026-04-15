import Image from "next/image";

export type GalleryAsset = {
  id: string;
  title: string;
  description?: string;
  src: string;
  aspect: string;
  platform?: string;
  dimensions?: string;
};

type Props = {
  assets: GalleryAsset[];
  columns?: 2 | 3 | 4;
};

export function AssetGallery({ assets, columns = 3 }: Props) {
  const gridClass =
    columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : columns === 4
        ? "grid-cols-2 md:grid-cols-4"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid ${gridClass} gap-6`}>
      {assets.map((asset) => (
        <div
          key={asset.id}
          className="rounded-md overflow-hidden border border-brand-gray-dark/60 bg-brand-black/50 hover:border-brand-yellow transition-all group"
        >
          <div
            className="relative w-full overflow-hidden bg-brand-black"
            style={{ aspectRatio: asset.aspect }}
          >
            <Image
              src={asset.src}
              alt={asset.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between gap-2 mb-1">
              <p className="font-display uppercase tracking-wider text-sm text-white">
                {asset.title}
              </p>
              {asset.platform && (
                <span className="text-[10px] uppercase tracking-widest text-brand-yellow font-sans">
                  {asset.platform}
                </span>
              )}
            </div>
            {asset.description && (
              <p className="font-sans text-xs text-brand-gray-light leading-relaxed">
                {asset.description}
              </p>
            )}
            {asset.dimensions && (
              <p className="font-sans text-[10px] font-mono text-brand-gray mt-2">
                {asset.dimensions}
              </p>
            )}
            <a
              href={asset.src}
              download
              className="inline-block mt-3 text-[10px] uppercase tracking-widest text-brand-yellow hover:text-white transition-colors font-sans"
            >
              Descargar ↓
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
