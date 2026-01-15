import React from 'react'

type Props = {}

const UsingDesigner = (props: Props) => {
  return (
    <>
        <h1>Usando la herramienta de diseño</h1>
        <p>Esta sección te guiará a través de las características y funcionalidades de la herramienta de diseño.</p>
        <h2>Interfaz de Usuario</h2>
        <p>La herramienta de diseño cuenta con una interfaz intuitiva que facilita la creación y edición de tus proyectos.</p>
        <img src="/images/help/design1.png" alt="Designer Interface" style={{width: '100%', maxWidth: '600px', marginTop: '10px', marginBottom: '10px'}} />
        <h2>Herramientas Principales</h2>
        <p>Explora las herramientas principales disponibles en la barra lateral para agregar elementos, ajustar propiedades y más.</p>
        <img src="/images/help/design2.png" alt="Designer Tools" style={{width: '100%', maxWidth: '600px', marginTop: '10px', marginBottom: '10px'}} />
        <p>Entre ellas tenemos las herramientas de selección, formas, texto, agrupar, desagrupar y eliminar.</p>
        <h2>Agrupar objetos</h2>
        <p>Para agrupar objetos, tenemos que tener un minimo de 2 objetos seleccionados, esto se puede hacer manteniendo presionada la tecla Shift mientras haces clic en los objetos que deseas agrupar.</p>
        <img src="/images/help/design3.png" alt="Objects" style={{width: '100%', maxWidth: '600px', marginTop: '10px', marginBottom: '10px'}} />
        <p>Luego pulsamos el icono de agrupar en la barra de herramientas.</p>
        <img src="/images/help/design4.png" alt="Group objects button" style={{width: '100%', maxWidth: '600px', marginTop: '10px', marginBottom: '10px'}} />
        <p>Podemos observar los objetos agrupados como un solo elemento.</p>
        <img src="/images/help/design5.png" alt="Objects in group" style={{width: '100%', maxWidth: '600px', marginTop: '10px', marginBottom: '10px'}} />
        <h2>Desagrupar objetos</h2>
        <p>Para desagrupar, selecciona el grupo y haz clic en el icono de desagrupar en la barra de herramientas.</p>
        <img src="/images/help/design6.png" alt="Ungroup Objects" style={{width: '100%', maxWidth: '600px', marginTop: '10px', marginBottom: '10px'}} />
        <p>Los objetos volverán a ser elementos individuales que puedes mover y editar por separado.</p>
        <img src="/images/help/design7.png" alt="Objects Ungrouped" style={{width: '100%', maxWidth: '600px', marginTop: '10px', marginBottom: '10px'}} />
    </>
  )
}

export default UsingDesigner