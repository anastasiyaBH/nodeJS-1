import dotenv from 'dotenv';
import path from 'path';

const dotenvConfig = dotenv.config({ path: path.resolve(__dirname, '../../.env') });

if (dotenvConfig.error) {
    throw dotenvConfig.error;
}
