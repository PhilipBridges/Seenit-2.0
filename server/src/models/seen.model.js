// seen-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const seen = new Schema(
    {
      name: { type: String, required: true, unique: true },
      description: { type: String, required: true },
      owner: { type: Schema.Types.ObjectId, ref: "User", required: true }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model("seen", seen);
};
