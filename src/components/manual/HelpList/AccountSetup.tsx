import React from 'react'

type Props = {}

const AccountSetup = (props: Props) => {
  return (
    <>
        <h1>Configuración de la Cuenta</h1>
        <p>Esta sección te guiará a través de la configuración de tu cuenta, el inicio de sesión y la restauración de tu contraseña.</p>
        <h2>Creando una Cuenta</h2>
        <p>Para crear una cuenta, haz clic en el botón "Registrarse" en el menú de Inicio de Sesión, ubicado en la parte inferior de la pantalla.</p>
        <img src="/images/help/register1.png" alt="Account Setup Step 1" style={{width: '100%', maxWidth: '600px', marginTop: '10px', marginBottom: '10px'}} />
        <p>Completa los detalles requeridos como nombre de usuario, correo electrónico y contraseña, luego haz clic en "Register" para crear tu cuenta.</p>
        <img src="/images/help/register2.png" alt="Account Setup Step 2" style={{width: '100%', maxWidth: '600px', marginTop: '10px', marginBottom: '10px'}} />
        <p>Después de esto recibirás un correo electrónico solicitando verificar tu dirección de correo electrónico. Haz clic en el enlace del correo para completar tu registro.</p>
        <h2>Iniciando Sesión</h2>
        <p>Para iniciar sesión, ingresa tu nombre de usuario y contraseña en los campos proporcionados en la pantalla de inicio de sesión y haz clic en "Login".</p>
        <img src="/images/help/login.png" alt="Login Screen" style={{width: '100%', maxWidth: '600px', marginTop: '10px', marginBottom: '10px'}} />
    </>
  )
}

export default AccountSetup