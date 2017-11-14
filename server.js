var PORT = 80;
var http = require('http');
var url=require('url');
var fs=require('fs');
var path=require('path');
var mine={
          "css": "text/css",
          "gif": "image/gif",
          "html": "text/html",
          "ico": "image/x-icon",
          "jpeg": "image/jpeg",
          "jpg": "image/jpeg",
          "js": "text/javascript",
          "json": "application/json",
          "pdf": "application/pdf",
          "png": "image/png",
          "svg": "image/svg+xml",
          "swf": "application/x-shockwave-flash",
          "tiff": "image/tiff",
          "txt": "text/plain",
          "wav": "audio/x-wav",
          "wma": "audio/x-ms-wma",
          "wmv": "video/x-ms-wmv",
          "xml": "text/xml"
        };
var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
		console.log(pathname)

	if(pathname.slice(-1)==="/"){
		
        pathname=pathname+"index.html"; //默认取当前默认下的index.html
	//	console.log()
    }
	

    var realPath = path.join("./", pathname);
    console.log(realPath);
    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
	console.log(ext)
    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
                } else {
                    var contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
				
                    response.write(file);
                    response.end();
                }
            });
        }
    });
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");