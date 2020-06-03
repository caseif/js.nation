let Shaders = new function() {

    function loadExternal(path) {
        let ajaxRes = null;
        let ajaxErr = null;

        $.ajax({
            method: "GET",
            contentType: "text/plain",
            dataType: "text",
            async: false,
            url: path,
            success: response => {
                ajaxRes = response;
            },
            error: (jqxhr, status) => {
                ajaxErr = status;
            }
        });

        if (ajaxErr) {
            throw ajaxErr;
        }

        return ajaxRes;
    }

    this.particlesVertShader = loadExternal("./shaders/particles.vert");

    this.particlesFragShader = loadExternal("./shaders/particles.frag");

}