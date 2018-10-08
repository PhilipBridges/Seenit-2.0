// comments-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const comments = new Schema(
    {
      text: { type: String, required: true },
      author: { type: Schema.Types.ObjectId, required: true },
      upvotes: { type: Number, required: true, default: 0 },
      voters: [{ type: Schema.Types.ObjectId, ref: "User" }],
      postId: { type: Schema.Types.ObjectId, ref: "posts", required: true }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model("comments", comments);
};
