import express from 'express';
const app = express();
const PORT = process.env.PORT || 3500;
app.get("/api", (req, res) => {
    res.status(200).json({
        success: 1,
        message: "This rest api is working."
    });
});
app.listen(PORT, ()=>{
    console.log(`Listening to port: ${PORT}`);
});