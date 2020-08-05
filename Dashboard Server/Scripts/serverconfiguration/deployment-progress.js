var timeoutFunction;
$(document).ready(function () {
    $('#circle').circleProgress({
        value: 0,
        size: 400,
        fill: "#0970FF",
        startAngle: Math.PI * 1.5,
        thickness: 8,
        lineCap: 'round',
        emptyThickness: 2,
        emptyFill: "#E3E3E3",
        arcCoef: 1
    });
});

$.circleProgress.defaults.getEmptyThickness = function () {
    return typeof this.emptyThickness != 'undefined' ? this.emptyThickness : this.getThickness();
};

$.circleProgress.defaults.drawEmptyArc = function (v) {
    var ctx = this.ctx,
        r = this.radius,
        t = this.getThickness(),
        et = this.getEmptyThickness(),
        c = this.arcCoef,
        a = this.startAngle + (1 - c) * Math.PI;

    v = Math.max(0, Math.min(1, v));

    if (v < 1) {
        ctx.save();
        ctx.beginPath();

        if (v <= 0) {
            ctx.arc(r, r, r - t / 2, a, a + 2 * c * Math.PI);
        } else {
            if (!this.reverse) {
                ctx.arc(r, r, r - t / 2, a + 2 * c * Math.PI * v, a + 2 * c * Math.PI);
            } else {
                ctx.arc(r, r, r - t / 2, a, a + 2 * c * (1 - v) * Math.PI);
            }
        }

        ctx.lineWidth = et;
        ctx.lineCap = this.lineCap;
        ctx.strokeStyle = this.emptyFill;
        ctx.stroke();
        ctx.restore();
    }
};