import { createMetadata } from "@/lib/seo/metadata";
import { getDefaultJsonLd } from "@/lib/seo/page-config";
import { PageShell } from "@/components/PageShell";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata = createMetadata({
  title: "Política de Cookies",
  description:
    "Qué cookies usa UGC Colombia, para qué se usan y cómo gestionarlas o desactivarlas.",
  path: "/legal/cookies",
});

const jsonLd = getDefaultJsonLd("generic", {
  name: "Política de Cookies — UGC Colombia",
  description:
    "Información sobre las cookies utilizadas en el sitio web de UGC Colombia.",
  url: "/legal/cookies",
});

export default function CookiesPage() {
  return (
    <PageShell
      breadcrumbs={[
        { label: "Inicio", href: "/" },
        { label: "Legal", href: "/legal/privacidad" },
        { label: "Cookies", href: "/legal/cookies" },
      ]}
      jsonLd={jsonLd}
    >
      <LegalLayout
        title="Política de Cookies"
        subtitle="Qué cookies usamos, para qué, y cómo puedes gestionarlas."
        updatedAt="11 de abril de 2026"
      >
        <h2>1. ¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que los sitios web
          almacenan en tu dispositivo (ordenador, tablet o móvil) cuando los
          visitas. Permiten recordar información sobre tu visita, facilitar
          la navegación y mejorar tu experiencia.
        </p>
        <p>
          En UGC Colombia también usamos tecnologías similares como{" "}
          <strong>pixels de seguimiento</strong>, <strong>local storage</strong>{" "}
          y <strong>scripts de analítica</strong>. A lo largo de este
          documento, el término &ldquo;cookies&rdquo; incluye a todas ellas.
        </p>

        <h2>2. Tipos de Cookies que Usamos</h2>

        <h3>2.1 Cookies Necesarias (siempre activas)</h3>
        <p>
          Son esenciales para el funcionamiento del sitio y no pueden
          desactivarse. Habilitan funciones básicas como navegación,
          autenticación y acceso a áreas seguras.
        </p>
        <ul>
          <li>
            <strong>Supabase Auth</strong> — gestión de sesiones de usuarios
            registrados.
          </li>
          <li>
            <strong>Preferencias de cookies</strong> (localStorage{" "}
            <code>ugc_cookie_consent</code>) — recuerda tu decisión sobre el
            banner de cookies.
          </li>
          <li>
            <strong>UTM params</strong> (localStorage <code>ugc_utm_params</code>) —
            guarda la fuente de tráfico durante 30 días para atribución.
          </li>
        </ul>

        <h3>2.2 Cookies de Analítica</h3>
        <p>
          Nos ayudan a entender cómo los visitantes usan el sitio para
          mejorarlo. Los datos son agregados y anónimos.
        </p>
        <table>
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Propósito</th>
              <th>Duración</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Google Tag Manager</td>
              <td>Orquestador de tags de analítica y marketing</td>
              <td>Sesión</td>
            </tr>
            <tr>
              <td>Google Analytics 4</td>
              <td>Medición de audiencia y comportamiento</td>
              <td>Hasta 14 meses</td>
            </tr>
            <tr>
              <td>Hotjar</td>
              <td>Heatmaps y grabaciones de sesión anónimas</td>
              <td>365 días</td>
            </tr>
          </tbody>
        </table>

        <h3>2.3 Cookies de Marketing</h3>
        <p>
          Permiten mostrar publicidad relevante en otras plataformas y medir
          el rendimiento de las campañas.
        </p>
        <table>
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Propósito</th>
              <th>Duración</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Meta Pixel (Facebook/Instagram)</td>
              <td>Conversiones y remarketing en Meta Ads</td>
              <td>90 días</td>
            </tr>
            <tr>
              <td>TikTok Pixel</td>
              <td>Conversiones y remarketing en TikTok Ads</td>
              <td>90 días</td>
            </tr>
            <tr>
              <td>LinkedIn Insight Tag</td>
              <td>Conversiones y segmentación en LinkedIn</td>
              <td>180 días</td>
            </tr>
            <tr>
              <td>Microsoft UET (Bing)</td>
              <td>Conversiones en Microsoft Advertising</td>
              <td>390 días</td>
            </tr>
          </tbody>
        </table>

        <h2>3. Cookies de Terceros</h2>
        <p>
          Algunas cookies son colocadas por servicios de terceros que
          aparecen en nuestro sitio (por ejemplo, el reproductor de videos
          Bunny Stream). Cada tercero gestiona sus cookies bajo su propia
          política de privacidad:
        </p>
        <ul>
          <li>
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google — Política de Privacidad
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/privacy/policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Meta — Política de Privacidad
            </a>
          </li>
          <li>
            <a
              href="https://www.tiktok.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              TikTok — Política de Privacidad
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn — Política de Privacidad
            </a>
          </li>
          <li>
            <a
              href="https://www.hotjar.com/legal/policies/privacy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hotjar — Política de Privacidad
            </a>
          </li>
        </ul>

        <h2>4. Cómo Gestionar tus Cookies</h2>

        <h3>4.1 Desde nuestro banner</h3>
        <p>
          En tu primera visita, verás un banner que te permite aceptar todas
          las cookies o personalizar tus preferencias. Puedes elegir qué
          categorías aceptar (Analítica y/o Marketing). Las cookies
          necesarias siempre permanecen activas.
        </p>

        <h3>4.2 Desde tu navegador</h3>
        <p>
          Todos los navegadores modernos permiten rechazar, eliminar o
          limitar cookies. Aquí tienes las guías oficiales:
        </p>
        <ul>
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/es/kb/Borrar%20cookies"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
            >
              Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Edge
            </a>
          </li>
        </ul>

        <h3>4.3 Consecuencias de desactivar cookies</h3>
        <p>
          Si desactivas todas las cookies, algunas funciones del Sitio
          pueden dejar de funcionar correctamente (por ejemplo, mantener tu
          sesión iniciada). Las cookies de analítica y marketing pueden
          desactivarse sin afectar el uso general del Sitio.
        </p>

        <h2>5. Modelo de Consentimiento</h2>
        <p>
          En cumplimiento de la{" "}
          <strong>Ley 1581 de 2012</strong> de Colombia y el{" "}
          <strong>Decreto 1377 de 2013</strong>, UGC Colombia utiliza un
          modelo de consentimiento informado. Al continuar navegando después
          de ver el banner, consientes el uso de cookies. Siempre puedes
          cambiar tu decisión desde las preferencias del navegador.
        </p>
        <p>
          Si accedes al sitio desde la Unión Europea o el Reino Unido, donde
          aplica el GDPR, solicitamos consentimiento explícito antes de
          activar cookies no esenciales.
        </p>

        <h2>6. Cambios a esta Política</h2>
        <p>
          Podemos actualizar esta Política de Cookies periódicamente. La
          fecha de última actualización aparece al inicio del documento. Te
          recomendamos revisarla de forma regular.
        </p>

        <h2>7. Contacto</h2>
        <p>
          Para preguntas sobre esta política de cookies o para ejercer tus
          derechos:
        </p>
        <ul>
          <li>
            <strong>Email</strong>:{" "}
            <a href="mailto:founder@kreoon.com">founder@kreoon.com</a>
          </li>
          <li>
            <strong>Política general de privacidad</strong>:{" "}
            <a href="/legal/privacidad">
              https://ugccolombia.co/legal/privacidad
            </a>
          </li>
        </ul>
      </LegalLayout>
    </PageShell>
  );
}
