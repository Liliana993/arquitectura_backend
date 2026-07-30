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