import mongoose from "mongoose";
import autor from "../models/Autor.js";

class AutorController {
  static listarAutor = async (req, res) => {
    const autoresResultados = await autor.find();

    try {
      res.status(200).json(autoresResultados);
    } catch(erro){
      res.status(500).json({message: "Erro interno no servidor"});
    }
    
  };

  static listarAutorPorID = async (req, res) => {

    try {
      const id = req.params.id;
      const autorPorIDResultado = await autor.findById(id);
      if(autorPorIDResultado){
        res.status(200).send(autorPorIDResultado);
      } else {
        res.status(404).send({message: " Id do autor não localizado"});
      }
      
    } catch (error){
      if(error instanceof mongoose.Error.CastError){
        res.status(400).send({message: "Um ou mais dados fornecidos estão incorretos"});
      } else {
        res.status(500).send({message: `${error.message} - Erro interno do servidor`});
      }
    }
        
  };

  static cadastrarAutor = async (req, res) => {
    let novoAutor = new autor(req.body);
    const novaAutorResultado = await novoAutor.save();

    try {
      res.status(201).send(novaAutorResultado.toJSON());
    } catch (error) {
      res.status(500).send({message: `${error.message} - falha ao cadastrar autor.`});
    }

  };

  static atualizarAutor = async (req, res) => {

    try {
      const id = req.params.id;
        
      await autor.findByIdAndUpdate(id, {$set: req.body});

      res.status(200).send({message: "autor atualizado com sucesso"});
    } catch (error) {
      res.status(500).send({message: error.message});
    }
  };

  static excluirAutor = async (req, res) => {

    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id);
      res.status(200).send({message: "autor removido com sucesso"});
    } catch (error) {
      res.status(500).send({message: error.message});
    }
  };
      

}

export default AutorController;