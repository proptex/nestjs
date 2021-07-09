import { AnyEntity, EntityName } from '@mikro-orm/core';
import { MikroOrmModuleAsyncOptions } from './typings';
import { Provider, Scope } from '@nestjs/common';
export declare const createMikroOrmProvider: () => Provider;
export declare const createMikroOrmEntityManagerProvider: (scope?: Scope, alias?: string | undefined) => Provider;
export declare const createMikroOrmAsyncOptionsProvider: (options: MikroOrmModuleAsyncOptions) => Provider;
export declare const createAsyncProviders: (options: MikroOrmModuleAsyncOptions) => Provider[];
export declare const createMikroOrmRepositoryProviders: (entities: EntityName<AnyEntity>[]) => Provider[];
