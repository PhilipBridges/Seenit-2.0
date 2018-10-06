// posts-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const posts = new Schema(
    {
      title: { type: String, required: true },
      text: { type: String, required: true },
      author: { type: Schema.Types.ObjectId, ref: "User", required: true },
      seenId: { type: Schema.Types.ObjectId, ref: "seen", required: true },
      upvotes: { type: Number, required: true, default: 0 },
      voters: [{ type: Schema.Types.ObjectId, ref: "User" }]
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model("posts", posts);
};
