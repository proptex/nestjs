"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseRequestContext = exports.InjectRepository = exports.getRepositoryToken = exports.logger = exports.REGISTERED_ENTITIES = exports.MIKRO_ORM_MODULE_OPTIONS = void 0;
const core_1 = require("@mikro-orm/core");
const common_1 = require("@nestjs/common");
exports.MIKRO_ORM_MODULE_OPTIONS = Symbol('mikro-orm-module-options');
exports.REGISTERED_ENTITIES = new Set();
exports.logger = new common_1.Logger(core_1.MikroORM.name);
exports.getRepositoryToken = (entity) => `${core_1.Utils.className(entity)}Repository`;
exports.InjectRepository = (entity) => common_1.Inject(exports.getRepositoryToken(entity));
function UseRequestContext() {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const context = this;
            if (!(context.orm instanceof core_1.MikroORM)) {
                throw new Error('@UseRequestContext() decorator can only be applied to methods of classes that carry `orm: MikroORM`');
            }
            let result;
            await core_1.RequestContext.createAsync(context.orm.em, async () => {
                result = await originalMethod.apply(context, args);
            });
            return result;
        };
        return descriptor;
    };
}
exports.UseRequestContext = UseRequestContext;
