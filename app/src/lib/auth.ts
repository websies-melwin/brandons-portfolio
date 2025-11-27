// Admin email whitelist
const ADMIN_EMAILS = [
  "melwin@websies.co",
  "brandon.bui04@gmail.com",
];

export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
