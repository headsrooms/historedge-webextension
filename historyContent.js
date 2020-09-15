function registerHistory(payload, apiUrl = "http://127.0.0.1/history/") {
  fetch(apiUrl, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}

function setSaved(value) {
  browser.storage.sync.set(
    {
      saved: value,
    },
    function () {}
  );
}

browser.runtime.onMessage.addListener((history) => {
  setSaved(true);
  const payload = {
    user_id: "60971fa3-b750-417d-825b-27354b2fe49c",
    items: history,
  };
  registerHistory(payload);
  return Promise.resolve();
});
