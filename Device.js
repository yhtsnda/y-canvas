function getResolution() {
    return SizeMake(document.documentElement.offsetWidth, document.documentElement.body);
}
function device() {
    return {
        resolution : getResolution()
    }
};
var Device = singleton(device);
