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

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

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
				import('astro/zod').ZodLiteral<'svg'>,
				import('astro/zod').ZodLiteral<'avif'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"articles": {
"client-side-routing/1-introduction.mdx": {
	id: "client-side-routing/1-introduction.mdx";
  slug: "client-side-routing/1-introduction";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"client-side-routing/10-the-skeleton.mdx": {
	id: "client-side-routing/10-the-skeleton.mdx";
  slug: "client-side-routing/10-the-skeleton";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"client-side-routing/11-router-link-and-routes.mdx": {
	id: "client-side-routing/11-router-link-and-routes.mdx";
  slug: "client-side-routing/11-router-link-and-routes";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"client-side-routing/12-nested-and-dynamic-routes.mdx": {
	id: "client-side-routing/12-nested-and-dynamic-routes.mdx";
  slug: "client-side-routing/12-nested-and-dynamic-routes";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"client-side-routing/13-cart-and-theme-storage.mdx": {
	id: "client-side-routing/13-cart-and-theme-storage.mdx";
  slug: "client-side-routing/13-cart-and-theme-storage";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"client-side-routing/14-adding-reactive-search.mdx": {
	id: "client-side-routing/14-adding-reactive-search.mdx";
  slug: "client-side-routing/14-adding-reactive-search";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"client-side-routing/15-conclusion.mdx": {
	id: "client-side-routing/15-conclusion.mdx";
  slug: "client-side-routing/15-conclusion";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"client-side-routing/2-a-brief-history-of-client-side-routing.mdx": {
	id: "client-side-routing/2-a-brief-history-of-client-side-routing.mdx";
  slug: "client-side-routing/2-a-brief-history-of-client-side-routing";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"client-side-routing/3-getting-started-setting-up-a-server.mdx": {
	id: "client-side-routing/3-getting-started-setting-up-a-server.mdx";
  slug: "client-side-routing/3-getting-started-setting-up-a-server";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"client-side-routing/4-state-management.mdx": {
	id: "client-side-routing/4-state-management.mdx";
  slug: "client-side-routing/4-state-management";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"client-side-routing/5-the-window-object.mdx": {
	id: "client-side-routing/5-the-window-object.mdx";
  slug: "client-side-routing/5-the-window-object";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"client-side-routing/6-the-location-api-and-parameters.mdx": {
	id: "client-side-routing/6-the-location-api-and-parameters.mdx";
  slug: "client-side-routing/6-the-location-api-and-parameters";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"client-side-routing/7-the-history-api.mdx": {
	id: "client-side-routing/7-the-history-api.mdx";
  slug: "client-side-routing/7-the-history-api";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"client-side-routing/8-the-web-storage-api.mdx": {
	id: "client-side-routing/8-the-web-storage-api.mdx";
  slug: "client-side-routing/8-the-web-storage-api";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"client-side-routing/9-planning-our-app.mdx": {
	id: "client-side-routing/9-planning-our-app.mdx";
  slug: "client-side-routing/9-planning-our-app";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"into-the-future/1-introduction.mdx": {
	id: "into-the-future/1-introduction.mdx";
  slug: "into-the-future/1-introduction";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"into-the-future/2-separation-of-concerns.mdx": {
	id: "into-the-future/2-separation-of-concerns.mdx";
  slug: "into-the-future/2-separation-of-concerns";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"into-the-future/3-ecmascript-modules.mdx": {
	id: "into-the-future/3-ecmascript-modules.mdx";
  slug: "into-the-future/3-ecmascript-modules";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"into-the-future/4-navigation-api.mdx": {
	id: "into-the-future/4-navigation-api.mdx";
  slug: "into-the-future/4-navigation-api";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"into-the-future/5-view-transitions-api.mdx": {
	id: "into-the-future/5-view-transitions-api.mdx";
  slug: "into-the-future/5-view-transitions-api";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"into-the-future/6-typescript.mdx": {
	id: "into-the-future/6-typescript.mdx";
  slug: "into-the-future/6-typescript";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"into-the-future/7-bundling-and-import-maps.mdx": {
	id: "into-the-future/7-bundling-and-import-maps.mdx";
  slug: "into-the-future/7-bundling-and-import-maps";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"into-the-future/8-deno-and-astro.mdx": {
	id: "into-the-future/8-deno-and-astro.mdx";
  slug: "into-the-future/8-deno-and-astro";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"into-the-future/9-conclusion-and-other-features.mdx": {
	id: "into-the-future/9-conclusion-and-other-features.mdx";
  slug: "into-the-future/9-conclusion-and-other-features";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-rally/frontend-family-tree.mdx": {
	id: "react-rally/frontend-family-tree.mdx";
  slug: "react-rally/frontend-family-tree";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-rally/graphql-and-suspense.mdx": {
	id: "react-rally/graphql-and-suspense.mdx";
  slug: "react-rally/graphql-and-suspense";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-rally/opt-in-design.mdx": {
	id: "react-rally/opt-in-design.mdx";
  slug: "react-rally/opt-in-design";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-rally/p5js.mdx": {
	id: "react-rally/p5js.mdx";
  slug: "react-rally/p5js";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-rally/server-side-rendering.mdx": {
	id: "react-rally/server-side-rendering.mdx";
  slug: "react-rally/server-side-rendering";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-rally/shirley-wu.mdx": {
	id: "react-rally/shirley-wu.mdx";
  slug: "react-rally/shirley-wu";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-rally/webs-next-transition.mdx": {
	id: "react-rally/webs-next-transition.mdx";
  slug: "react-rally/webs-next-transition";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-rally/why-everyone-needs-a-framework.mdx": {
	id: "react-rally/why-everyone-needs-a-framework.mdx";
  slug: "react-rally/why-everyone-needs-a-framework";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-server-components/1-background.mdx": {
	id: "react-server-components/1-background.mdx";
  slug: "react-server-components/1-background";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-server-components/10-server-actions.mdx": {
	id: "react-server-components/10-server-actions.mdx";
  slug: "react-server-components/10-server-actions";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-server-components/11-simple-demos.mdx": {
	id: "react-server-components/11-simple-demos.mdx";
  slug: "react-server-components/11-simple-demos";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-server-components/12-waku-and-vite-rsc.mdx": {
	id: "react-server-components/12-waku-and-vite-rsc.mdx";
  slug: "react-server-components/12-waku-and-vite-rsc";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-server-components/13-nextjs.mdx": {
	id: "react-server-components/13-nextjs.mdx";
  slug: "react-server-components/13-nextjs";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-server-components/14-our-framework.mdx": {
	id: "react-server-components/14-our-framework.mdx";
  slug: "react-server-components/14-our-framework";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-server-components/15-conclusion.mdx": {
	id: "react-server-components/15-conclusion.mdx";
  slug: "react-server-components/15-conclusion";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-server-components/2-1-distributed-computing.mdx": {
	id: "react-server-components/2-1-distributed-computing.mdx";
  slug: "react-server-components/2-1-distributed-computing";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-server-components/2-2-RPCs.mdx": {
	id: "react-server-components/2-2-RPCs.mdx";
  slug: "react-server-components/2-2-rpcs";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-server-components/2-3-the-web.mdx": {
	id: "react-server-components/2-3-the-web.mdx";
  slug: "react-server-components/2-3-the-web";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-server-components/2-4-events.mdx": {
	id: "react-server-components/2-4-events.mdx";
  slug: "react-server-components/2-4-events";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-server-components/2-5-Web-Standards.mdx": {
	id: "react-server-components/2-5-Web-Standards.mdx";
  slug: "react-server-components/2-5-web-standards";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-server-components/2-6-Node.mdx": {
	id: "react-server-components/2-6-Node.mdx";
  slug: "react-server-components/2-6-node";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-server-components/2-7-Promises.mdx": {
	id: "react-server-components/2-7-Promises.mdx";
  slug: "react-server-components/2-7-promises";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-server-components/2-8-Fetch.mdx": {
	id: "react-server-components/2-8-Fetch.mdx";
  slug: "react-server-components/2-8-fetch";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-server-components/2-reviving-thenables.mdx": {
	id: "react-server-components/2-reviving-thenables.mdx";
  slug: "react-server-components/2-reviving-thenables";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-server-components/3-chunks.mdx": {
	id: "react-server-components/3-chunks.mdx";
  slug: "react-server-components/3-chunks";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-server-components/4-flight-request.mdx": {
	id: "react-server-components/4-flight-request.mdx";
  slug: "react-server-components/4-flight-request";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-server-components/5-flight-response.mdx": {
	id: "react-server-components/5-flight-response.mdx";
  slug: "react-server-components/5-flight-response";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-server-components/6-suspense-postpone-and-use.mdx": {
	id: "react-server-components/6-suspense-postpone-and-use.mdx";
  slug: "react-server-components/6-suspense-postpone-and-use";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-server-components/7-proxies-and-context.mdx": {
	id: "react-server-components/7-proxies-and-context.mdx";
  slug: "react-server-components/7-proxies-and-context";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-server-components/8-import-and-require.mdx": {
	id: "react-server-components/8-import-and-require.mdx";
  slug: "react-server-components/8-import-and-require";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react-server-components/9-client-components.mdx": {
	id: "react-server-components/9-client-components.mdx";
  slug: "react-server-components/9-client-components";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"react/1-introduction.mdx": {
	id: "react/1-introduction.mdx";
  slug: "react/1-introduction";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"silly-demos/intercept-route.mdx": {
	id: "silly-demos/intercept-route.mdx";
  slug: "silly-demos/intercept-route";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
