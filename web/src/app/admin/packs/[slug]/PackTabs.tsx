"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Pencil, Clock } from 'lucide-react';
import { MarkdownRenderer } from '@/components/admin/MarkdownRenderer';

interface Tab {
  label: string;
  filePath: string;
  content: string;
  isOverridden: boolean;
  overrideUpdatedAt?: string;
}

interface PackTabsProps {
  tabs: Tab[];
}

export function PackTabs({ tabs }: PackTabsProps) {
  const [active, setActive] = useState(0);
  const activeTab = tabs[active];

  return (
    <div>
      {/* Tab triggers */}
      <div
        className="flex flex-wrap gap-2 mb-8 border-b border-brand-gold/15 pb-4"
        role="tablist"
        aria-label="Secciones del pack"
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.filePath}
            role="tab"
            aria-selected={active === i}
            aria-controls={`tabpanel-${i}`}
            id={`tab-${i}`}
            onClick={() => setActive(i)}
            className={[
              'px-4 py-2 rounded-lg text-sm font-semibold transition-all',
              active === i
                ? 'bg-brand-yellow text-black'
                : 'bg-white/[0.04] text-brand-gray hover:bg-white/[0.08] hover:text-white border border-brand-gold/15',
            ].join(' ')}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active tab content */}
      <div
        role="tabpanel"
        id={`tabpanel-${active}`}
        aria-labelledby={`tab-${active}`}
      >
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            {activeTab.isOverridden && activeTab.overrideUpdatedAt && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs">
                <Clock className="w-3 h-3" aria-hidden="true" />
                Editado{' '}
                {new Date(activeTab.overrideUpdatedAt).toLocaleDateString('es-CO')}
              </div>
            )}
            <code className="text-xs text-brand-gray">{activeTab.filePath}</code>
          </div>
          <Link
            href={`/admin/editor/${activeTab.filePath}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-yellow/15 border border-brand-yellow/30 text-brand-yellow text-sm font-semibold hover:bg-brand-yellow/25 transition-colors"
            aria-label={`Editar ${activeTab.label}`}
          >
            <Pencil className="w-4 h-4" aria-hidden="true" />
            Editar
          </Link>
        </div>

        <article>
          <MarkdownRenderer content={activeTab.content} />
        </article>
      </div>
    </div>
  );
}
