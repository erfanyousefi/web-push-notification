console.log("Loaded service worker!");

self.addEventListener("push", (ev) => {
  const data = ev.data.json();
  console.log("Got push", data);
  data.title = "Codenight Notification";
  self.registration.showNotification(data.title, {
    body: "Hello, World!",
    icon: "https://codenight.ir/assets/images/codenightBanner.png",
  });
});
