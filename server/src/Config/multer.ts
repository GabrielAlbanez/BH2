import multer from "multer";

// Configuração do armazenamento do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split('.').pop(); // Obtém a extensão do arquivo original
    cb(null, uniqueSuffix + '.' + fileExtension); // Nome do arquivo no formato: timestamp-aleatório.extensão
  },
});

// Crie uma instância do multer com a configuração de armazenamento
const upload = multer({ storage: storage });

export default upload;
