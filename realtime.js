function registerVisitPage(page, apiUrl = 'http://127.0.0.1/pages/') {
  fetch(apiUrl, {
      method: 'POST', // or 'PUT'
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(page),
    })
    .then(response => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


function getNowString() {
  let visitedAt = new Date().toISOString()

  if (visitedAt.includes("Z")) {
    visitedAt = visitedAt.slice(0, -1);
  } else if (visitedAt.includes("+")) {
    visitedAt = visitedAt.split("+")[0];
  }

  return visitedAt;
}


function main() {
  const body = new XMLSerializer().serializeToString(document)

  const page = {
    user_id: '46ea1909-1c0b-439d-baa6-5f72d6328b8a',
    title: document.title,
    url: document.URL,
    content: body,
    visited_at: getNowString()
  };

  registerVisitPage(page);
}


main()