export async function onRequest(context) {
  return context.env.ASSETS.fetch("/front/lead1/vsl-37.html", context.request);
}
