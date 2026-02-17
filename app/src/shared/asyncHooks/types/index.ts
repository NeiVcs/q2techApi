export interface AppContext {
  /**
   * Identificador único da requisição atual.
   *
   * Usado para rastrear logs, métricas e diagnósticos
   * de forma consistente entre chamadas assíncronas.
   */
  requestId?: string;

  /**
   * Identificador do usuário autenticado, se disponível.
   */
  userId?: string;
  userLogin?: string;

  groupId?: string;
  personId?: string;
  companyId?: string;
  applicationId?: string;
  resources?: string[];
  servicesCompany?: string[];
  userProductAccountsIds?: string[];

  /**
   * Permite adicionar propriedades adicionais ao contexto.
   *
   * Pode ser usado para armazenar metadados personalizados,
   * como permissões, idioma, ou dados de auditoria.
   */
  [key: string]: any;
}
