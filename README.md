# ServerUtilities

ServerUtilities is a module that provides an express like abstraction on top of Java's built in HTTP server methods

## Example

```js
import HTTPServer from "../ServerUtilities";
const server = new HTTPServer();

server.get("/", (req, res) => {
    res.status(200).send("Hello World")
})

server.listen(8080)
```
A more detailed example can be found in example.js

## License

ServerUtilities is licensed under the [GNU AGPL 3](https://www.gnu.org/licenses/agpl-3.0.en.html)

## Support, Suggestions, and Bugs

For support or to make suggestions/bug reports, join my [Discord](https://discord.gg/n2vFxYPkje). You can also ask for help in the #code-help channel of the ChatTriggers Discord. 
