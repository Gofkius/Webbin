import React from 'react'

type Props = {}

const ExportImage = (props: Props) => {
  return (
    <>
        <h1>Exportando tu trabajo</h1>
        <p>Esta sección te guiará a través del proceso de exportación de tus diseños como imágenes.</p>
        <h2>Acceder a la opción de exportación</h2>
        <p>Para exportar tu diseño, primero debes acceder al menú de exportación. Esto se puede hacer haciendo clic en el botón "Exportar" ubicado en la esquina superior derecha de la interfaz.</p>
        <img src="/images/help/export1.png" alt="Export Button" style={{width: '100%', maxWidth: '600px', marginTop: '10px', marginBottom: '10px'}} />
        <p>Una vez que hayas hecho clic en el botón de exportación, se te presentará un menu donde tienes que elegir el nombre y donde quieres guardar el fichero, se guardara la imagen en formato PNG.</p>
        <img src="/images/help/export2.png" alt="Select Image Format" style={{width: '100%', maxWidth: '600px', marginTop: '10px', marginBottom: '10px'}} />
    </>
  )
}

export default ExportImage