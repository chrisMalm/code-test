// serverless function som Vercel plockar upp automatiskt
module.exports = async (req, res) => {
  console.log("✅ /api/test hit!"); // logga varje gång route nås
  console.log("Request headers:", req.headers);
  console.log("Request method:", req.method);

  res.status(200).json({ message: "Test route works!" });
};
