/*
 * Guardião de backredirect: redireciona apenas em tentativa de saída via botão voltar.
 * Use data-backredirect no elemento <script> para indicar a URL alvo.
 */
(function () {
    if (window.__BACKREDIRECT_GUARD_ACTIVE__) {
        return;
    }

    var scriptElement = document.currentScript;
    if (!scriptElement) {
        return;
    }

    var redirectAttr = scriptElement.getAttribute('data-backredirect');
    if (!redirectAttr) {
        return;
    }

    var redirectUrl;
    try {
        redirectUrl = new URL(redirectAttr, window.location.href).href;
    } catch (error) {
        console.warn('Backredirect: URL de destino inválida.', error);
        return;
    }

    if (!window.history || !window.history.pushState) {
        console.warn('Backredirect: history API indisponível.');
        return;
    }

    window.__BACKREDIRECT_GUARD_ACTIVE__ = true;

    var guardToken = 'br-' + Math.random().toString(36).slice(2);
    var initialHistoryState = window.history.state;
    var SUPPRESS_DURATION = 800;
    var suppressRedirect = false;
    var suppressTimeoutId = null;
    var guardArmed = false;

    function armGuard() {
        try {
            window.history.replaceState({
                __backredirectGuard: true,
                __backredirectToken: guardToken,
                __backredirectOriginalState: initialHistoryState
            }, document.title, window.location.href);

            window.history.pushState({
                __backredirectDummy: true,
                __backredirectToken: guardToken
            }, document.title, window.location.href);

            guardArmed = true;
        } catch (error) {
            console.warn('Backredirect: não foi possível preparar o histórico.', error);
            window.__BACKREDIRECT_GUARD_ACTIVE__ = false;
            guardArmed = false;
        }
    }

    armGuard();
    if (!guardArmed) {
        return;
    }

    function scheduleSuppressReset() {
        if (suppressTimeoutId) {
            clearTimeout(suppressTimeoutId);
        }

        suppressTimeoutId = window.setTimeout(function () {
            suppressRedirect = false;
            suppressTimeoutId = null;
        }, SUPPRESS_DURATION);
    }

    function preventNextRedirect() {
        suppressRedirect = true;
        scheduleSuppressReset();
    }

    function handlePopstate(event) {
        var state = event.state || {};

        if (!state.__backredirectToken || state.__backredirectToken !== guardToken) {
            return;
        }

        if (suppressRedirect) {
            suppressRedirect = false;
            armGuard();
            return;
        }

        window.location.replace(redirectUrl);
    }

    window.addEventListener('popstate', handlePopstate);

    document.addEventListener('click', function (event) {
        var anchor = event.target.closest('a');
        if (anchor) {
            if (anchor.hasAttribute('data-ignore-backredirect')) {
                preventNextRedirect();
                return;
            }

            var href = anchor.getAttribute('href');
            if (!href) {
                return;
            }

            if (href.indexOf('#') === 0 || href.toLowerCase().indexOf('javascript:') === 0) {
                preventNextRedirect();
                return;
            }

            if (anchor.target && anchor.target.toLowerCase() === '_blank') {
                preventNextRedirect();
                return;
            }

            var targetUrl;
            try {
                targetUrl = new URL(anchor.href, window.location.href);
            } catch (error) {
                return;
            }

            if (targetUrl.origin === window.location.origin) {
                preventNextRedirect();
            }

            return;
        }

        var ignoreTarget = event.target.closest('[data-ignore-backredirect]');
        if (ignoreTarget) {
            preventNextRedirect();
        }
    }, true);

    document.addEventListener('submit', function () {
        preventNextRedirect();
    }, true);

    window.addEventListener('beforeunload', function () {
        suppressRedirect = true;
    });
})();

