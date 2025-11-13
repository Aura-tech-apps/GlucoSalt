export async function onRequest(context) {
  const url = new URL(context.request.url);
  return fetch(new URL("/presell/presell.html", url).toString(), context.request);
}
