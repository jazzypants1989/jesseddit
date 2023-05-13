declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]];

	// TODO: Remove this when having this fallback is no longer relevant. 2.3? 3.0? - erika, 2023-04-04
	/**
	 * @deprecated
	 * `astro:content` no longer provide `image()`.
	 *
	 * Please use it through `schema`, like such:
	 * ```ts
	 * import { defineCollection, z } from "astro:content";
	 *
	 * defineCollection({
	 *   schema: ({ image }) =>
	 *     z.object({
	 *       image: image(),
	 *     }),
	 * });
	 * ```
	 */
	export const image: never;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S | ((context: SchemaContext) => S);
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	const entryMap: {
		"articles": {
"client-side-routing/1-introduction.mdx": {
  id: "client-side-routing/1-introduction.mdx",
  slug: "client-side-routing/1-introduction",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"client-side-routing/10-the-skeleton.mdx": {
  id: "client-side-routing/10-the-skeleton.mdx",
  slug: "client-side-routing/10-the-skeleton",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"client-side-routing/11-router-link-and-routes.mdx": {
  id: "client-side-routing/11-router-link-and-routes.mdx",
  slug: "client-side-routing/11-router-link-and-routes",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"client-side-routing/12-nested-and-dynamic-routes.mdx": {
  id: "client-side-routing/12-nested-and-dynamic-routes.mdx",
  slug: "client-side-routing/12-nested-and-dynamic-routes",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"client-side-routing/13-cart-and-theme-storage.mdx": {
  id: "client-side-routing/13-cart-and-theme-storage.mdx",
  slug: "client-side-routing/13-cart-and-theme-storage",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"client-side-routing/14-adding-reactive-search.mdx": {
  id: "client-side-routing/14-adding-reactive-search.mdx",
  slug: "client-side-routing/14-adding-reactive-search",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"client-side-routing/15-conclusion.mdx": {
  id: "client-side-routing/15-conclusion.mdx",
  slug: "client-side-routing/15-conclusion",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"client-side-routing/2-a-brief-history-of-client-side-routing.mdx": {
  id: "client-side-routing/2-a-brief-history-of-client-side-routing.mdx",
  slug: "client-side-routing/2-a-brief-history-of-client-side-routing",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"client-side-routing/3-getting-started-setting-up-a-server.mdx": {
  id: "client-side-routing/3-getting-started-setting-up-a-server.mdx",
  slug: "client-side-routing/3-getting-started-setting-up-a-server",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"client-side-routing/4-state-management.mdx": {
  id: "client-side-routing/4-state-management.mdx",
  slug: "client-side-routing/4-state-management",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"client-side-routing/5-the-window-object.mdx": {
  id: "client-side-routing/5-the-window-object.mdx",
  slug: "client-side-routing/5-the-window-object",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"client-side-routing/6-the-location-api-and-parameters.mdx": {
  id: "client-side-routing/6-the-location-api-and-parameters.mdx",
  slug: "client-side-routing/6-the-location-api-and-parameters",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"client-side-routing/7-the-history-api.mdx": {
  id: "client-side-routing/7-the-history-api.mdx",
  slug: "client-side-routing/7-the-history-api",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"client-side-routing/8-the-web-storage-api.mdx": {
  id: "client-side-routing/8-the-web-storage-api.mdx",
  slug: "client-side-routing/8-the-web-storage-api",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"client-side-routing/9-planning-our-app.mdx": {
  id: "client-side-routing/9-planning-our-app.mdx",
  slug: "client-side-routing/9-planning-our-app",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"into-the-future/1-introduction.mdx": {
  id: "into-the-future/1-introduction.mdx",
  slug: "into-the-future/1-introduction",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"into-the-future/2-separation-of-concerns.mdx": {
  id: "into-the-future/2-separation-of-concerns.mdx",
  slug: "into-the-future/2-separation-of-concerns",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"into-the-future/3-ecmascript-modules.mdx": {
  id: "into-the-future/3-ecmascript-modules.mdx",
  slug: "into-the-future/3-ecmascript-modules",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"into-the-future/4-navigation-api.mdx": {
  id: "into-the-future/4-navigation-api.mdx",
  slug: "into-the-future/4-navigation-api",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"into-the-future/5-view-transitions-api.mdx": {
  id: "into-the-future/5-view-transitions-api.mdx",
  slug: "into-the-future/5-view-transitions-api",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"into-the-future/6-typescript.mdx": {
  id: "into-the-future/6-typescript.mdx",
  slug: "into-the-future/6-typescript",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"into-the-future/7-bundling-and-import-maps.mdx": {
  id: "into-the-future/7-bundling-and-import-maps.mdx",
  slug: "into-the-future/7-bundling-and-import-maps",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"into-the-future/8-deno-and-astro.mdx": {
  id: "into-the-future/8-deno-and-astro.mdx",
  slug: "into-the-future/8-deno-and-astro",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"into-the-future/9-conclusion-and-other-features.mdx": {
  id: "into-the-future/9-conclusion-and-other-features.mdx",
  slug: "into-the-future/9-conclusion-and-other-features",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
"react/1-introduction.mdx": {
  id: "react/1-introduction.mdx",
  slug: "react/1-introduction",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] },
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
