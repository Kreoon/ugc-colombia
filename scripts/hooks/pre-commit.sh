#!/usr/bin/env bash
# pre-commit hook — UGC Colombia
# Bloquea commits que toquen rutas protegidas salvo que ALLOW_PROTECTED=1.
# Ver .claude/settings.json y CONTRIBUTING.md para el contrato de permisos.

set -e

PROTECTED_REGEX='^(web/app/|web/components/|web/lib/|web/pages/|web/src/|web/styles/|web/middleware\.|supabase/|scripts/|n8n/|\.github/|\.claude/settings\.json|\.claude/skills/|package\.json|package-lock\.json|pnpm-lock\.yaml|yarn\.lock|tsconfig|next\.config|tailwind\.config|postcss\.config|vercel\.json|\.env)'

CHANGED=$(git diff --cached --name-only)

if [ -z "$CHANGED" ]; then
  exit 0
fi

MATCHES=$(echo "$CHANGED" | grep -E "$PROTECTED_REGEX" || true)

if [ -n "$MATCHES" ]; then
  if [ "$ALLOW_PROTECTED" != "1" ]; then
    echo ""
    echo "=========================================================="
    echo "  BLOQUEADO — intentas commitear archivos protegidos"
    echo "=========================================================="
    echo ""
    echo "Archivos afectados:"
    echo "$MATCHES" | sed 's/^/  - /'
    echo ""
    echo "Estas rutas requieren aprobacion explicita de Alexander."
    echo ""
    echo "Si el cambio esta autorizado, quien aprueba debe correr:"
    echo "  ALLOW_PROTECTED=1 git commit ..."
    echo ""
    echo "Si no estas seguro, abre un issue en GitHub describiendo"
    echo "el cambio antes de intentar commitear."
    echo "=========================================================="
    exit 1
  else
    echo "[pre-commit] ALLOW_PROTECTED=1 detectado. Permitiendo cambio en rutas protegidas."
  fi
fi

exit 0
