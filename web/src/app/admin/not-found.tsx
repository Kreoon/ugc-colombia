import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="font-display text-7xl uppercase text-white mb-3">404</h1>
      <p className="text-brand-gray text-sm mb-8">Esta sección no existe.</p>
      <Link
        href="/admin"
        className="px-6 py-3 rounded-xl bg-brand-yellow text-black font-bold text-sm hover:bg-brand-gold transition-colors"
      >
        Volver al dashboard
      </Link>
    </div>
  );
}
