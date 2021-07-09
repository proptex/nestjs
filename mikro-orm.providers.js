"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMikroOrmRepositoryProviders = exports.createAsyncProviders = exports.createMikroOrmAsyncOptionsProvider = exports.createMikroOrmEntityManagerProvider = exports.createMikroOrmProvider = void 0;
const mikro_orm_common_1 = require("./mikro-orm.common");
const core_1 = require("@mikro-orm/core");
const common_1 = require("@nestjs/common");
exports.createMikroOrmProvider = () => ({
    provide: core_1.MikroORM,
    useFactory: async (options) => {
        if (options === null || options === void 0 ? void 0 : options.autoLoadEntities) {
            options.entities = [...(options.entities || []), ...mikro_orm_common_1.REGISTERED_ENTITIES.values()];
            options.entitiesTs = [...(options.entitiesTs || []), ...mikro_orm_common_1.REGISTERED_ENTITIES.values()];
            delete options.autoLoadEntities;
        }
        mikro_orm_common_1.REGISTERED_ENTITIES.clear();
        if (!options || Object.keys(options).length === 0) {
            const config = await core_1.ConfigurationLoader.getConfiguration();
            config.set('logger', mikro_orm_common_1.logger.log.bind(mikro_orm_common_1.logger));
            options = config;
        }
        return core_1.MikroORM.init(options);
    },
    inject: [mikro_orm_common_1.MIKRO_ORM_MODULE_OPTIONS],
});
exports.createMikroOrmEntityManagerProvider = (scope = common_1.Scope.DEFAULT, alias) => ({
    provide: alias !== null && alias !== void 0 ? alias : core_1.EntityManager,
    scope,
    useFactory: (orm) => scope === common_1.Scope.DEFAULT ? orm.em : orm.em.fork(),
    inject: [core_1.MikroORM],
});
exports.createMikroOrmAsyncOptionsProvider = (options) => {
    var _a;
    if (options.useFactory) {
        return {
            provide: mikro_orm_common_1.MIKRO_ORM_MODULE_OPTIONS,
            useFactory: options.useFactory,
            inject: options.inject || [],
        };
    }
    const inject = [];
    if (options.useClass || options.useExisting) {
        inject.push((_a = options.useClass) !== null && _a !== void 0 ? _a : options.useExisting);
    }
    return {
        provide: mikro_orm_common_1.MIKRO_ORM_MODULE_OPTIONS,
        useFactory: async (optionsFactory) => await optionsFactory.createMikroOrmOptions(),
        inject,
    };
};
exports.createAsyncProviders = (options) => {
    if (options.useExisting || options.useFactory) {
        return [exports.createMikroOrmAsyncOptionsProvider(options)];
    }
    if (options.useClass) {
        return [
            exports.createMikroOrmAsyncOptionsProvider(options),
            { provide: options.useClass, useClass: options.useClass },
        ];
    }
    throw new Error('Invalid MikroORM async options: one of `useClass`, `useExisting` or `useFactory` should be defined.');
};
exports.createMikroOrmRepositoryProviders = (entities) => {
    return (entities || []).map(entity => ({
        provide: mikro_orm_common_1.getRepositoryToken(entity),
        useFactory: (em) => em.getRepository(entity),
        inject: [core_1.EntityManager],
    }));
};
