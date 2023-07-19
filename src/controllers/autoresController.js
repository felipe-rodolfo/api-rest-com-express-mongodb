import autor from '../models/Autor.js';

class AutorController {
    static listarAutor = (req, res) => {
        autor.find((err, autor) => {
            res.status(200).json(autor)
        });
    }

    static listarAutorPorID = (req, res) => {
        const id = req.params.id;

        autor.findById(id, (err, autor) => {
            if(err){
                res.status(400).send({message: `${err.message} - Id do autor não localizado`})
            } else {
                res.status(200).send(autor);
            }
        })
        

    }

    static cadastrarAutor = (req, res) => {
        let novoAutor = new autor(req.body);
        novoAutor.save((err) => {
            if(err){
                res.status(500).send({message: `${err.message} - falha ao cadastrar autor.`})
            } else {
                res.status(201).send(novoAutor.toJSON());
            }
        });
    }

    static atualizarAutor = (req, res) => {
        const id = req.params.id;
        
        autor.findByIdAndUpdate(id, {$set: req.body}, (err) => {
          if(!err) {
            res.status(200).send({message: 'autor atualizado com sucesso'})
          } else {
            res.status(500).send({message: err.message})
          }
        })
    }

    static excluirAutor = (req, res) => {
        const id = req.params.id;
        autor.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200).send({message: 'autor removido com sucesso'})
            } else {
                res.status(500).send({message: err.message})
            }
        })
    }
      

}

export default AutorController;