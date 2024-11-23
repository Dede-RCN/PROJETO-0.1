import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost} from "../controllers/postsController.js";

const corsOptons = {
  origin: "http://localhost:8000",
  optionSuccessStatus:200
}


// Configura o armazenamento do Multer para uploads de imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Especifica o diretório para armazenar as imagens enviadas
      cb(null, 'uploads/'); // Substitua por seu caminho de upload desejado
    },
    filename: function (req, file, cb) {
      // Mantém o nome original do arquivo por simplicidade
      cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
    }
});

const upload = multer({ storage: storage });

const routes = (app) => {
    // Permite que o servidor interprete corpos de requisições no formato JSON
    app.use(express.json());
    app.use(cors(corsOptons));

    // Rota para recuperar uma lista de todos os posts
    app.get("/posts/s", listarPosts); // Chama a função controladora apropriada
  
    // Rota para criar um novo post
    app.post("/posts/s", postarNovoPost); // Chama a função controladora para criação de posts
  
    // Rota para upload de imagens (assumindo uma única imagem chamada "imagem")
    app.post("/upload", upload.single("imagem"), uploadImagem); // Chama a função controladora para processamento da imagem`
  
    app.put("/upload/:id", atualizarNovoPost)
};
  
  export default routes;
