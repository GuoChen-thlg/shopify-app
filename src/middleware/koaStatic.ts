import path from 'path'
import koaStatic from 'koa-static'
export default koaStatic(path.join(__dirname, '../../assets'))
