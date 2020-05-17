var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * File Upload Model
 * ===========
 * A database model for uploading images to the local file system
 */

exports.storage = function (uploadFolder) {
  var fileStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
      path: keystone.expandPath('./public/uploads/' + uploadFolder), // required; path where the files should be stored
      publicPath: '/public/uploads' + uploadFolder, // path where files will be served
    }
  });

  return fileStorage;
}