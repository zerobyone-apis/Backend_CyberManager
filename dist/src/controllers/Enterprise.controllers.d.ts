import { Request, Response } from 'express';
export declare function getEnterprise(req: Request, res: Response): Promise<void>;
export declare function findEmpresaByUserID(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function createEmpresa(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function updateEnterprise(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function deleteEnterprise(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
