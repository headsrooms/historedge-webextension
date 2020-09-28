function registerHistory(payload, apiUrl = "http://127.0.0.1/history/") {
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(payload),
  })
}

let myPort = browser.runtime.connect({name:"port-from-cs"});
myPort.postMessage({greeting: "hello from content script"});

myPort.onMessage.addListener(function(history) {
  console.log(`History length: ${history.length}`)
  const payload = {
    user_id: "a9558f3d-ec25-42a5-9735-f9c5242860fe",
    items: history,
  };
  registerHistory(payload).then((response) => {
    console.log(response);
    return response;
  }, function(err) {
    console.error("Failed!", err);
  })
});