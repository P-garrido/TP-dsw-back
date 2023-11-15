import { URL } from 'url';
export class ImageController {
  getOneImage = async (req, res) => {
    const id = req.params.id;
    // const imgPath = path.join(dirname, `/public/uploads/${id}.jpeg`);
    // `../public/uploads/${id}.jpeg`;
    const imgPath = new URL(`../public/uploads/${id}.jpeg`, import.meta.url)
      .pathname;
    res.sendFile(imgPath);
  };
  uploadImg = async (req, res) => {
    console.log(req);
    if (req.file) {
      res.json({ message: 'enviado correctamnte' });
    }
  };
}
