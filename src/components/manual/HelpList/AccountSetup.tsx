import React from 'react'

type Props = {}

const AccountSetup = (props: Props) => {
  return (
    <>
        <h1>Configuración de la cuenta</h1>
        <p>Instrucciones para crear una cuenta, iniciar sesión y recuperar la contraseña.</p>
        <h2>Crear una cuenta</h2>
        <p>Pulsa "Registrarse" en la pantalla de inicio, rellena nombre, correo y contraseña y confirma con "Register".</p>
        <img src="/images/help/register1.png" alt="Account Setup Step 1" style={{width: '100%', maxWidth: '600px', marginTop: '10px', marginBottom: '10px'}} />
        <p>Recibirás un correo de verificación; haz clic en el enlace del correo para finalizar el registro.</p>
        <img src="/images/help/register2.png" alt="Account Setup Step 2" style={{width: '100%', maxWidth: '600px', marginTop: '10px', marginBottom: '10px'}} />
        <img src="/images/help/register3.png" alt="Account Setup Step 3" style={{width: '100%', maxWidth: '600px', marginTop: '10px', marginBottom: '10px'}} />
        <h2>Iniciar sesión</h2>
        <p>Introduce tu usuario y contraseña y pulsa "Login". Si olvidaste la contraseña, usa la opción de recuperación y sigue las instrucciones del correo.</p>
        <img src="/images/help/login.png" alt="Login Screen" style={{width: '100%', maxWidth: '600px', marginTop: '10px', marginBottom: '10px'}} />
    </>
  )
}

export default AccountSetup