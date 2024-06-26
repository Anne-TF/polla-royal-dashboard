export interface IOperator {
  id: number;
  dbs: string;
  nombre: string;
  url: string;
  urlBg: string;
  secret: string;
  hash: string;
  creado: string;
  actualizado: string | null;
}
