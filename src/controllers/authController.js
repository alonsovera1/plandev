const admin = require('../config/firebase');

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().createUser({ email, password });
    res.status(201).json({ uid: userRecord.uid, email: userRecord.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser };
