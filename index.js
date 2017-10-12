/**
* Mongoose Metadata Helpers
*
* Copyright(c) 2017 Alexandre PENOMBRE
* <aluzed_AT_gmail.com>
*/
'use strict';
const requireWalk = require('require-walk');
const fs = require('fs');

module.exports = (mongooseObject) => {

  return {
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
        let model = mongooseObject.model(modelName);

        if(typeof options === "undefined")
        options = {};

        let tmpSchema = Object.assign({}, model.schema.paths);

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
}
