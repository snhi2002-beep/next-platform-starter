export default async function handler(req, res) {
  const REAL_MPD =
    "https://origin-cdn.com/path/to/manifest.mpd";

  try {
    const response = await fetch(REAL_MPD, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const mpdText = await response.text();

    res.setHeader("Content-Type", "application/dash+xml");
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.status(200).send(mpdText);

  } catch (err) {
    res.status(500).send("Manifest Error");
  }
}
