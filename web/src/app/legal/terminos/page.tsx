import { createMetadata } from "@/lib/seo/metadata";
import { getDefaultJsonLd } from "@/lib/seo/page-config";
import { PageShell } from "@/components/PageShell";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata = createMetadata({
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de uso del sitio web y de los servicios de UGC Colombia.",
  path: "/legal/terminos",
});

const jsonLd = getDefaultJsonLd("generic", {
  name: "Términos y Condiciones — UGC Colombia",
  description:
    "Condiciones de uso del sitio web y servicios contratados con UGC Colombia.",
  url: "/legal/terminos",
});

export default function TerminosPage() {
  return (
    <PageShell
      breadcrumbs={[
        { label: "Inicio", href: "/" },
        { label: "Legal", href: "/legal/privacidad" },
        { label: "Términos", href: "/legal/terminos" },
      ]}
      jsonLd={jsonLd}
    >
      <LegalLayout
        title="Términos y Condiciones"
        subtitle="Condiciones que rigen el uso del sitio web y los servicios contratados con UGC Colombia."
        updatedAt="11 de abril de 2026"
      >
        <h2>1. Aceptación de los Términos</h2>
        <p>
          Al acceder y utilizar el sitio web{" "}
          <a href="https://ugccolombia.co">https://ugccolombia.co</a> (en
          adelante, &ldquo;el Sitio&rdquo;) y/o contratar los servicios
          ofrecidos por UGC Colombia (operada por Infiny Group), aceptas
          estar legalmente vinculado por estos Términos y Condiciones. Si no
          estás de acuerdo con alguno de estos términos, no uses el Sitio ni
          contrates nuestros servicios.
        </p>

        <h2>2. Descripción del Servicio</h2>
        <p>
          UGC Colombia es una agencia boutique de contenido generado por
          usuarios (UGC), estrategia de marketing, producción audiovisual,
          consultoría digital, automatización con IA, diseño web y landing
          pages, operando principalmente desde Colombia y sirviendo clientes
          en LATAM.
        </p>

        <h2>3. Registro y Cuenta</h2>
        <p>
          Algunos servicios requieren crear una cuenta en nuestra plataforma
          asociada (KREOON). Al registrarte:
        </p>
        <ul>
          <li>
            Te comprometes a proporcionar información verídica, actualizada
            y completa.
          </li>
          <li>
            Eres responsable de mantener la confidencialidad de tus
            credenciales de acceso.
          </li>
          <li>
            Eres responsable de todas las actividades que ocurran bajo tu
            cuenta.
          </li>
          <li>
            Nos notificarás inmediatamente ante cualquier acceso no
            autorizado.
          </li>
        </ul>

        <h2>4. Servicios y Contratación</h2>

        <h3>4.1 Modalidades de servicio</h3>
        <ul>
          <li>
            <strong>Servicios mensuales</strong> (UGC Ads Pack, Estrategia,
            Consultoría, Automatización IA, Retainer Dev): pago anticipado al
            inicio de cada periodo, con permanencia mínima según el plan
            elegido.
          </li>
          <li>
            <strong>Proyectos únicos</strong> (Producción Premium, Diseño
            Web, Landings, Flujos de automatización): 100% del pago al
            arranque del proyecto antes de iniciar producción.
          </li>
          <li>
            <strong>Talent Management</strong>: comisión sobre producción +
            tarifa de gestión.
          </li>
        </ul>

        <h3>4.2 Facturación y pagos</h3>
        <ul>
          <li>
            Todos los precios se publican en USD; facturamos en USD o COP
            según el país del cliente.
          </li>
          <li>
            Los pagos se procesan vía Stripe, PayPal o transferencia bancaria.
          </li>
          <li>
            Los clientes colombianos reciben factura electrónica DIAN.
          </li>
          <li>
            El no pago en la fecha establecida puede resultar en la
            suspensión de la entrega de trabajos hasta regularizar.
          </li>
        </ul>

        <h3>4.3 Permanencia y cancelación</h3>
        <ul>
          <li>
            Los planes mensuales recurrentes tienen permanencia mínima de 3
            meses; después operan mes a mes.
          </li>
          <li>
            La cancelación requiere 30 días de aviso antes del siguiente
            ciclo.
          </li>
          <li>
            Ofrecemos 7 días de garantía desde el primer pago: reembolso del
            100% si el cliente considera que no encajamos con su marca.
          </li>
        </ul>

        <h2>5. Propiedad Intelectual</h2>

        <h3>5.1 Contenido producido</h3>
        <p>
          Todo el contenido audiovisual producido por UGC Colombia para el
          cliente (videos UGC, reels, VSLs, piezas gráficas) se entrega con
          licencia de uso comercial para publicidad pagada (Meta, TikTok,
          Google, YouTube) por <strong>12 meses</strong> desde la fecha de
          entrega. Derechos perpetuos, exclusividad por nicho o uso en
          orgánico con el handle de la marca se cotizan como complemento.
        </p>

        <h3>5.2 Código de desarrollo</h3>
        <p>
          Todo el código, workflows, automatizaciones, diseños web y landing
          pages producidos a medida para el cliente son de propiedad
          exclusiva del cliente una vez finalizado el pago total del
          proyecto. Entregamos repositorios Git, credenciales y
          documentación en un handoff formal.
        </p>

        <h3>5.3 Marca y contenido del Sitio</h3>
        <p>
          Todo el contenido del Sitio (textos, diseño, logos, marcas, código)
          es propiedad de UGC Colombia y/o Infiny Group. Está prohibida su
          reproducción, distribución o uso sin autorización expresa por
          escrito.
        </p>

        <h2>6. Obligaciones del Cliente</h2>
        <ul>
          <li>
            Proporcionar brief, materiales de marca, información de producto
            y feedback de manera oportuna.
          </li>
          <li>
            Validar y aprobar las afirmaciones publicitarias que hacemos en
            su nombre.
          </li>
          <li>
            Cumplir con las leyes de publicidad aplicables en su país
            (especialmente en nichos regulados: salud, finanzas, suplementos).
          </li>
          <li>Pagar las facturas en los plazos acordados.</li>
          <li>Respetar los derechos de los creadores y del equipo.</li>
        </ul>

        <h2>7. Prohibiciones de Uso</h2>
        <p>
          Está prohibido usar el Sitio o los servicios para:
        </p>
        <ul>
          <li>Actividades ilegales o fraudulentas.</li>
          <li>Promoción de productos o servicios que infrinjan la ley.</li>
          <li>
            Contenido que incite al odio, la violencia, la discriminación o
            la difamación.
          </li>
          <li>Suplantación de identidad o uso de datos falsos.</li>
          <li>
            Intentos de hackeo, scraping masivo, reverse engineering o
            interferencia con la infraestructura.
          </li>
          <li>Spam o envío masivo no autorizado de comunicaciones.</li>
        </ul>

        <h2>8. Limitación de Responsabilidad</h2>
        <p>
          UGC Colombia no será responsable por:
        </p>
        <ul>
          <li>
            El rendimiento de las campañas publicitarias del cliente en
            plataformas externas (Meta, TikTok, Google): el resultado depende
            de múltiples factores fuera de nuestro control (presupuesto,
            producto, oferta, audiencia, decisiones del cliente).
          </li>
          <li>
            Interrupciones temporales del Sitio por mantenimiento o causas
            de fuerza mayor.
          </li>
          <li>
            Contenido generado por terceros o creadores fuera de nuestras
            instrucciones.
          </li>
          <li>
            Daños indirectos, lucro cesante o pérdidas consecuentes
            derivadas del uso de los servicios.
          </li>
        </ul>
        <p>
          La responsabilidad total de UGC Colombia no excederá el monto
          pagado por el cliente en los últimos 3 meses del servicio
          contratado.
        </p>

        <h2>9. Confidencialidad</h2>
        <p>
          UGC Colombia y sus colaboradores firman acuerdos de confidencialidad
          (NDA) por proyecto. Toda la información comercial, financiera o
          estratégica del cliente es tratada como confidencial.
        </p>

        <h2>10. Terminación</h2>
        <p>
          Cualquiera de las partes puede terminar el contrato:
        </p>
        <ul>
          <li>
            Con 30 días de aviso previo por escrito en servicios mensuales
            después de la permanencia mínima.
          </li>
          <li>
            Inmediatamente en caso de incumplimiento grave de la otra parte.
          </li>
          <li>
            En caso de no pago persistente por parte del cliente (mayor a 15
            días).
          </li>
        </ul>

        <h2>11. Modificaciones</h2>
        <p>
          UGC Colombia se reserva el derecho de modificar estos Términos en
          cualquier momento. Los cambios se notificarán mediante la
          actualización de la fecha en esta página y, cuando sean
          sustanciales, por correo electrónico a los clientes activos.
        </p>

        <h2>12. Ley Aplicable y Jurisdicción</h2>
        <p>
          Estos Términos se rigen por las leyes de la República de Colombia.
          Cualquier controversia derivada de la interpretación o ejecución de
          estos Términos será sometida a la jurisdicción de los jueces
          competentes de Bogotá, Colombia.
        </p>

        <h2>13. Contacto</h2>
        <p>
          Para cualquier consulta relacionada con estos Términos:
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
