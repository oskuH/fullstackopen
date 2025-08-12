const app = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');

const PORT = config.PORT !== undefined
  ? config.PORT
  : 3000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
