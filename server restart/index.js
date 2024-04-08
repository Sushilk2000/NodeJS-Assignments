async function restartServer() {
  const restart = await fetch(
    "https://api.render.com/v1/services/srv-co9i53djm4es73avovcg/restart",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer rnd_0je2K7yuwyCzQfEwZxnWiwiB14jq",
      },
    }
  );
  if (restart) {
    console.log("Server restarted at", Date.now());
  }
}

setInterval(() => {
  restartServer();
}, 600000);
