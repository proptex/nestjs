"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MikroOrmCoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MikroOrmCoreModule = void 0;
const core_1 = require("@mikro-orm/core");
const common_1 = require("@nestjs/common");
const core_2 = require("@nestjs/core");
const mikro_orm_common_1 = require("./mikro-orm.common");
const mikro_orm_middleware_1 = require("./mikro-orm.middleware");
const mikro_orm_providers_1 = require("./mikro-orm.providers");
let MikroOrmCoreModule = MikroOrmCoreModule_1 = class MikroOrmCoreModule {
    constructor(options, moduleRef) {
        this.options = options;
        this.moduleRef = moduleRef;
    }
    static forRoot(options) {
        return {
            module: MikroOrmCoreModule_1,
            providers: [
                { provide: mikro_orm_common_1.MIKRO_ORM_MODULE_OPTIONS, useValue: options || {} },
                mikro_orm_providers_1.createMikroOrmProvider(),
                mikro_orm_providers_1.createMikroOrmEntityManagerProvider(options === null || options === void 0 ? void 0 : options.scope),
                mikro_orm_providers_1.createMikroOrmEntityManagerProvider(options === null || options === void 0 ? void 0 : options.scope, 'SqlEntityManager'),
                mikro_orm_providers_1.createMikroOrmEntityManagerProvider(options === null || options === void 0 ? void 0 : options.scope, 'MongoEntityManager'),
            ],
            exports: [core_1.MikroORM, core_1.EntityManager, 'SqlEntityManager', 'MongoEntityManager'],
        };
    }
    static forRootAsync(options) {
        return {
            module: MikroOrmCoreModule_1,
            imports: options.imports || [],
            providers: [
                ...(options.providers || []),
                ...mikro_orm_providers_1.createAsyncProviders(options),
                mikro_orm_providers_1.createMikroOrmProvider(),
                mikro_orm_providers_1.createMikroOrmEntityManagerProvider(options.scope),
                mikro_orm_providers_1.createMikroOrmEntityManagerProvider(options.scope, 'SqlEntityManager'),
                mikro_orm_providers_1.createMikroOrmEntityManagerProvider(options.scope, 'MongoEntityManager'),
            ],
            exports: [core_1.MikroORM, core_1.EntityManager, 'SqlEntityManager', 'MongoEntityManager'],
        };
    }
    async onApplicationShutdown() {
        const orm = this.moduleRef.get(core_1.MikroORM);
        if (orm) {
            await orm.close();
        }
    }
    configure(consumer) {
        var _a;
        if (this.options.registerRequestContext === false) {
            return;
        }
        const isNestMiddleware = (consumer) => {
            return typeof consumer.httpAdapter === 'object';
        };
        const usingFastify = (consumer) => {
            return consumer.httpAdapter.constructor.name.toLowerCase().startsWith('fastify');
        };
        const forRoutesPath = (_a = this.options.forRoutesPath) !== null && _a !== void 0 ? _a : (isNestMiddleware(consumer) && usingFastify(consumer) ? '(.*)' : '*');
        consumer
            .apply(mikro_orm_middleware_1.MikroOrmMiddleware) // register request context automatically
            .forRoutes({ path: forRoutesPath, method: common_1.RequestMethod.ALL });
    }
};
MikroOrmCoreModule = MikroOrmCoreModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({}),
    __param(0, common_1.Inject(mikro_orm_common_1.MIKRO_ORM_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [Object, core_2.ModuleRef])
], MikroOrmCoreModule);
exports.MikroOrmCoreModule = MikroOrmCoreModule;
