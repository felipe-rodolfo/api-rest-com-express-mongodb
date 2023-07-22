import { autores, livros } from "../models/index.js";

class LivroController {
  static listarLivros = (req, res) => {
    livros.find()
      .populate("autor")
      .exec((err, livros) => {
        res.status(200).json(livros);
      });
  };

  static listarLivroPorID = (req, res) => {
    const id = req.params.id;

    livros.findById(id)
      .populate("autor", "nome")
      .exec((err, livros) => {
        if(err){
          res.status(400).send({message: `${err.message} - Id do livro não localizado`});
        } else {
          res.status(200).send(livros);
        }
      });
        

  };

  static cadastrarLivro = (req, res) => {
    let livro = new livros(req.body);
    livro.save((err) => {
      if(err){
        res.status(500).send({message: `${err.message} - falha ao cadastrar livro.`});
      } else {
        res.status(201).send(livro.toJSON());
      }
    });
  };

  static atualizarLivro = (req, res) => {
    const id = req.params.id;
        
    livros.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(!err) {
        res.status(200).send({message: "Livro atualizado com sucesso"});
      } else {
        res.status(500).send({message: err.message});
      }
    });
  };

  static excluirLivro = (req, res) => {
    const id = req.params.id;
    livros.findByIdAndDelete(id, (err) => {
      if(!err){
        res.status(200).send({message: "Livro removido com sucesso"});
      } else {
        res.status(500).send({message: err.message});
      }
    });
  };

  static listarLivroPorFiltro = async (req, res, next) =>{
    
    try {
      const busca = await processaBusca(req.query);

      if(busca !== null){
        const livrosResultado = await livros
          .find(busca)
          .populate("autor");
        res.status(200).send(livrosResultado);
      } else {
        res.status(200).send([]);
      }
      

    } catch (error) {
      next(error);
    }
  };
      
}

async function processaBusca(params){
  const {editora, titulo, minPaginas, maxPaginas, nomeAutor} = params;
    
  let busca = {};
  if(editora) busca.editora = editora;
  if(titulo) busca.titulo = {$regex: titulo, $options: "i"};

  if(minPaginas || maxPaginas) busca.numeroPaginas = {};

  if(minPaginas) busca.numeroPaginas.$gte = minPaginas;
  if(maxPaginas) busca.numeroPaginas.$lte = maxPaginas;
  if(nomeAutor){
    const autor = await autores.findOne({nome: nomeAutor});
    if(autor !== null){
      const autorId = autor._id;
      busca.autor = autorId;
    } else {
      busca = null;
    }
  }
  return busca;
}

export default LivroController;