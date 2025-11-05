import { signOut } from "@/lib/auth/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await signOut();
}
