const app=require('./app.js');
const http=require('http');
const server=http.createServer(app);

server.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`)
});
