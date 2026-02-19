import { generateUuidV7 } from '@shared/uuid';

export class IntegrationLoggerType {
  constructor(props: {
    application: string;
    startTime: [number, number];
    statusCode: number;
    method: string;
    originalMethod: string;
    requestBody: any;
    responseBody: any;
    headers?: any;
    parameters?: any;
    query?: any;
  }) {
    this.logId = generateUuidV7();
    this.application = props.application;
    this.method = props.method;
    this.originalMethod = props.originalMethod;
    this.requestBody = this.safeParseRequest(props.requestBody);
    this.responseBody = typeof props.responseBody === 'string' ? props.responseBody : props.responseBody;
    this.headers = props.headers || {};
    this.parameters = props.parameters || {};
    this.query = props.query || {};
    this.statusCode = props.statusCode;
    this.startTime = props.startTime;
    this.elapsedTime = 0;
  }

  public readonly logId: string;
  public readonly application: string;
  public readonly method: string;
  public readonly originalMethod: string;
  public readonly statusCode: number;
  public elapsedTime: number;
  public readonly requestBody: any;
  public responseBody: any;
  public readonly headers: any;
  public readonly parameters: any;
  public readonly query: any;
  public startTime?: [number, number];

  private safeParseRequest(obj: any): any {
    if (obj && typeof obj === 'string') {
      try {
        return JSON.parse(obj);
      } catch {
        return {};
      }
    }
    return obj || {};
  }
}
