import { Request, Response } from 'express';
export declare function getOrders(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getOrderByPagination(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function findByID(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function createOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function updateOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function updateRepairOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function doArqueo(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function changeStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function cancelOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function deleteOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
