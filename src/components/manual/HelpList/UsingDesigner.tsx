import React from 'react'
import ExportImage from './ExportImage'

type Props = {}

const UsingDesigner = (props: Props) => {
  return (
    <>
        <h1>Usando la herramienta de diseño</h1>
        <p>Guía rápida sobre las herramientas para crear, seleccionar y editar elementos en tu proyecto.</p>
        <h2>Interfaz</h2>
        <p>La pantalla se divide en un área de trabajo (lienzo), una barra superior con herramientas y un panel lateral con capas y propiedades.</p>
        <img src="/images/help/design1.png" alt="Designer Interface" style={{width: '100%', maxWidth: '600px', marginTop: '10px', marginBottom: '10px'}} />
        <h2>Herramientas principales</h2>
        <p>La mayoría de acciones se realizan desde la barra superior (herramientas) y el panel derecho (capas y propiedades).</p>
        <img src="/images/help/design2.png" alt="Designer Tools" style={{width: '100%', maxWidth: '600px', marginTop: '10px', marginBottom: '10px'}} />

        <h3>Barra superior (herramientas)</h3>
        <ul>
          <li><strong>Seleccionar:</strong> selecciona elementos para moverlos, cambiar su tamaño o rotarlos. Si mantienes <strong>Shift</strong> puedes seleccionar varios.</li>
          <li><strong>Mano:</strong> sirve para mover la vista (pan). Con esta herramienta activa, arrastra el lienzo para desplazarte.</li>
          <li><strong>Rectángulo / Círculo / Triángulo / Estrella:</strong> inserta una forma en el centro del lienzo. Después puedes modificar color y tamaño.</li>
          <li><strong>Texto:</strong> inserta un texto. El contenido y el tamaño de fuente se editan desde el panel de propiedades.</li>
          <li><strong>Agrupar:</strong> combina varios elementos en un grupo.</li>
          <li><strong>Desagrupar:</strong> separa un grupo en elementos individuales.</li>
          <li><strong>Eliminar:</strong> borra el/los elementos seleccionados.</li>
          <li><strong>Export:</strong> guarda el lienzo como imagen (PNG).</li>
        </ul>

        <h3>Panel derecho (Layers / Properties)</h3>
        <img src="/images/help/design8.png" alt="Layers" style={{width: '100%', maxWidth: '600px', marginTop: '10px', marginBottom: '10px'}} />
        <img src="/images/help/design9.png" alt="Properties" style={{width: '100%', maxWidth: '600px', marginTop: '10px', marginBottom: '10px'}} />
        <ul>
          <li><strong>Layers:</strong> lista de elementos del proyecto. Puedes seleccionar desde aquí y reordenar capas arrastrando (en elementos de nivel superior).</li>
          <li><strong>Mostrar/Ocultar:</strong> el icono del ojo permite ocultar temporalmente un elemento (no se exporta si está oculto).</li>
          <li><strong>Renombrar:</strong> haz doble clic sobre el nombre de una capa para editarlo.</li>
          <li><strong>Properties:</strong> muestra opciones del elemento seleccionado (por ejemplo: <strong>Fill Color</strong>, <strong>Corner Radius</strong> en algunas formas, o <strong>Content</strong> y <strong>Font Size</strong> en texto).</li>
        </ul>

        <h3>Navegación y selección</h3>
        <ul>
          <li><strong>Zoom:</strong> usa la rueda del ratón/trackpad sobre el lienzo para acercar o alejar.</li>
          <li><strong>Selección “inteligente” en grupos:</strong> si hacens clic sobre un elemento dentro de un grupo, primero se selecciona el grupo. Vuelve a hacer clic para seleccionar el elemento interno.</li>
        </ul>

        <h2>Agrupar objetos</h2>
        <p>Selecciona al menos dos objetos (mantén pulsada la tecla Shift mientras haces clic) y pulsa el icono "Agrupar" en la barra superior.</p>
        <p><strong>Nota:</strong> actualmente el agrupado funciona mejor con elementos que están al mismo nivel (no dentro de otros grupos).</p>
        <img src="/images/help/design3.png" alt="Objects" style={{width: '100%', maxWidth: '600px', marginTop: '10px', marginBottom: '10px'}} />
        <img src="/images/help/design4.png" alt="Group objects button" style={{width: '100%', maxWidth: '600px', marginTop: '10px', marginBottom: '10px'}} />
        <h2>Desagrupar objetos</h2>
        <p>Selecciona un grupo y pulsa el icono "Desagrupar" para volver a editar cada objeto por separado.</p>
        <img src="/images/help/design6.png" alt="Ungroup Objects" style={{width: '100%', maxWidth: '600px', marginTop: '10px', marginBottom: '10px'}} />
        <ExportImage />
    </>
  )
}

export default UsingDesigner