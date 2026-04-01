import { format } from "date-fns";
import { id } from "date-fns/locale";

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    return format(d, "dd MMMM yyyy", { locale: id });
  } catch {
    return dateStr;
  }
}

export default formatDate;