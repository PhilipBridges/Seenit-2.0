// messages-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const messages = new Schema(
    {
      author: { type: Schema.Types.ObjectId, ref: "User" },
      target: { type: Schema.Types.ObjectId, ref: "User", required: true },
      targetName: { type: String, required: true },
      text: { type: String, required: true }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model("messages", messages);
};
