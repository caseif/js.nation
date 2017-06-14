let Spectrum = new function() {

    const maxBufferSize = Math.max.apply(null, Config.delays);

    let spectrumCache = Array();

    let jqWindow;

    this.setUp = function() {
        Callbacks.addCallback(drawCallback, Priority.EARLY);
        jqWindow = $(window);
    }

    let drawCallback = function(spectrum, multiplier) {
        if (!Config.drawSpectrum) {
            return;
        }

        if (spectrumCache.length >= maxBufferSize) {
            spectrumCache.shift();
        }
        spectrumCache.push(spectrum);

        let curRad = Emblem.calcRadius(multiplier);

        for (let s = Config.spectrumCount - 1; s >= 0; s--) {
            let curSpectrum = smooth(spectrumCache[Math.max(spectrumCache.length - Config.delays[s] - 1, 0)],
                    Config.smoothMargins[s]);

            let points = [];

            Canvas.context.fillStyle = Config.colors[s];
            Canvas.context.shadowColor = Config.colors[s];

            let len = curSpectrum.length;
            for (let i = 0; i < len; i++) {
                t = Math.PI * (i / (len - 1)) - MathConstants.HALF_PI;
                r = curRad + Math.pow(curSpectrum[i] * Config.spectrumHeightScalar * Util.getResolutionMultiplier(),
                        Config.exponents[s]);
                x = r * Math.cos(t);
                y = r * Math.sin(t);
                points.push({x: x, y: y});
            }

            drawPoints(points);
        }
    }

    let drawPoints = function(points) {
        if (points.length == 0) {
            return;
        }

        Canvas.context.beginPath();

        let halfWidth = jqWindow.width() / 2;
        let halfHeight = jqWindow.height() / 2;

        for (let neg = 0; neg <= 1; neg++) {
            let xMult = neg ? -1 : 1;

            Canvas.context.moveTo(halfWidth, points[0].y + halfHeight);

            let len = points.length;
            for (let i = 1; i < len - 2; i++) {
                let c = xMult * (points[i].x + points[i + 1].x) / 2 + halfWidth;
                let d = (points[i].y + points[i + 1].y) / 2 + halfHeight;
                Canvas.context.quadraticCurveTo(xMult * points[i].x + halfWidth, points[i].y + halfHeight, c, d);
            }
            Canvas.context.quadraticCurveTo(xMult * points[len - 2].x + halfWidth + neg * 2,
                    points[len - 2].y + halfHeight, xMult * points[len - 1].x + halfWidth,
                    points[len - 1].y + halfHeight);
        }
        Canvas.context.fill();
    }

    let smooth = function(points, margin) {
        if (margin == 0) {
            return points;
        }

        let newArr = Array();
        for (let i = 0; i < points.length; i++) {
            let sum = 0;
            let denom = 0;
            for (let j = 0; j <= margin; j++) {
                if (i - j < 0 || i + j > points.length - 1) {
                    break;
                }
                sum += points[i - j] + points[i + j];
                denom += (margin - j + 1) * 2;
            }
            newArr[i] = sum / denom;
        }
        return newArr;
    }

}
