export function getCurrentWindow() {
    return fin.desktop.Window.getCurrent();
}

export function getCurrentWindowName() {
    return getCurrentWindow().name;
}

export function ready(cb) {
    fin.desktop.main(cb);
}

export function openUrlWithBrowser(url) {
    fin.desktop.System.openUrlWithBrowser(url);
}

export function resizeTo(...args) {
    return getCurrentWindow().resizeTo(...args);
}

export function updateOptions(...args) {
    return getCurrentWindow().updateOptions(...args);
}
