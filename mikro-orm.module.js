"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MikroOrmModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MikroOrmModule = void 0;
const core_1 = require("@mikro-orm/core");
const common_1 = require("@nestjs/common");
const mikro_orm_providers_1 = require("./mikro-orm.providers");
const mikro_orm_core_module_1 = require("./mikro-orm-core.module");
const mikro_orm_common_1 = require("./mikro-orm.common");
let MikroOrmModule = MikroOrmModule_1 = class MikroOrmModule {
    static forRoot(options) {
        return {
            module: MikroOrmModule_1,
            imports: [mikro_orm_core_module_1.MikroOrmCoreModule.forRoot(options)],
        };
    }
    static forRootAsync(options) {
        return {
            module: MikroOrmModule_1,
            imports: [mikro_orm_core_module_1.MikroOrmCoreModule.forRootAsync(options)],
        };
    }
    static forFeature(options) {
        const entities = Array.isArray(options) ? options : (options.entities || []);
        const providers = mikro_orm_providers_1.createMikroOrmRepositoryProviders(entities);
        for (const e of entities) {
            if (!core_1.Utils.isString(e)) {
                mikro_orm_common_1.REGISTERED_ENTITIES.add(e);
            }
        }
        return {
            module: MikroOrmModule_1,
            providers: [...providers],
            exports: [...providers],
        };
    }
};
MikroOrmModule = MikroOrmModule_1 = __decorate([
    common_1.Module({})
], MikroOrmModule);
exports.MikroOrmModule = MikroOrmModule;
