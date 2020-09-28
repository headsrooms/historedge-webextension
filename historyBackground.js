
let portFromCS;

function connected(p) {
  portFromCS = p;
}

browser.runtime.onConnect.addListener(connected);

browser.browserAction.onClicked.addListener(function() {
  browser.history.search({
    text: "",
    startTime: 0,
    endTime:  new Date(),
    maxResults: 1000000
  }).then((history) => {
    portFromCS.postMessage(history);
  });
});