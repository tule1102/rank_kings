"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
const port = validateEnv_1.default.PORT;
// app.use(express.static(path.join(__dirname, '../../frontend/dist')));
// app.get('*', (_req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
// });
mongoose_1.default.connect(validateEnv_1.default.MONGO_CONNECTION_STRING)
    .then(() => {
    console.log("Mongoose connected");
    app_1.default.listen(port, () => {
        console.log("Server running on port: " + port);
    });
})
    .catch(console.error);
