export async function onRequest(context) {
  const url = new URL(context.request.url);
  return fetch(new URL("/front/lead1/vsl-27.html", url).toString(), context.request);
}
