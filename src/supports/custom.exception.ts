import { AppException } from './app.exception';

export default class CustomException extends AppException {
  public name: string;
  private readonly details: Array<string> | undefined;
  private readonly httpStatus: number;

  constructor(error: CustomExceptionInterface) {
    super(error.message, error.exception, error.code);
    this.name = 'CustomException';
    this.message = error.message;
    this.httpStatus = this.getHttpStatusVal(error.httpStatus);
    this.details = this.formatDetails(error.details);
  }

  private formatDetails(details: Array<string> | string | undefined): Array<string> {
    if (details) {
      return Array.isArray(details) ? details : [details];
    } else {
      return [];
    }
  }

  private getHttpStatusVal(httpStatus?: number) {
    return httpStatus ?? 500;
  }

  public getHttpStatus(): number {
    return this.httpStatus;
  }

  public getDetails(): Array<string> | undefined {
    return this.details;
  }
}

export interface CustomExceptionInterface {
  code: string;
  message: string;
  httpStatus: number;
  details?: Array<string>;
  exception?: Error;
}
