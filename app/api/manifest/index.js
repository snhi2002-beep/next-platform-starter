export const runtime = "nodejs";

const REAL_MPD =
  "https://your-real-domain.com/path/manifest.mpd";

export async function GET() {
  try {
    const response = await fetch(REAL_MPD, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": REAL_MPD,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return new Response("Upstream error", { status: 500 });
    }

    let mpdText = await response.text();

    // Fix BaseURL if needed
    const base = REAL_MPD.substring(
      0,
      REAL_MPD.lastIndexOf("/") + 1
    );

    mpdText = mpdText.replace(
      /<BaseURL>(.*?)<\/BaseURL>/g,
      `<BaseURL>${base}</BaseURL>`
    );

    return new Response(mpdText, {
      status: 200,
      headers: {
        "Content-Type": "application/dash+xml",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response("Manifest Error", { status: 500 });
  }
}
