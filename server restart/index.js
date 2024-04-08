const express = require("express");
const fetch = require("node-fetch");
const app = express();

async function restartServer() {
  try {
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
  } catch (error) {
    console.error("Error restarting server:", error);
  }
}

setInterval(() => {
  restartServer();
}, 600000);

// Use the PORT environment variable provided by Render.com
const PORT = 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
