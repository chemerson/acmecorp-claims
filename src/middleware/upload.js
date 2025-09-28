import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const safeOriginal = file.originalname.replace(/\s+/g, '_');
    cb(null, `${timestamp}_${safeOriginal}`);
  },
});

const upload = multer({ storage });

export default upload;


