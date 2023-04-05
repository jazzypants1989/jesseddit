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

	export const image: () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodString;
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

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
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

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
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
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
