# mongoose-metadata
Mongoose Metadata API Helpers

Forked from https://github.com/aluzed/mongoose-metadata

Install mongoose-metadata :
```
npm install --save mongoose-metadata
```

## Model Options

In the mongoose model :
```javascript
let petSchema = new Schema({
  name        : {type: String, required: true, placeholder: "Name of the animal"},
  kind        : {
    type: String,
    enum: ['Lion', 'Cat', 'Dog', 'Rabbit', 'Bird', 'Duck'],
    placeholder: "Type of animal" // Placeholder
  },
  description : {
    type: String,
    placeholder: "Enter the description",
    forceField: "textarea" // Force generation of a textarea instead of a input type text
  }
  weight      : {type: Number},
  vaccined    : {type: Boolean},
  created_at  : {type: Date, default: Date.now},
  updated_at  : {type: Date}
})

module.exports = mongoose.model('Pet', petSchema)
```

### List of field types

* Text
```javascript
// In mongoose model
let petSchema = new Schema({
  name : {  
    type: String,
    required: true,
    placeholder: "Nom de l'animal"
  }
})
```

* Email
```javascript
// In mongoose model
let petSchema = new Schema({
  name : {  
    type: String,
    required: true,
    placeholder: "Nom de l'animal",
    forceField: "email"
  }
})
```

* Numeric
```javascript
// In mongoose model
let petSchema = new Schema({
  weight : { type: Number }
})
```

* type: Boolean, checkbox
```javascript
// In mongoose model
let petSchema = new Schema({
  weight : { type: Number }
})
```

* Enum : displays select input as default
```javascript
// In mongoose model
let petSchema = new Schema({
  kind : {
    type: String,
    enum: ['Lion', 'Cat', 'Dog', 'Rabbit', 'Bird', 'Duck'],
    placeholder: "Type"
  }
})
```

* Textarea
```javascript
// In mongoose model
let petSchema = new Schema({
  description : {
    type: String,
    forceField: "textarea"
  }
})
```

* Radio
```javascript
// In mongoose model
let petSchema = new Schema({
  kind : {
    type: String,
    enum: ['Lion', 'Cat', 'Dog', 'Rabbit', 'Bird', 'Duck'],
    placeholder: "Type",
    forceField: "radio"
  }
})
```

* Foreign Key
```javascript
//TODO
```


## Create Forms

Work with mongoose model. On your api, create a route 'metadata' for a given model :
```javascript
// In your routes.js
const path = require('path');
const _MMetadata = require('mongoose-metadata');
const Metadata = _MMetadata(mongoose);


// Load Models
Metadata.loadModels(path.join(__dirname, './models'));

// Let's use a model pet
// We need to use the meta middleware : Metadata.meta('<modelName>')
app.get('/<modelName>/meta_add', Metadata.meta('<Model>'));
```

### Filter fields

```javascript
// First of all, import the module
const path = require('path');
const _MMetadata = require('mongoose-metadata');
const Metadata = _MMetadata(mongoose);

// Load Models
Metadata.loadModels(path.join(__dirname, './models'))

// Here, we remove the name field from the meta so it will not be rendered
// So, for those fields, you would not get a form input client side.
app.get('/<modelName>/meta_edit', Metadata.meta('<Model>', {
  filter: ['name']
}));
```
