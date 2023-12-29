declare module 'xss-clean' {
    // eslint-disable-next-line no-var
    var middleware: RequestHandler<RouteParameters<Route>>;
    export = middleware;
}
