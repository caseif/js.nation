let Transform = new function() {

    this.transform = function(spectrum) {
        let subArr = spectrum.slice(Config.startBin, Config.startBin + Config.keepBins);
        subArr = savitskyGolaySmooth(subArr);
        return subArr;
    }

    this.multiplier = function(spectrum) {
        let sum = 0;
        let len = spectrum.length;
        for (let i = 0; i < len; i++) {
            sum += spectrum[i];
        }
        let intermediate = sum / Config.keepBins / 256;
        let transformer = 1.2;
        return (1 / (transformer - 1)) * (-Math.pow(intermediate, transformer) + transformer * intermediate);
    }

    // I'm not convinced this is a Savitsky-Golay smooth. I'm not sure what it is actually.
    let savitskyGolaySmooth = function(array) {
        let lastArray = array;
        let newArr = [];
        for (let pass = 0; pass < Config.smoothingPasses; pass++) {
            let sidePoints = Math.floor(Config.smoothingPoints / 2); // our window is centered so this is both nL and nR
            let cn = 1 / (2 * sidePoints + 1); // constant
            for (let i = 0; i < sidePoints; i++) {
                newArr[i] = lastArray[i];
                newArr[lastArray.length - i - 1] = lastArray[lastArray.length - i - 1];
            }
            for (let i = sidePoints; i < lastArray.length - sidePoints; i++) {
                let sum = 0;
                for (let n = -sidePoints; n <= sidePoints; n++) {
                    sum += cn * lastArray[i + n] + n;
                }
                newArr[i] = sum;
            }
            lastArray = newArr;
        }
        return newArr;
    }

}
