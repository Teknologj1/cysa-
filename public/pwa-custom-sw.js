/* Importado dentro do service worker gerado pelo next-pwa.
   Ajustes de ciclo de vida e cache específicos do CySA+ Prep. */

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

/* Pagamento, sessão e autenticação sempre vão à rede: cache aqui produziria
   estado de acesso desatualizado. */
const SEMPRE_NA_REDE = [
  "/api/checkout",
  "/api/stripe",
  "/api/sessao",
  "/api/portal",
  "/auth/",
  "/entrar",
];

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (SEMPRE_NA_REDE.some((prefixo) => url.pathname.startsWith(prefixo))) {
    event.respondWith(fetch(event.request));
  }
});

/* Notificações de estudo (opt-in). O envio depende de backend com Web Push. */
self.addEventListener("push", (event) => {
  if (!event.data) return;
  let dados = {};
  try {
    dados = event.data.json();
  } catch {
    dados = { title: "CySA+ Prep", body: event.data.text() };
  }

  event.waitUntil(
    self.registration.showNotification(dados.title || "CySA+ Prep", {
      body: dados.body || "Hora de estudar para o CS0-003.",
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
      data: { url: dados.url || "/curso" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const destino = event.notification.data?.url || "/curso";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((janelas) => {
      for (const janela of janelas) {
        if (janela.url.includes(destino) && "focus" in janela) return janela.focus();
      }
      return self.clients.openWindow(destino);
    })
  );
});
