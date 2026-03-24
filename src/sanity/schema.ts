import type { SchemaTypeDefinition } from "sanity";
import { coreSchemas } from "./modules/core";
import { eventsSchemas } from "./modules/events";
import { faqSchemas } from "./modules/faq";
import { catalogSchemas } from "./modules/catalog";

/**
 * Module registry — toggle per client.
 * "core" is always included. Add or remove modules as needed.
 */
const MODULE_SCHEMAS: Record<string, SchemaTypeDefinition[]> = {
  events: eventsSchemas,
  faq: faqSchemas,
  catalog: catalogSchemas,
};

/** Which optional modules are enabled for this project */
const ENABLED_MODULES: string[] = ["events", "faq", "catalog"];

function buildSchema(
  enabledModules: string[],
): { types: SchemaTypeDefinition[] } {
  const types: SchemaTypeDefinition[] = [...coreSchemas];

  for (const mod of enabledModules) {
    const schemas = MODULE_SCHEMAS[mod];
    if (schemas) types.push(...schemas);
  }

  return { types };
}

export const schema = buildSchema(ENABLED_MODULES);
