import { DynamicModule, MiddlewareConsumer, OnApplicationShutdown } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { MikroOrmModuleAsyncOptions, MikroOrmModuleOptions, MikroOrmModuleSyncOptions } from './typings';
export declare class MikroOrmCoreModule implements OnApplicationShutdown {
    private readonly options;
    private readonly moduleRef;
    constructor(options: MikroOrmModuleOptions, moduleRef: ModuleRef);
    static forRoot(options?: MikroOrmModuleSyncOptions): DynamicModule;
    static forRootAsync(options: MikroOrmModuleAsyncOptions): DynamicModule;
    onApplicationShutdown(): Promise<void>;
    configure(consumer: MiddlewareConsumer): void;
}
