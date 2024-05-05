export default {
  exceptions: {
    auth: {
      badCredentials: {
        caption: 'El correo o contraseña son erróneos. \n Por favor, verifique sus credenciales.',
        title: 'Error de credenciales'
      },
      tokenExpired: 'Your token has expired. But you should not be able to see this message. Contact support.',
      forbidden: {
        title: 'La sesión ha expirado',
        caption: 'Por favor, inicie sesión nuevamente.'
      }
    },
    shared: {
      badRequest: {
        caption: 'El correo debe pertener a uno de los siguientes \n dominios: museomoda.cl, museomoda.com, wingsoft.cl \n o wingsoft.com',
        title: 'Correo con dominio inválido'
      },
      notFound: {
        caption: 'No se encontró el recurso solicitado.',
        title: 'Recurso no encontrado'
      }
    },
    common: {
      uniqueAttributes: 'La combinación de {attributes} ya se encuentra en uso.',
      uniqueAttribute: 'El {attributes} ya se encuentra en uso.'
    }
  }
};
