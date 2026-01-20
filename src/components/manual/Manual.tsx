import React, { useState } from 'react'
import GettingStarted from './HelpList/GettingStarted'
import AccountSetup from './HelpList/AccountSetup'
import CreateProject from './HelpList/CreateProject'
import UsingDesigner from './HelpList/UsingDesigner'
import ExportImage from './HelpList/ExportImage'

type Props = {}

const Manual = (props: Props) => {

    const [activeTab, setActiveTab] = useState("GettingStarted");

  return (
    <div style={{ backgroundColor: 'white', display: 'flex', height: '100vh', gap: '20px' }}>

        {/* Help list*/}
        <div className='help-menu' style={{backgroundColor: '#ffb845', width: '220px', padding: '30px', overflowY: 'auto'}}>
            <h2>Ayudas</h2>
            <ul style={{listStyleType: 'disc', paddingLeft: '20px', marginTop: '20px', lineHeight: '1.6'}}>
                <li onClick={() => setActiveTab("GettingStarted")}>Bienvenidos</li>
                <li onClick={() => setActiveTab("AccountSetup")}>Configuración de la Cuenta</li>
                <li onClick={() => setActiveTab("CreateProject")}>Creando un Proyecto</li>
                <li onClick={() => setActiveTab("UsingDesigner")}>Usando la Herramienta de Diseño</li>
                {/*
                <li>Atajos y Consejos</li>
                <li>Solución de Problemas</li>
                <li>Preguntas Frecuentes</li>
                <li>Contactar Soporte</li>
                */}
            </ul>
        </div>

        {/* Help content*/}
        <div style={{flex: 1, padding: '30px', overflowY: 'auto'}}>
            {activeTab === "GettingStarted" && <GettingStarted />}
            {activeTab === "AccountSetup" && <AccountSetup />}
            {activeTab === "CreateProject" && <CreateProject />}
            {activeTab === "UsingDesigner" && <UsingDesigner />}
        </div>
    </div>
  )
}

export default Manual