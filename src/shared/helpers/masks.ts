export const formatDateTime = (date: Date | string | number): string => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(d);
};

export const formatCurrency = (value: number): string => {
  if (typeof value !== 'number' || isNaN(value)) return 'R$ 0,00';

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export enum PaymentMethod {
  CREDIT = 'credit',
  DEBIT = 'debit',
  PIX = 'pix',
  MONEY = 'money',
}

export const formatPaymentMethod = (method: PaymentMethod | string): string => {
  const map: Record<string, string> = {
    [PaymentMethod.CREDIT]: 'Cartão de Crédito',
    [PaymentMethod.DEBIT]: 'Cartão de Débito',
    [PaymentMethod.PIX]: 'Pix',
    [PaymentMethod.MONEY]: 'Dinheiro',
  };

  return map[method?.toLowerCase()] || 'Não informado';
};


export enum DeliveryMode {
  DELIVERY = 'delivery',
  TAKEOUT = 'takeout',
  DINE_IN = 'dine_in',
}

export const formatDeliveryMode = (mode: DeliveryMode | string): string => {
  const map: Record<string, string> = {
    [DeliveryMode.DELIVERY]: 'Entrega Delivery',
    [DeliveryMode.TAKEOUT]: 'Retirada no Balcão',
    [DeliveryMode.DINE_IN]: 'Consumo no Local',
  };

  return map[mode?.toLowerCase()] || 'Não informado';
};

export const formatPhone = (phone: string): string => {
  if (!phone) return '';

  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length === 11) {
    return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  } else if (cleaned.length === 10) {
    return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
  }

  return phone; // Retorna original se o tamanho fugir do padrão
};

export const formatCEP = (cep: string): string => {
  if (!cep) return '';

  const cleaned = cep.replace(/\D/g, '');

  if (cleaned.length === 8) {
    return cleaned.replace(/^(\d{5})(\d{3})$/, '$1-$2');
  }

  return cep;
};
