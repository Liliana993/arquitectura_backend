// Health Check => para verificar que la API esté corriendo correctamente
export const healthCheck = (req, res) => {
    try{
        res.status(200).json({
            status: "ok",
            message: "API corriendo con éxito!"
        });
    }catch(error){
        res.status(500).json({
          error: "Error al realizar el health check."
        })
    }
}

// Events => traer todos los eventos
export const getEvents = (req, res) => {
    try{
        res.status(200).json({
        status: "success",
        payload: []
    });
    }catch(error){
        res.status(500).json({
          error: "Error al obtener los eventos."
        })
    }
    
}

// Create Event => crear un nuevo evento sin persistencia en la base de datos aún.
export const createEvent = (req, res) => {
  try {
    res.status(201).json({ 
      status: 'success',
      messages: 'Evento creado con éxito!'
     })
  } catch (error) {
    res.status(500).json({
      error: 'Error al intentar crear el evento.'
     })
  }
}