var Debugger = window.console || {
    debug : function () {},
    info : function () {},
    warn : function () {},
    assert : function () {},
    error : function (msg) {
        throw new Error(msg);
    }
};
