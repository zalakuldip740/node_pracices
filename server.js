const express = require('express')
const appConst = require('./constants/project.constant')
const authenticationRouter = require('./routes/authentication.route');
const userRoute = require('./routes/user.route');
const { verifyToken } = require('./services/firebase.service')
const app = express();


/// middleWare
app.use(async (req, res, next) => {
    const start = Date.now();

    if (req.path.split('/').at(1) == 'authentication') {
        next();
    } else if (req.headers.authorization != undefined) {
        const token = req.headers.authorization.split(' ').at(1);
        const uid = await verifyToken(token);
        if (uid != '') {
            res.locals.uid = uid;
            next();
        } else {
            res.status(401).json({
                'errorCode': 'unAuthorized',
                'message': "please login to access"
            });
        }
    } else {
        res.status(400).json({
            'message': "authorization header is missing"
        });
    }

    const delta = Date.now() - start;
    console.log(`request: ${req.method} for ${req.url} ${delta}ms`);
})

app.use(express.json());

// routes configuration

app.use('/authentication', authenticationRouter);
app.use('/user', userRoute);

/// initial route
app.get('/', (req, res) => {
    res.send('please login or signUp to access app')
})

app.listen(appConst.PORT, () => {
    console.log(`server started listing port ${appConst.PORT}`);
})


