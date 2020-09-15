async function getActiveTab() {
  return browser.tabs.query({
    active: true,
    currentWindow: true
  });
}


async function getVisits(start = 0, end = new Date()) {

  let history = await browser.history.search({
    text: "",
    startTime: start,
    endTime: end,
    maxResults: 1000000
  });
  console.log(`History length: ${history.length}`)
  return history;
}

function processVisit(visits, tabs) {
  browser.tabs.sendMessage(tabs[0].id, visits);
}

function setSaved(value) {
  browser.storage.sync.set({
    'saved': value
  }, function () {
    if (value) {
      console.log('History saved!');
    }
  });
}

async function listVisits() {
  let tabs = await getActiveTab();
  browser.storage.sync.get(['saved'], function (items) {
    if (!items["saved"]) {
      getVisits()
        .then((response) => {
          processVisit(response, tabs);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });
}

setSaved(false);
browser.tabs.onUpdated.addListener(listVisits);