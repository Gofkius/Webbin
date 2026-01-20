import React from 'react'

type Props = {}

const ExportImage = (props: Props) => {
  return (
    <>
        <h1>Exportar tu diseño</h1>
        <p>Guarda tu proyecto como imagen PNG para compartirlo o usarlo fuera de la aplicación.</p>
        <h2>Exportar como PNG</h2>
        <p>Haz clic en el botón "Export" en la barra superior. Se descargará un archivo PNG del lienzo.</p>
        <img src="/images/help/export1.png" alt="Export Button" style={{width: '100%', maxWidth: '600px', marginTop: '10px', marginBottom: '10px'}} />
        <p>El nombre por defecto del archivo es <strong>design.png</strong>. Si necesitas otro nombre, puedes renombrarlo después de la descarga.</p>
        <p><strong>Consejo:</strong> solo se exportan los elementos visibles. Si quieres excluir algo, ocúltalo desde <strong>Layers</strong> antes de exportar.</p>
        <p>El zoom o el desplazamiento de la vista no afectan al resultado final: la exportación se genera a tamaño real del lienzo.</p>
        <img src="/images/help/export2.png" alt="Select Image Format" style={{width: '100%', maxWidth: '600px', marginTop: '10px', marginBottom: '10px'}} />
    </>
  )
}

export default ExportImage