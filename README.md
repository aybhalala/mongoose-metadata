# mongoose-metadata
Mongoose Metadata API Helpers

Work with mongoose model. On your api, create a route 'metadata' for a given model :
```javascript
// First of all, import the module
const path = require('path')
const Metadata = require('/path/to/metadata.js')

// Load Models
Metadata.loadModels(path.join(__dirname, './models'))

// Let's use a model pet
// We need to use the meta middleware : Metadata.meta('<modelName>')
app.get('/<modelName>/metadata', Metadata.meta('<Model>'))
```
