export interface RestAuditLog {
  logType: string;
  userUuid?: string;
  companyUuid?: string;
  applicationUuid?: string;
  company?: string;
  user?: string;
  method?: string;
  originalMethod?: string;
  statusCode?: number;
  application?: string;
  clientIp?: string;
  remoteIp?: string;
  headers?: any;
  parameters?: any;
  query?: any;
  requestBody?: any;
  responseBody?: any;
  stackError?: any;
  elapsedTime?: number;
}
