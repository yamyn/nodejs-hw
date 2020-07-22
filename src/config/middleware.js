const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

module.exports = {
    /**
     * @function
     * @description express middleware
     * @param {express.Application} app
     * @returns void
     */
    init(app) {
        app.use(morgan('combined'));
        app.use(
            bodyParser.urlencoded({
                extended: false,
            }),
        );
        app.use(bodyParser.json());
        app.use(compression());
        app.use(helmet());
        app.use(cors());
        app.use((req, res, next) => {
            res.header(
                'Access-Control-Allow-Methods',
                'GET, POST, PUT, DELETE, OPTIONS ',
            );
            res.header('Access-Control-Allow-Credentials', '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With,' +
                ' Content-Type, Accept,' +
                ' Authorization,' +
                ' Access-Control-Allow-Credentials',
            );
            next();
        });
    },
};
