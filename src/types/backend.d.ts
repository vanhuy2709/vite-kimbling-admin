export { };
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {

  interface IAuth {
    access_token: string,
    user: {
      _id: string,
      username: string
    }
  }

  interface IMeta {
    current: number | null,
    pageSize: number | null,
    pages: number,
    total: number
  }

  interface IBlog {
    _id: string,
    title: string,
    description: string,
    idRole: string,
    color: #D7E1ED,
    color: string,
    video: string[],
    photo: string[],
    thumb: string,
    createdAt: string,
    updatedAt: string,
  }

  interface IRole {
    _id: string,
    nameRole: string,
    description: string,
    thumb: string
  }

  interface IRequest {
    url: string;
    method: string;
    body?: { [key: string]: any };
    queryParams?: any;
    useCredentials?: boolean;
    headers?: any;
    nextOption?: any;
  }

  interface IBackendAuth<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: {
      meta: IMeta;
      result: T[];
    };
  }
}