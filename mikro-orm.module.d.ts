import { AnyEntity, EntityName } from '@mikro-orm/core';
import { DynamicModule } from '@nestjs/common';
import { MikroOrmModuleAsyncOptions, MikroOrmModuleSyncOptions } from './typings';
export declare class MikroOrmModule {
    static forRoot(options?: MikroOrmModuleSyncOptions): DynamicModule;
    static forRootAsync(options: MikroOrmModuleAsyncOptions): DynamicModule;
    static forFeature(options: EntityName<AnyEntity>[] | {
        entities?: EntityName<AnyEntity>[];
    }): DynamicModule;
}
