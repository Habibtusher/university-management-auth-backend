'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const cors_1 = __importDefault(require('cors'));
const globalErrorHandler_1 = __importDefault(
  require('./app/middlewares/globalErrorHandler')
);
const routes_1 = __importDefault(require('./app/routes'));
const cookie_parser_1 = __importDefault(require('cookie-parser'));
// import ApiError from './errors/ApiError'
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World!');
// });
app.use(globalErrorHandler_1.default);
// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.status(httpStatus.NOT_FOUND).json({
//     success: false,
//     message: 'API Not Found message!',
//     errorMessages: [
//       {
//         path: req.originalUrl,
//         message: 'API Not Found!',
//       },
//     ],
//   });
//   next();
// });
// eslint-disable-next-line no-console
console.log('req.originalUrl');
//!application routes
app.use('/api/v1', routes_1.default);
exports.default = app;
