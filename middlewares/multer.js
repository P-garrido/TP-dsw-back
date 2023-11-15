import multer from 'multer';

const storage = multer.diskStorage({
  destination: 'public/uploads',
  filename: (req, file, cb) => {
    return cb(null, file.originalname);
  },
});

export const multerU = multer({
  storage,
  dest: 'public/uploads',
}).single('image');
