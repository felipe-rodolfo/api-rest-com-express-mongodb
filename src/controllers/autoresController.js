import autor from "../models/Autor.js";

class AutorController {
  static listarAutor = async (req, res, next) => {
    const autoresResultados = await autor.find();

    try {
      res.status(200).json(autoresResultados);
    } catch(error){
      next(error);
    }
    
  };

  static listarAutorPorID = async (req, res, next) => {

    try {
      const id = req.params.id;
      const autorPorIDResultado = await autor.findById(id);
      if(autorPorIDResultado){
        res.status(200).send(autorPorIDResultado);
      } else {
        res.status(404).send({message: " Id do autor não localizado"});
      }
      
    } catch (error){
      next(error);
    }
        
  };

  static cadastrarAutor = async (req, res, next) => {
    let novoAutor = new autor(req.body);
    const novaAutorResultado = await novoAutor.save();

    try {
      res.status(201).send(novaAutorResultado.toJSON());
    } catch (error) {
      next(error);
    }

  };

  static atualizarAutor = async (req, res, next) => {

    try {
      const id = req.params.id;
        
      await autor.findByIdAndUpdate(id, {$set: req.body});

      res.status(200).send({message: "autor atualizado com sucesso"});
    } catch (error) {
      next(error);
    }
  };

  static excluirAutor = async (req, res, next) => {

    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id);
      res.status(200).send({message: "autor removido com sucesso"});
    } catch (error) {
      next(error);
    }
  };
      

}

export default AutorController;