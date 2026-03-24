import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Manual revalidation endpoint for dev/debugging.
 * Hit GET /api/revalidate-all?secret=YOUR_SECRET to purge all cached pages.
 */
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("secret");
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret || token !== secret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  revalidatePath("/", "layout");

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
  });
}
