import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
  constructor(error){
    const mensagensErro = Object.values(error.errors)
      .map(erro => erro.message)
      .join("; ");

    super(`Houve um erro de validação de dados ${mensagensErro}`);
        
  }
}

export default ErroValidacao;