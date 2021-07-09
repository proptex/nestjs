import { AnyEntity, EntityName } from '@mikro-orm/core';
import { Logger } from '@nestjs/common';
export declare const MIKRO_ORM_MODULE_OPTIONS: unique symbol;
export declare const REGISTERED_ENTITIES: Set<EntityName<AnyEntity<any>>>;
export declare const logger: Logger;
export declare const getRepositoryToken: <T>(entity: EntityName<T>) => string;
export declare const InjectRepository: <T>(entity: EntityName<T>) => (target: object, key: string | symbol, index?: number | undefined) => void;
export declare function UseRequestContext(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
