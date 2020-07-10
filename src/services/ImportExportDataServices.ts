import { Request, Response} from 'express';
import ResponseOperation from '../helpers/ResponseOperation';
import ImportExportDataController from '../controllers/ImportExportDataController';
import { HttpCode } from '../helpers/HttpCodes';
import {authentication, authorize} from '../helpers/AuthenticationFunction';
import multer from 'multer';

export default class ImportExportDataServices {

    public static routes(app: any){
        const upload = multer({ dest: 'temp/' })
        app.post('/api/demo/import/:sheetName', authentication, authorize('admin'), upload.single('uploadFile'), (req: Request, res: Response) => {
            try {
                this.import(req, res);
            } catch (e){
                return this.response(res, new ResponseOperation<any>(false, HttpCode.BAD_REQUEST, null, {msf: 'Incorrect params'}));
            }
        });
    }

    private static import(req: Request, res: Response){
        const controller = new ImportExportDataController();
        let sheetName = ''
        if (req.params.sheetName === 'carrier') sheetName = 'Carrier'
        if (req.params.sheetName === 'shipment') sheetName = 'Data'
        const userData = req.file.path

        controller.importData(userData, sheetName)
            .then((result) => this.response(res, result))
            .catch((result) => this.response(res, result));
    }

    private static response(res: Response, result: ResponseOperation<any>){
        res.status(result.statusCode).json(result);
    }


}