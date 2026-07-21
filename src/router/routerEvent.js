export const getEvent = async(req, res) => {
    try{
        res.status(200).json({message: 'Listado de los eventos'});
    }catch(error){
        res.status(500).json({error: 'Ha ocurrido un error al intentar obtener los datos del evento.'});
    }

}