import React from 'react'

type Props = {}

const CreateProject = (props: Props) => {
  return (
    <>
        <h1>Creando un Proyecto</h1>
        <p>Para crear un nuevo proyecto, hay 2 opciones, se puede dirigir a la pantalla "Design"</p>
        <img src="/images/help/creando1.png" alt="Create Project 1" style={{width: '100%', maxWidth: '600px', marginTop: '10px', marginBottom: '10px'}} />
        <p>Por otro lado tambien esta la opcion de pulsar el boton negro "Nuevo Proyecto" que se encuentra en la pantalla principal justo encima de los proyectos anteriores</p>
        <img src="/images/help/creando2.png" alt="Create Project 2" style={{width: '100%', maxWidth: '600px', marginTop: '10px', marginBottom: '10px'}} />
        <p>Una vez creado, serás dirigido al área de diseño donde podrás comenzar a trabajar en tu proyecto.</p>
    </>
  )
}

export default CreateProject