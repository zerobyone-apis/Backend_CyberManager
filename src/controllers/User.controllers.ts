import { Request, Response } from 'express';
import moment from 'moment';
import { IUser } from '../types/User.type';
import QueryFunctions from '../../sql/connection/QueryFunctions';
import Queries, { USER_TABLE } from '../../sql/queries/Queries';
import ResultObject from '../utils/ResultObject';
let queryFunctions: QueryFunctions = new QueryFunctions();
let queries: Queries = new Queries();

export async function getUsers(req: Request, res: Response): Promise<Response> {
  let result: any = await queryFunctions.query(
    queries.getQuery(USER_TABLE, 'getAll'),
    []
  );
  if (result.statusCode == 200) {
    return res.status(200).json(result.value.rows);
  } else {
    return res.status(result.statusCode).json(result.value.rows);
  }
}
export async function createUser(req: Request, res: Response) {
  //This const is for linked to the correct enterprise.
  //just The Only.
  const enterpriseId = 1;
  const newUser: IUser = req.body.data;
  let queryParams = [
    newUser.username,
    newUser.passwd,
    newUser.charge,
    newUser.isAdmin,
    moment().format('YYYY-MM-DD HH:mm:ss'),
    enterpriseId
  ];
  let result: any = await queryFunctions.query(
    queries.getQuery(USER_TABLE, 'create'),
    queryParams
  );
  if (result.statusCode == 200) {
    return res.status(201).json('success');
  } else {
    return res.status(result.statusCode).json(result.value.rows);
  }
}
export async function updateUser(req: Request, res: Response) {
  const { username, passwd, charge, isAdmin }: IUser = req.body.data;
  const id = parseInt(req.params.id);
  let queryParams = [
    username,
    passwd,
    charge,
    isAdmin,
    moment().format('YYYY-MM-DD HH:mm:ss'),
    id
  ];
  let result: any = await queryFunctions.query(
    queries.getQuery(USER_TABLE, 'update'),
    queryParams
  );
  if (result.statusCode == 200) {
    return res.status(200).json({ id: id });
  } else {
    console.log(`Error actualizando este usuario: ${req.body.data}`);
    return res.status(result.statusCode).json(result.value.rows);
  }
}
export async function deleteUser(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  let result: any = await queryFunctions.query(
    queries.getQuery(USER_TABLE, 'delete'),
    [id]
  );
  if (result.statusCode == 200) {
    return res.status(200).json({
      message: `Usuario eliminado exitosamente con el id: ${id}`
    });
  } else {
    console.error(`Error borrando usuario con el id: ${id}`);
    return res.status(result.statusCode).json(result.value.rows);
  }
}
export async function findUserByID(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const resultUser: any = await queryFunctions.query(
    queries.getQuery(USER_TABLE, 'getId'),
    [id]
  );
  if (resultUser.statusCode == 200) {
    if (resultUser.value.rows != []) {
      return res.status(200).json({
        message: `Busqueda exitosa id user -> : ${id}`,
        data: resultUser.value.rows[0]
      });
    } else {
      return res.status(404).json(`No se encontro usuario con el id: ${id}`);
    }
  } else {
    console.error(`Error buscando ususario con el id: ${id}`);
    return res.status(resultUser.statusCode).json(resultUser.value.rows);
  }
}
export async function signIn(req: Request, res: Response) {
  const newUser: IUser = req.body.data;
  const paramsQuery = [newUser.username, newUser.passwd];
  const result: any = await queryFunctions.query(
    queries.getQuery(USER_TABLE, 'signIn'),
    paramsQuery
  );
  console.log(
    `\nEste es el resultado de la busqueda de usuario,`,
    result.value.rows,
    '\n'
  );

  if (result.statusCode == 200) {
    if (result.value.rows != [] && result.value.rows[0] != undefined) {
      return res.status(200).json(result.value.rows[0]);
    } else {
      return res
        .status(401)
        .json(`El usuario no esta registrado, verifique usuario y contraseña`);
    }
  } else {
    return res.status(404).json(`Error: ${result.value.rows}`);
  }
}
