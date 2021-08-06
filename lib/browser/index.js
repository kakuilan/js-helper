/**
 * 将文件转为base64
 * @param {File} f 文件对象
 * @returns {Promise<string | ArrayBuffer>}
 */
function fileToBase64(f) {
    return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let res;
        reader.readAsDataURL(f);
        reader.onload = function () {
            res = reader.result;
        };
        reader.onerror = function (error) {
            reject(error);
        };
        reader.onloadend = function () {
            resolve(res);
        };
    });
}

/**
 * 将图片转为base64,并压缩
 * @param {File} file 图片文件对象
 * @param {number} [resize=1] 缩放比例0-1
 * @param {number} [encoderOptions=0.8] canvas转图片时，图片质量比例0-1
 * @return {*}  {Promise<string>} 返回图片base64字符串
 */
function imgToBase64(file, resize = 1, encoderOptions = 0.8) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        var reader = new FileReader();
        reader.onload = function () {
            img.src = reader.result;
            img.onload = function () {
                let canvas = document.createElement("canvas");
                let context = canvas.getContext("2d");
                context.scale(resize, resize);
                canvas.width = img.width * resize;
                canvas.height = img.height * resize;
                //缩小画布，毕竟手机拍下来的图片都是几千像素乘几千像素的大小
                context.drawImage(img, 0, 0, img.width * resize, img.height * resize);
                //canvas生成后通过toDataURL获取canvas 处理后的其base64码，并自定义其画质，此处是0.5
                const imgBase64 = canvas.toDataURL(file.type, encoderOptions);
                resolve(imgBase64);
            };
        };
        reader.onerror = function (error) {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
}
