import { createMetadata } from "@/lib/seo/metadata";
import { getDefaultJsonLd } from "@/lib/seo/page-config";
import { PageShell } from "@/components/PageShell";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata = createMetadata({
  title: "Política de Privacidad",
  description:
    "Política de tratamiento de datos personales de UGC Colombia en cumplimiento de la Ley 1581 de 2012 de Colombia y el Decreto 1377 de 2013.",
  path: "/legal/privacidad",
});

const jsonLd = getDefaultJsonLd("generic", {
  name: "Política de Privacidad — UGC Colombia",
  description:
    "Cómo UGC Colombia recopila, usa y protege los datos personales de sus usuarios.",
  url: "/legal/privacidad",
});

export default function PrivacidadPage() {
  return (
    <PageShell
      breadcrumbs={[
        { label: "Inicio", href: "/" },
        { label: "Legal", href: "/legal/privacidad" },
        { label: "Privacidad", href: "/legal/privacidad" },
      ]}
      jsonLd={jsonLd}
    >
      <LegalLayout
        title="Política de Privacidad"
        subtitle="Cómo tratamos tus datos personales en cumplimiento de la Ley 1581 de 2012 de Colombia."
        updatedAt="11 de abril de 2026"
      >
        <h2>1. Responsable del Tratamiento</h2>
        <p>
          <strong>UGC Colombia</strong> (en adelante, &ldquo;UGC Colombia&rdquo;,
          &ldquo;nosotros&rdquo; o &ldquo;la agencia&rdquo;), operada por
          Infiny Group, con domicilio en Bogotá, Colombia, es responsable del
          tratamiento de los datos personales recolectados a través del sitio
          web{" "}
          <a href="https://ugccolombia.co">https://ugccolombia.co</a>.
        </p>
        <p>
          Correo de contacto para temas de privacidad:{" "}
          <a href="mailto:founder@kreoon.com">founder@kreoon.com</a>
        </p>

        <h2>2. Marco Legal</h2>
        <p>Esta política se rige por:</p>
        <ul>
          <li>
            <strong>Ley 1581 de 2012</strong> — Régimen General de Protección
            de Datos Personales en Colombia.
          </li>
          <li>
            <strong>Decreto 1377 de 2013</strong> — Reglamentación parcial de
            la Ley 1581.
          </li>
          <li>
            <strong>Decreto 1074 de 2015</strong> — Decreto Único
            Reglamentario del Sector Comercio, Industria y Turismo.
          </li>
        </ul>

        <h2>3. Datos que Recolectamos</h2>

        <h3>3.1 Datos que tú nos proporcionas</h3>
        <ul>
          <li>
            <strong>Formularios de contacto y registro</strong>: nombre,
            correo electrónico, teléfono, nombre de la marca/empresa, país,
            mensaje.
          </li>
          <li>
            <strong>Registro de creadores</strong>: nombre, redes sociales,
            nicho, portafolio, tarifa.
          </li>
          <li>
            <strong>Pagos</strong>: los pagos se procesan a través de
            proveedores externos (Stripe, PayPal, transferencias bancarias);
            UGC Colombia no almacena datos de tarjetas de crédito.
          </li>
        </ul>

        <h3>3.2 Datos recolectados automáticamente</h3>
        <ul>
          <li>
            <strong>Datos de navegación</strong>: dirección IP, tipo de
            navegador, dispositivo, sistema operativo, páginas visitadas,
            tiempo en sitio, referer.
          </li>
          <li>
            <strong>Cookies y tecnologías similares</strong>: ver nuestra{" "}
            <a href="/legal/cookies">Política de Cookies</a>.
          </li>
          <li>
            <strong>Parámetros UTM</strong>: fuente de tráfico, campaña,
            medium, contenido.
          </li>
        </ul>

        <h2>4. Finalidad del Tratamiento</h2>
        <p>Utilizamos tus datos personales para:</p>
        <ul>
          <li>
            Responder a consultas comerciales y enviar cotizaciones o
            propuestas.
          </li>
          <li>Prestar los servicios contratados y gestionar la relación comercial.</li>
          <li>
            Enviar comunicaciones de marketing relevantes (newsletter, casos
            de éxito, novedades) — siempre con opción de darse de baja.
          </li>
          <li>
            Analizar el comportamiento en el sitio web para mejorar la
            experiencia y optimizar nuestras campañas publicitarias.
          </li>
          <li>
            Cumplir con obligaciones legales, fiscales y contractuales.
          </li>
          <li>
            Prevenir fraude, abuso y actividades ilegales en la plataforma.
          </li>
        </ul>

        <h2>5. Base Legal del Tratamiento</h2>
        <ul>
          <li>
            <strong>Consentimiento</strong>: al usar el sitio, completar
            formularios o aceptar las cookies, otorgas tu consentimiento
            informado.
          </li>
          <li>
            <strong>Ejecución de contrato</strong>: cuando contratas un
            servicio con nosotros.
          </li>
          <li>
            <strong>Interés legítimo</strong>: para mejorar el servicio,
            prevenir fraudes y fines estadísticos.
          </li>
          <li>
            <strong>Obligación legal</strong>: cuando la ley nos exige
            conservar o reportar datos.
          </li>
        </ul>

        <h2>6. Compartición de Datos con Terceros</h2>
        <p>
          Compartimos datos personales únicamente con proveedores que nos
          ayudan a operar el negocio, bajo estrictos acuerdos de
          confidencialidad:
        </p>
        <ul>
          <li>
            <strong>Supabase</strong> — infraestructura de base de datos y
            autenticación.
          </li>
          <li>
            <strong>Resend</strong> — envío de emails transaccionales.
          </li>
          <li>
            <strong>Google</strong> (Analytics, Tag Manager, Ads) —
            analítica y publicidad.
          </li>
          <li>
            <strong>Meta</strong> (Facebook, Instagram) — publicidad y
            remarketing.
          </li>
          <li>
            <strong>TikTok, LinkedIn, Microsoft (Bing)</strong> —
            publicidad y tracking de conversiones.
          </li>
          <li>
            <strong>Hotjar / Clarity</strong> — análisis de experiencia de
            usuario.
          </li>
          <li>
            <strong>Stripe, PayPal</strong> — procesamiento de pagos.
          </li>
          <li>
            <strong>n8n, KREOON</strong> — automatizaciones internas de
            seguimiento de leads.
          </li>
        </ul>
        <p>
          Algunos de estos proveedores están localizados fuera de Colombia
          (principalmente Estados Unidos y la Unión Europea). Nos aseguramos
          de que cuenten con estándares adecuados de protección de datos
          equivalentes a los exigidos por la legislación colombiana.
        </p>

        <h2>7. Transferencia Internacional de Datos</h2>
        <p>
          Algunos de los servicios que usamos almacenan datos fuera de
          Colombia. Al aceptar esta política autorizas la transferencia
          internacional de tus datos a los países donde operan nuestros
          proveedores, que cuentan con niveles adecuados de protección según
          la Superintendencia de Industria y Comercio (SIC).
        </p>

        <h2>8. Conservación de los Datos</h2>
        <p>
          Conservamos tus datos personales durante el tiempo necesario para
          cumplir con las finalidades descritas:
        </p>
        <ul>
          <li>
            <strong>Datos de clientes activos</strong>: durante toda la
            relación comercial + 10 años (obligación contable colombiana).
          </li>
          <li>
            <strong>Datos de leads sin contratación</strong>: máximo 24 meses
            desde la última interacción.
          </li>
          <li>
            <strong>Datos de navegación (cookies)</strong>: según lo descrito
            en la Política de Cookies.
          </li>
        </ul>

        <h2>9. Derechos del Titular</h2>
        <p>
          De acuerdo con la Ley 1581 de 2012, tienes los siguientes derechos
          sobre tus datos personales:
        </p>
        <ul>
          <li>
            <strong>Conocer</strong>, actualizar y rectificar tus datos
            personales.
          </li>
          <li>
            <strong>Solicitar prueba</strong> de la autorización otorgada.
          </li>
          <li>
            <strong>Ser informado</strong> sobre el uso que se ha dado a tus
            datos.
          </li>
          <li>
            Presentar quejas ante la <strong>Superintendencia de Industria
            y Comercio (SIC)</strong>.
          </li>
          <li>
            <strong>Revocar la autorización</strong> y/o solicitar la
            supresión de tus datos cuando no se respeten los principios,
            derechos y garantías constitucionales y legales.
          </li>
          <li>
            <strong>Acceder</strong> de forma gratuita a tus datos personales
            que hayan sido objeto de tratamiento.
          </li>
        </ul>

        <h2>10. Cómo Ejercer tus Derechos</h2>
        <p>
          Para ejercer cualquiera de los derechos mencionados, envía una
          solicitud al correo{" "}
          <a href="mailto:founder@kreoon.com">founder@kreoon.com</a>{" "}
          indicando:
        </p>
        <ul>
          <li>Tu nombre completo y documento de identidad.</li>
          <li>El derecho que deseas ejercer y la descripción del hecho.</li>
          <li>Correo electrónico y/o dirección física para respuesta.</li>
        </ul>
        <p>
          Tenemos 15 días hábiles para atender consultas y 15 días hábiles
          para atender reclamos, de acuerdo con lo establecido en la Ley 1581
          de 2012.
        </p>

        <h2>11. Seguridad de la Información</h2>
        <p>
          Implementamos medidas técnicas, humanas y administrativas para
          proteger tus datos contra adulteración, pérdida, consulta, uso o
          acceso no autorizado:
        </p>
        <ul>
          <li>Conexiones HTTPS/TLS en todo el sitio web.</li>
          <li>
            Almacenamiento en bases de datos con políticas de acceso
            restringido (RLS en Supabase).
          </li>
          <li>Credenciales protegidas con vault (1Password).</li>
          <li>Copias de seguridad automáticas.</li>
          <li>
            Firma de acuerdos de confidencialidad (NDA) con empleados y
            proveedores.
          </li>
        </ul>

        <h2>12. Menores de Edad</h2>
        <p>
          Nuestros servicios no están dirigidos a menores de 18 años. No
          recopilamos intencionalmente datos de menores. Si eres padre/madre
          o tutor y crees que tu hijo/a nos proporcionó datos personales,
          contáctanos para eliminarlos.
        </p>

        <h2>13. Cambios a esta Política</h2>
        <p>
          Podemos actualizar esta política periódicamente. La fecha de
          &ldquo;Última actualización&rdquo; al inicio indica cuándo fue la
          última revisión. Los cambios sustanciales se notificarán por correo
          electrónico a los usuarios registrados.
        </p>

        <h2>14. Contacto</h2>
        <p>
          Para cualquier consulta relacionada con esta política, contáctanos
          en:
        </p>
        <ul>
          <li>
            <strong>Email</strong>:{" "}
            <a href="mailto:founder@kreoon.com">founder@kreoon.com</a>
          </li>
          <li>
            <strong>Sitio web</strong>:{" "}
            <a href="https://ugccolombia.co">https://ugccolombia.co</a>
          </li>
          <li>
            <strong>Ubicación</strong>: Bogotá, Colombia
          </li>
        </ul>
      </LegalLayout>
    </PageShell>
  );
}
