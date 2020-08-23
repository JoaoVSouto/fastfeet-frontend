/* eslint import/no-duplicates: 0 */
import { parseISO, format as formatDate } from 'date-fns';
import { ptBR } from 'date-fns/locale';

class Format {
  cep(cep: string): string {
    const DELIMITER_POSITION = 5;

    const firstFiveDigits = cep.slice(0, DELIMITER_POSITION);
    const lastThreeDigits = cep.slice(DELIMITER_POSITION);

    return `${firstFiveDigits}-${lastThreeDigits}`;
  }

  date(date: string): string {
    const dateISO = parseISO(date);

    const dateFormatted = formatDate(dateISO, 'dd/MM/yyyy', { locale: ptBR });

    return dateFormatted;
  }
}

export const format = new Format();
