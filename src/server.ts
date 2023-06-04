import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errrorLogger } from './shared/logger'
async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('database connected')
    app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    errrorLogger.error('faield to connect db', error)
  }
}
main()
