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

        app.post('/api/demo/export', authentication, authorize('admin'), (req: any, res: Response) => {
            try {
                this.export(req, res);
            } catch (e){
                return res.json({a: 1});
            }
        });
    }

    private static import(req: Request, res: Response){
        const controller = new ImportExportDataController();
        let sheetName = ''
        if (req.params.sheetName === 'carrier') sheetName = 'Carrier'
        if (req.params.sheetName === 'shipment') sheetName = 'Data'
        const filePath = req.file.path

        controller.importData(filePath, sheetName)
            .then((result) => this.response(res, result))
            .catch((result) => this.response(res, result));
    }

    private static export(req: any, res: Response){
        const controller = new ImportExportDataController();
        const { body: { fileType }, user: { email } }  = req;

        controller.exportData(email,fileType)
            .then((result) => this.response(res, result))
            .catch((result) => this.response(res, result));
    }

    private static response(res: Response, result: ResponseOperation<any>){
        res.status(result.statusCode).json(result);
    }
}