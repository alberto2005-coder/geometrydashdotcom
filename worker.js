let levelID = null;
let levelString = null;
let songID = null;

// Determine base URL relative to this service worker script
const baseUrl = self.location.href.substring(0, self.location.href.lastIndexOf('/') + 1);

self.addEventListener('message', event => {
  if (event.data.levelId !== undefined) {
    levelID = event.data.levelId;
    levelString = null;
  }
  if (event.data.levelString !== undefined) {
    levelString = event.data.levelString;
    songID = event.data.songID;
    levelID = null;
  }
});

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // Claim all clients immediately so the service worker controls the page on the first load
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);  
  
  // Extract parameters from referrer as the primary source of truth (resilient to SW restarts)
  let refLevelId = levelID;
  let refLevelString = levelString;
  let refSongId = songID;

  if (event.request.referrer) {
    try {
      const refUrl = new URL(event.request.referrer);
      const params = refUrl.searchParams;
      
      const idParam = params.get('id');
      if (idParam !== null) {
        refLevelId = Number(idParam);
        refLevelString = null;
      }
      
      const strParam = params.get('string');
      if (strParam !== null) {
        refLevelString = strParam;
        refLevelId = null;
        const songParam = params.get('songID');
        refSongId = songParam ? Number(songParam) : 500476;
      }
    } catch (e) {
      console.error("Error parsing referrer URL in service worker:", e);
    }
  }

  // Intercept level string requests (Custom/Imported levels)
  if (refLevelId == null && refLevelString !== null) {
    if (url.pathname.includes("1.txt")) {
      event.respondWith(new Response(refLevelString, {
        headers: { "Content-Type": "text/plain" },
      }));
      return;
    }

    if (url.pathname.includes("StereoMadness.mp3")) {
      event.respondWith(
        fetch(`https://fetchsongid.lasokar.workers.dev?id=${refSongId}`)
      );
      return;
    }
  }
  
  // Intercept official levels (negative IDs)
  if (refLevelId !== null && refLevelId < 0) {
    if (url.pathname.includes("1.txt")) {
      const fileUrl = new URL(`game/assets/levels/${refLevelId}.txt`, baseUrl).href;
      event.respondWith(
        fetch(fileUrl)
      );
      return;
    }

    if (url.pathname.includes("StereoMadness.mp3")) {
      const musicUrl = new URL(`game/assets/music/${refLevelId}.mp3`, baseUrl).href;
      event.respondWith(
        fetch(musicUrl)
      );
      return;
    }
  }
  
  // Intercept online custom levels (positive IDs)
  if (refLevelId !== null && refLevelId >= 0) {
    if (url.pathname.includes("1.txt")) {
      event.respondWith(handleLevelRequest(refLevelId));
      return;
    }

    if (url.pathname.includes("StereoMadness.mp3")) {
      event.respondWith(
        fetch(`https://getlevelsong.lasokar.workers.dev?id=${refLevelId}`)
      );
      return;
    }
  }
});

async function handleLevelRequest(targetLevelId) {
  try {
    const res = await fetch(
      `https://getleveldata.lasokar.workers.dev?id=${targetLevelId}`
    );
    
    const data = await res.json();

    if (data.error) {
      self.clients.matchAll().then((clients) => {
        for (const client of clients) {
          client.postMessage({ type: data.error === "rate-limit" ? "rate-limit" : "invalid-id" });
        }
      });
      return new Response("-1");
    }

    self.clients.matchAll().then((clients) => {
      for (const client of clients) {
        client.postMessage({ 
          type: "set-level-name", 
          name: data["name"] 
        });
      }
    });

    return new Response(data["data"]);
  } catch (err) {
    console.error("Error fetching online level data:", err);
    return new Response("-1");
  }
}
