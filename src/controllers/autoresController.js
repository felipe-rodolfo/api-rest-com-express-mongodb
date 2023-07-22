import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {
  static listarAutor = async (req, res, next) => {
    const autoresResultados = await autores.find();

    try {
      res.status(200).json(autoresResultados);
    } catch(error){
      next(error);
    }
    
  };

  static listarAutorPorID = async (req, res, next) => {

    try {
      const id = req.params.id;
      const autorPorIDResultado = await autores.findById(id);
      if(autorPorIDResultado){
        res.status(200).send(autorPorIDResultado);
      } else {
        next(new NaoEncontrado("Id do autor não localizado"));
      }
      
    } catch (error){
      next(error);
    }
        
  };

  static cadastrarAutor = async (req, res, next) => {
    let novoAutor = new autores(req.body);
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
        
      const autorResultado = await autores.findByIdAndUpdate(id, {$set: req.body});
      if(autorResultado != null){
        res.status(200).send({message: "Autor atualizado com sucesso!"});
      } else {
        next(new NaoEncontrado("ID do autor não localizado"));
      }

      res.status(200).send({message: "autor atualizado com sucesso"});
    } catch (error) {
      next(error);
    }
  };

  static excluirAutor = async (req, res, next) => {

    try {
      const id = req.params.id;
      const autorResultado = await autores.findByIdAndDelete(id);
      if(autorResultado !== null){
        res.status(200).send({message: "autor removido com sucesso"});
      } else {
        next(new NaoEncontrado("ID do autor não localizado."));
      }
      
    } catch (error) {
      next(error);
    }
  };
      

}

export default AutorController;