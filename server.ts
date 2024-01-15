import {
  serveDir,
  serveFile,
} from "https://deno.land/std@0.207.0/http/file_server.ts";

const handler = async (req: Request) => {
  const pathname = new URL(req.url).pathname;
  console.log("Pathname", pathname);
  try {
    // GET method
    if (req.method.toLowerCase() === "get") {
      if (pathname === "/") {
        return serveFile(req, "./static/index.html");
      } else if (pathname === "/404.html") {
        return serveFile(req, "./static/404.html");
      } else if (pathname.includes(".js") || pathname.includes(".css")) {
        return serveDir(req, {
          fsRoot: "static",
          urlRoot: "",
        });
      } else {
        return serveFile(req, `./static/404.html`);
      }
    }
  } catch (e) {
    console.error(`ERROR: ${e.message}`, e);
    return await Promise.resolve(
      new Response(
        "Internal server error: " + e.message,
        { status: 500 },
      ),
    );
  }

  return serveFile(req, `./static/404.html`);
};

Deno.serve({ port: 8080 }, handler);
