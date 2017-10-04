/**
* Mongoose Metadata Helpers
*
* Copyright(c) 2017 Alexandre PENOMBRE
* <aluzed_AT_gmail.com>
*/
'use strict';
const mongoose = require('mongoose');
const requireWalk = require('require-walk');
const fs = require('fs');

module.exports = {
  // Load all mongoose model in this path
  loadModels: (givenPath) => {
    if(fs.lstatSync(givenPath).isDirectory()) {
      requireWalk(givenPath)();
    }
    else {
      throw new Error('Error, unable to resolve path');
    }
  },
  // Generate the meta response from a request
  meta: (modelName, options) => {
    return (req, res) => {
      let model = mongoose.model(modelName);

      if(typeof options === "undefined")
        options = {};

      let tmpSchema = model.schema.paths;

      // Filter the fields
      if(!!options.filter) {
        for(let field in options.filter) {
          delete tmpSchema[options.filter[field]];
        }
      }

      return res.send(tmpSchema);
    }
  }
}
