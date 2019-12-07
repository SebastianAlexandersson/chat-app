if ("function" === typeof importScripts) {
  importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js");
  // Global workbox
  if (workbox) {
  
    console.log("Workbox is loaded");
    // Disable logging
    workbox.setConfig({ debug: false });
    //`generateSW` and `generateSWString` provide the option
    // to force update an exiting service worker.
    // Since we're using `injectManifest` to build SW,
    // manually overriding the skipWaiting();
    self.addEventListener("install", event => {
      self.skipWaiting();
      window.location.reload();
    });
    // Manual injection point for manifest files.
    // All assets under build/ and 5MB sizes are precached.
    workbox.precaching.precacheAndRoute([
  {
    "url": "icons/favicon-16x16.png",
    "revision": "d53b9a0328904e54717b1e4251f2a37e"
  },
  {
    "url": "icons/favicon-24x24.png",
    "revision": "6c08e04d175456715620bec5000dae67"
  },
  {
    "url": "icons/favicon-32x32.png",
    "revision": "a42ab5fa43d602e0db12afdeab6f4d5b"
  },
  {
    "url": "index.html",
    "revision": "6b0abfd183b6a94387f6ebf23111b965"
  },
  {
    "url": "precache-manifest.6f9045f8eec799a467ef70c1c8a8c4f1.js",
    "revision": "6f9045f8eec799a467ef70c1c8a8c4f1"
  },
  {
    "url": "service-worker.js",
    "revision": "845364d3360acbf118c747eecabf23c4"
  },
  {
    "url": "static/js/2.5c4812be.chunk.js",
    "revision": "0fa2b18a602e01745ce29069509f9bb4"
  },
  {
    "url": "static/js/main.f5e11161.chunk.js",
    "revision": "88829c85d89fe95d13bafbc879b36c4e"
  },
  {
    "url": "static/js/runtime-main.e27f25c8.js",
    "revision": "6c39c1227bb65068502c96f0a7789ae7"
  }
]);
    // Font caching
    workbox.routing.registerRoute(
      new RegExp("https://fonts.(?:.googlepis|gstatic).com/(.*)"),
      workbox.strategies.cacheFirst({
        cacheName: "googleapis",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 30
          })
        ]
      })
    );
    // Image caching
    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg)$/,
      workbox.strategies.cacheFirst({
        cacheName: "images",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
          })
        ]
      })
    );
    // JS, CSS caching
    workbox.routing.registerRoute(
      /\.(?:js|css)$/,
      workbox.strategies.staleWhileRevalidate({
        cacheName: "static-resources",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 20 * 24 * 60 * 60 // 20 Days
          })
        ]
      })
    );  
  
  } else {
  
    console.error("Workbox could not be loaded. No offline support");
  
  }
}