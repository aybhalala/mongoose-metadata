# mongoose-metadata
Mongoose Metadata API Helpers

Install mongoose-metadata :
```
npm install --save mongoose-metadata
```

Work with mongoose model. On your api, create a route 'metadata' for a given model :
```javascript
// First of all, import the module
const path = require('path')
const Metadata = require('mongoose-metadata')

// Load Models
Metadata.loadModels(path.join(__dirname, './models'))

// Let's use a model pet
// We need to use the meta middleware : Metadata.meta('<modelName>')
app.get('/<modelName>/metadata', Metadata.meta('<Model>'))
```

## Filter

It is possible to filter fields by passing extra parameters to our meta method call.
```javascript
const path = require('path')
const Metadata = require('mongoose-metadata')

// Load Models
Metadata.loadModels(path.join(__dirname, './models'))

// Let's use a model pet
// We need to use the meta middleware : Metadata.meta('<modelName>')
app.get('/<modelName>/meta_edit', Metadata.meta('<Model>', {
  filter: ['username', 'password']
}))
```
