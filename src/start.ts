import makeConnector from "petit_nodejs_publipost_connector";
import PPTXTemplate from "./template";

// Main wrapped for asyncness
const main = () => {
    const port = Number(process.argv[2]);
    if (isNaN(port) || port > 65535) {
        throw new Error(`invalid port ${port}`)
    }
    const app = makeConnector(PPTXTemplate);
    app.listen(port, () => {
        console.log(`App started on port ${port}`);
    })
};

main();


