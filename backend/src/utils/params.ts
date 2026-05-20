/** Express may type dynamic segments as string | string[] */
export function segment(param: string | string[] | undefined): string {
  if (param === undefined) return "";
  return Array.isArray(param) ? String(param[0]) : String(param);
}
