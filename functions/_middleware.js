export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname.replace("/", "").replace("/", "");

  const map = {
    // Presell
    "yuo": "/presell/presell.html",

    // LEAD 1
    "klm": "/front/lead1/vsl-27.html",
    "nop": "/front/lead1/vsl-37.html",
    "ntg": "/front/lead1/vsl-47.html",

    // LEAD 2
    "efg": "/front/lead2/vsl-27.html",
    "hij": "/front/lead2/vsl-37.html",
    "bvc": "/front/lead2/vsl-47.html",

    // LEAD 3
    "yza": "/front/lead3/vsl-27.html",
    "bcd": "/front/lead3/vsl-37.html",
    "fas": "/front/lead3/vsl-47.html",

    // LEAD 4
    "hgx": "/front/lead4/vsl-27.html",
    "jjg": "/front/lead4/vsl-37.html",
    "ewq": "/front/lead4/vsl-47.html"
  };

  // Se encontrou o slug → redireciona
  if (map[path]) {
    return Response.redirect(map[path], 301);
  }

  // Senão → segue normal
  return context.next();
}
