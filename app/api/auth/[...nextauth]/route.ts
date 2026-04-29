// NextAuth tüm auth isteklerini buradan yönetir
// /api/auth/signin, /api/auth/signout, /api/auth/session vb.

import { handlers } from "@/auth";

export const { GET, POST } = handlers;
