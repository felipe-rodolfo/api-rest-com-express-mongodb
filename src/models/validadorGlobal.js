import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
  validator: (valor) => valor != "",
  message: (path) =>`o ${path} em branco foi fornecido`
});