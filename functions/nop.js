export async function onRequest(context) {
  const url = new URL(context.request.url);
  url.pathname = "/front/lead1/vsl-37.html";
  return fetch(url, context.request);
}
