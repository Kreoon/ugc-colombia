/**
 * Skeleton mostrado mientras el Server Component VideoSamples espera
 * la respuesta de KREOON. Preserva el layout exacto (mismo header,
 * mismo grid 6×2) para que NO haya layout shift al llegar los datos.
 */
export function VideoSamplesSkeleton() {
  return (
    <section
      id="muestras"
      aria-labelledby="muestras-title"
      aria-busy="true"
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #000000 0%, #060504 50%, #000000 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(212,160,23,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2
            id="muestras-title"
            className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight"
          >
            Videos UGC reales,
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #f9b334, #d4a017)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              hechos por creadores reales.
            </span>
          </h2>
          <p className="mt-4 text-brand-gray text-base sm:text-lg">
            Activa el sonido en el video que quieras escuchar.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          {[0, 1].map((rowIdx) => (
            <div
              key={rowIdx}
              className="no-scrollbar flex gap-3 sm:gap-4 overflow-x-auto pb-2 lg:overflow-visible lg:grid lg:grid-cols-6 lg:gap-4 lg:pb-0"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[42vw] sm:w-[28vw] md:w-[20vw] lg:w-auto lg:flex-shrink"
                >
                  <div
                    className="relative overflow-hidden rounded-xl bg-gradient-to-br from-neutral-900 to-black shadow-[0_4px_16px_rgba(0,0,0,0.35)] animate-pulse"
                    style={{ aspectRatio: "9/16" }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
