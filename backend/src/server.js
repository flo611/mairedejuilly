"use strict";
const express = require('express');
const authRoutes = require('./routes/auth.route');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/api', authRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
