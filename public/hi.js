export const runtime = "nodejs";

const REAL_MPD = "https://example.com/manifest.mpd";

export async function GET() {
  try {
    const response = await fetch(REAL_MPD, {
      cache: "no-store"
    });

    const text = await response.text();

    return new Response(text, {
      headers: {
        "Content-Type": "application/dash+xml"
      }
    });
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
}
