self.addEventListener("push", function (event) {
  const data = event.data?.text() ?? "";

  event.waitUntil(
    self.registration.showNotification("Be Human", {
      body: data,
    })
  );
});
