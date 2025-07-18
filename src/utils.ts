export const formateDate = (date: Date) : string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};


export const formatUTCTimestampToTemplate = (timestamp: number, template: string="YYYY-MM-DD HH:MM:SS"): string => {
  const date = new Date(timestamp);
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  const hour = date.getUTCHours().toString().padStart(2, "0");
  const minute = date.getUTCMinutes().toString().padStart(2, "0");
  const second = date.getUTCSeconds().toString().padStart(2, "0");
  return template.replace("YYYY", year.toString()).replace("MM", month).replace("DD", day).replace("HH", hour).replace("mm", minute).replace("ss", second);
};

export const formatDateToTemplate = (date: Date, template: string="YYYY-MM-DD HH:MM:SS", isUTC: boolean=false): string => {
  const year = isUTC ? date.getUTCFullYear() : date.getFullYear();
  const month = isUTC ? (date.getUTCMonth() + 1).toString().padStart(2, "0") : (date.getMonth() + 1).toString().padStart(2, "0");
  const day = isUTC ? date.getUTCDate().toString().padStart(2, "0") : date.getDate().toString().padStart(2, "0");
  const hour = isUTC ? date.getUTCHours().toString().padStart(2, "0") : date.getHours().toString().padStart(2, "0");
  const minute = isUTC ? date.getUTCMinutes().toString().padStart(2, "0") : date.getMinutes().toString().padStart(2, "0");
  const second = isUTC ? date.getUTCSeconds().toString().padStart(2, "0") : date.getSeconds().toString().padStart(2, "0");
  return template.replace("YYYY", year.toString()).replace("MM", month).replace("DD", day).replace("HH", hour).replace("mm", minute).replace("ss", second);
};