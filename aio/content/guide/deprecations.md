# Deprecated APIs and features

Angular strives to balance innovation and stability.
Sometimes, APIs and features become obsolete and need to be removed or replaced so that Angular can stay current with new best practices, changing dependencies, or changes in the (web) platform itself.

To make these transitions as easy as possible, we deprecate APIs and features for a period of time before removing them. This gives you time to update your apps to the latest APIs and best practices.

This guide contains a summary of all Angular APIs and features that are currently deprecated.


<div class="alert is-helpful">


Features and APIs that were deprecated in v6 or earlier are candidates for removal in version 9 or any later major version. For information about Angular's deprecation and removal practices, see [Angular Release Practices](guide/releases#deprecation-practices "Angular Release Practices: Deprecation practices").

For step-by-step instructions on how to update to the latest Angular release, use the interactive update guide at [update.angular.io](https://update.angular.io).

</div>


## Index

To help you future-proof your apps, the following table lists all deprecated APIs and features, organized by the release in which they are candidates for removal. Each item is linked to the section later in this guide that describes the deprecation reason and replacement options.

<!--
deprecation -> removal cheat sheet
v4 - v7
v5 - v8
v6 - v9
v7 - v10
v8 - v11
v9 - v12
-->


| Area                          | API or Feature                                                                | May be removed in |
| ----------------------------- | ---------------------------------------------------------------------------   | ----------------- |
| `@angular/bazel`              | [`Bazel builder and schematics`](#bazelbuilder)                               | v10 |
| `@angular/common`             | [`ReflectiveInjector`](#reflectiveinjector)                                   | <!--v8--> v11 |
| `@angular/common`             | [`CurrencyPipe` - `DEFAULT_CURRENCY_CODE`](api/common/CurrencyPipe#currency-code-deprecation) | <!--v9--> v11 |
| `@angular/core`               | [`CollectionChangeRecord`](#core)                                             | <!--v7--> v11 |
| `@angular/core`               | [`DefaultIterableDiffer`](#core)                                              | <!--v7--> v11 |
| `@angular/core`               | [`ReflectiveKey`](#core)                                                      | <!--v8--> v11 |
| `@angular/core`               | [`RenderComponentType`](#core)                                                | <!--v7--> v11 |
| `@angular/core`               | [`ViewEncapsulation.Native`](#core)                                           | <!--v6--> v11 |
| `@angular/core`               | [`WrappedValue`](#core)                                                       | <!--v10--> v12 |
| `@angular/forms`              | [`ngModel` with reactive forms](#ngmodel-reactive)                            | <!--v6--> v11 |
| `@angular/router`             | [`preserveQueryParams`](#router)                                              | <!--v7--> v11 |
| `@angular/upgrade`            | [`@angular/upgrade`](#upgrade)                                                | <!--v8--> v11 |
| `@angular/upgrade`            | [`getAngularLib`](#upgrade-static)                                            | <!--v8--> v11 |
| `@angular/upgrade`            | [`setAngularLib`](#upgrade-static)                                            | <!--v8--> v11 |
| `@angular/platform-webworker` | [All entry points](api/platform-webworker)                                    | <!--v8--> v11 |
| template syntax               | [`<template`>](#template-tag)                                                 | <!--v7--> v11 |
| polyfills                     | [reflect-metadata](#reflect-metadata)                                         | <!--v8--> v11 |
| npm package format            | [`esm5` and `fesm5` entry-points in @angular/* npm packages](guide/deprecations#esm5-fesm5) | <!-- v9 --> v11 |
| `@angular/core`               | [`defineInjectable`](#core)                                                   | <!--v8--> v11 |
| `@angular/core`               | [`entryComponents`](api/core/NgModule#entryComponents)                        | <!--v9--> v11 |
| `@angular/core`               | [`ANALYZE_FOR_ENTRY_COMPONENTS`](api/core/ANALYZE_FOR_ENTRY_COMPONENTS)       | <!--v9--> v11 |
| `@angular/router`             | [`loadChildren` string syntax](#loadChildren)                                 | <!--v9--> v11 |
| `@angular/core/testing`       | [`TestBed.get`](#testing)                                                     | <!--v9--> v12 |
| `@angular/router`             | [`ActivatedRoute` params and `queryParams` properties](#activatedroute-props) | unspecified |
| template syntax               | [`/deep/`, `>>>`, and `::ng-deep`](#deep-component-style-selector)            | <!--v7--> unspecified |
| browser support               | [`IE 9 and 10, IE mobile`](#ie-9-10-and-mobile)                               | <!--v10--> v11 |




## Deprecated APIs

This section contains a complete list all of the currently-deprecated APIs, with details to help you plan your migration to a replacement.


<div class="alert is-helpful">

Tip: In the [API reference section](api) of this doc site, deprecated APIs are indicated by ~~strikethrough.~~ You can filter the API list by [**Status: deprecated**](api?status=deprecated).

</div>

{@a common}
### @angular/common

| API                                                                                           | Replacement                                         | Deprecation announced | Notes |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------- | --------------------- | ----- |
| [`CurrencyPipe` - `DEFAULT_CURRENCY_CODE`](api/common/CurrencyPipe#currency-code-deprecation) | `{provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'}` | v9                    | From v11 the default code will be extracted from the locale data given by `LOCAL_ID`, rather than `USD`. |


{@a core}
### @angular/core

| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| [`CollectionChangeRecord`](api/core/CollectionChangeRecord) | [`IterableChangeRecord`](api/core/IterableChangeRecord) | v4 | none |
| [`DefaultIterableDiffer`](api/core/DefaultIterableDiffer) | n/a | v4 | Not part of public API. |
| [`ReflectiveInjector`](api/core/ReflectiveInjector) | [`Injector.create`](api/core/Injector#create)  | v5 | See [`ReflectiveInjector`](#reflectiveinjector) |
| [`ReflectiveKey`](api/core/ReflectiveKey) | none | v5 | none |
| [`ViewEncapsulation.Native`](api/core/ViewEncapsulation#Native) | [`ViewEncapsulation.ShadowDom`](api/core/ViewEncapsulation#ShadowDom) | v6 | Use the native encapsulation mechanism of the renderer. See [view.ts](https://github.com/angular/angular/blob/3e992e18ebf51d6036818f26c3d77b52d3ec48eb/packages/core/src/metadata/view.ts#L32).
| [`defineInjectable`](api/core/defineInjectable) | `ɵɵdefineInjectable` | v8 | Used only in generated code. No source code should depend on this API. |
| [`entryComponents`](api/core/NgModule#entryComponents) | none | v9 | See [`entryComponents`](#entryComponents) |
| [`ANALYZE_FOR_ENTRY_COMPONENTS`](api/core/ANALYZE_FOR_ENTRY_COMPONENTS) | none | v9 | See [`ANALYZE_FOR_ENTRY_COMPONENTS`](#entryComponents) |
| [`WrappedValue`](api/core/WrappedValue) | none | v10 | See [removing `WrappedValue`](#wrapped-value) |





{@a testing}
### @angular/core/testing

| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| [`TestBed.get`](api/core/testing/TestBed#get) | [`TestBed.inject`](api/core/testing/TestBed#inject) | v9 | Same behavior, but type safe. |


{@a forms}
### @angular/forms

| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| [`ngModel` with reactive forms](#ngmodel-reactive) | [`FormControlDirective`](api/forms/FormControlDirective) | v6 | none |

{@a router}
### @angular/router

| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| [`preserveQueryParams`](api/router/NavigationExtras#preserveQueryParams) | [`queryParamsHandling`](api/router/NavigationExtras#queryParamsHandling) | v4 | none |

{@a platform-webworker}
### @angular/platform-webworker

| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| [All entry points](api/platform-webworker) | none | v8 | See [platform-webworker](#webworker-apps). |

{@a platform-webworker-dynamic}
### @angular/platform-webworker-dynamic

| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| [All entry points](api/platform-webworker-dynamic) | none | v8 | See [platform-webworker](#webworker-apps). |

{@a upgrade}
### @angular/upgrade

| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| [All entry points](api/upgrade) | [`@angular/upgrade/static`](api/upgrade/static) | v5 | See [Upgrading from AngularJS](guide/upgrade). |

{@a upgrade-static}
### @angular/upgrade/static

| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| [`getAngularLib`](api/upgrade/static/getAngularLib) | [`getAngularJSGlobal`](api/upgrade/static/getAngularJSGlobal) | v5 | See [Upgrading from AngularJS](guide/upgrade). |
[`setAngularLib`](api/upgrade/static/setAngularLib) | [`setAngularJSGlobal`](api/upgrade/static/setAngularJSGlobal) | v5 | See [Upgrading from AngularJS](guide/upgrade). |



{@a deprecated-features}
## Deprecated features

This section lists all of the currently-deprecated features, which includes template syntax, configuration options, and any other deprecations not listed in the [Deprecated APIs](#deprecated-apis) section above. It also includes deprecated API usage scenarios or API combinations, to augment the information above.

{@a bazelbuilder}
### Bazel builder and schematics

Bazel builder and schematics were introduced in Angular Labs to let users try out Bazel without having to manage Bazel version and BUILD files.
This feature has been deprecated. For more information, please refer to the [migration doc](https://github.com/angular/angular/blob/master/packages/bazel/src/schematics/README.md).

{@a wtf}
### Web Tracing Framework integration

Angular previously has supported an integration with the [Web Tracing Framework (WTF)](https://google.github.io/tracing-framework/) for performance testing of Angular applications. This integration has not been maintained and defunct. As a result, the integration was deprecated in Angular version 8 and due to no evidence of any existing usage removed in version 9.


{@a deep-component-style-selector}
### `/deep/`, `>>>` and `:ng-deep` component style selectors

The shadow-dom-piercing descendant combinator is deprecated and support is being [removed from major browsers and tools](https://developers.google.com/web/updates/2017/10/remove-shadow-piercing). As such, in v4 we deprecated support in Angular for all 3 of `/deep/`, `>>>` and `::ng-deep`. Until removal, `::ng-deep` is preferred for broader compatibility with the tools.

For more information, see [/deep/, >>>, and ::ng-deep](guide/component-styles#deprecated-deep--and-ng-deep "Component Styles guide, Deprecated deep and ngdeep")
 in the Component Styles guide.


{@a template-tag}
### &lt;template&gt; tag

The `<template>` tag was deprecated in v4 to avoid colliding with the DOM's element of the same name (such as when using web components). Use `<ng-template>` instead. For more information, see the [Ahead-of-Time Compilation](guide/angular-compiler-options#enablelegacytemplate) guide.



{@a ngmodel-reactive}
### ngModel with reactive forms

Support for using the `ngModel` input property and `ngModelChange` event with reactive
form directives has been deprecated in Angular v6 and will be removed in a future version
of Angular.

Now deprecated:

```html
<input [formControl]="control" [(ngModel)]="value">
```

```ts
this.value = 'some value';
```

This has been deprecated for several reasons. First, developers have found this pattern
confusing. It seems like the actual `ngModel` directive is being used, but in fact it's
an input/output property named `ngModel` on the reactive form directive that
approximates some, but not all, of the directive's behavior.
It allows getting and setting a value and intercepting value events, but
some of `ngModel`'s other features, such as
delaying updates with`ngModelOptions` or exporting the directive, don't work.

In addition, this pattern mixes template-driven and reactive forms strategies, which
prevents taking advantage of the full benefits of either strategy.
Setting the value in the template violates the template-agnostic
principles behind reactive forms, whereas adding a `FormControl`/`FormGroup` layer in
the class removes the convenience of defining forms in the template.

To update your code before support is removed, you'll want to decide whether to stick
with reactive form directives (and get/set values using reactive forms patterns) or
switch over to template-driven directives.

After (choice 1 - use reactive forms):

```html
<input [formControl]="control">
```

```ts
this.control.setValue('some value');
```

After (choice 2 - use template-driven forms):

```html
<input [(ngModel)]="value">
```

```ts
this.value = 'some value';
```

By default, when you use this pattern, you will see a deprecation warning once in dev
mode. You can choose to silence this warning by providing a config for
`ReactiveFormsModule` at import time:

```ts
imports: [
  ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'});
]
```

Alternatively, you can choose to surface a separate warning for each instance of this
pattern with a config value of `"always"`. This may help to track down where in the code
the pattern is being used as the code is being updated.


{@a reflectiveinjector}
### ReflectiveInjector

In v5, Angular replaced the `ReflectiveInjector` with the `StaticInjector`. The injector no longer requires the Reflect polyfill, reducing application size for most developers.

Before:

```
ReflectiveInjector.resolveAndCreate(providers);
```

After:

```
Injector.create({providers});
```

{@a loadChildren}
### loadChildren string syntax

When Angular first introduced lazy routes, there wasn't browser support for dynamically loading additional JavaScript. Angular created our own scheme using the syntax `loadChildren: './lazy/lazy.module#LazyModule'` and built tooling to support it. Now that ECMAScript dynamic import is supported in many browsers, Angular is moving toward this new syntax.

In version 8, the string syntax for the [`loadChildren`](api/router/LoadChildren) route specification was deprecated, in favor of new syntax that uses `import()` syntax.

Before:

```
const routes: Routes = [{
  path: 'lazy',
  // The following string syntax for loadChildren is deprecated
  loadChildren: './lazy/lazy.module#LazyModule'
}];
```

After:

```
const routes: Routes = [{
  path: 'lazy',
  // The new import() syntax
  loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule)
}];
```


<div class="alert is-helpful">


**Version 8 update**: When you update to version 8, the [`ng update`](cli/update) command performs the transformation automatically. Prior to version 7, the `import()` syntax only works in JIT mode (with view engine).


</div>

<div class="alert is-helpful">

**Declaration syntax**: It's important to follow the route declaration syntax `loadChildren: () => import('...').then(m => m.ModuleName)` to allow `ngc` to discover the lazy-loaded module and the associated `NgModule`. You can find the complete list of allowed syntax constructs [here](https://github.com/angular/angular-cli/blob/a491b09800b493fe01301387fa9a025f7c7d4808/packages/ngtools/webpack/src/transformers/import_factory.ts#L104-L113). These restrictions will be relaxed with the release of Ivy since it'll no longer use `NgFactories`.

</div>



{@a activatedroute-props}

### ActivatedRoute params and queryParams properties

[ActivatedRoute](api/router/ActivatedRoute) contains two [properties](api/router/ActivatedRoute#properties) that are less capable than their replacements and may be deprecated in a future Angular version.

| Property | Replacement |
| -------- | ----------- |
| `params` | `paramMap` |
| `queryParams` | `queryParamMap` |

For more information see the [Getting route information](guide/router#activated-route) section of the [Router guide](guide/router).


{@a reflect-metadata}
### Dependency on a reflect-metadata polyfill in JIT mode
Angular applications, and specifically applications that relied on the JIT compiler, used to require a polyfill for the [reflect-metadata](https://github.com/rbuckton/reflect-metadata) APIs.

The need for this polyfill was removed in Angular version 8.0 ([see #14473](https://github.com/angular/angular-cli/pull/14473)), rendering the presence of the poylfill in most Angular applications unnecessary. Because the polyfill can be depended on by 3rd-party libraries, instead of removing it from all Angular projects, we are deprecating the requirement for this polyfill as of version 8.0. This should give library authors and application developers sufficient time to evaluate if they need the polyfill, and perform any refactoring necessary to remove the dependency on it.

In a typical Angular project, the polyfill is not used in production builds, so removing it should not impact production applications. The goal behind this removal is overall simplification of the build setup and decrease in the number of external dependencies.

{@a static-query-resolution}
### `@ViewChild()` / `@ContentChild()` static resolution as the default

See the [dedicated migration guide for static queries](guide/static-query-migration).

{@a contentchild-input-together}
### `@ContentChild()` / `@Input()` used together

The following pattern is deprecated:

```ts
@Input() @ContentChild(TemplateRef) tpl !: TemplateRef<any>;
```

Rather than using this pattern, separate the two decorators into their own
properties and add fallback logic as in the following example:

```ts
@Input() tpl !: TemplateRef<any>;
@ContentChild(TemplateRef) inlineTemplate !: TemplateRef<any>;
```
{@a cant-assign-template-vars}
### Cannot assign to template variables

In the following example, the two-way binding means that `optionName`
should be written when the `valueChange` event fires.

```html
<option *ngFor="let optionName of options" [(value)]="optionName"></option>
```

However, in practice, Angular simply ignores two-way bindings to template variables. Starting in version 8, attempting to write to template variables is deprecated. In a future version, we will throw to indicate that the write is not supported.

```html
<option *ngFor="let optionName of options" [value]="optionName"></option>
```



{@a binding-to-innertext}
### Binding to `innerText` in `platform-server`

[Domino](https://github.com/fgnass/domino), which is used in server-side rendering, doesn't support `innerText`, so in platform-server's "domino adapter", there was special code to fall back to `textContent` if you tried to bind to `innerText`.

These two properties have subtle differences, so switching to `textContent` under the hood can be surprising to users. For this reason, we are deprecating this behavior. Going forward, users should explicitly bind to `textContent` when using Domino.

{@a wtf-apis}
### `wtfStartTimeRange` and all `wtf*` APIs

All of the `wtf*` APIs are deprecated and will be removed in a future version.

{@a webworker-apps}
### Running Angular applications in platform-webworker

The `@angular/platform-*` packages enable Angular to be run in different contexts. For examples,
`@angular/platform-server` enables Angular to be run on the server, and `@angular/platform-browser`
enables Angular to be run in a web browser.

`@angular/platform-webworker` was introduced in Angular version 2 as an experiment in leveraging
Angular's rendering architecture to run an entire web application in a
[web worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API). We've learned a lot
from this experiment and have come to the conclusion that running the entire application in a web
worker is not the best strategy for most applications.

Going forward, we will focus our efforts related to web workers around their primary use case of
offloading CPU-intensive, non-critical work needed for initial rendering (such as in-memory search
and image processing). Learn more in the
[guide to Using Web Workers with the Angular CLI](guide/web-worker).

As of Angular version 8, all  `platform-webworker` APIs are deprecated.
This includes both packages: `@angular/platform-webworker` and
`@angular/platform-webworker-dynamic`.

{@a entryComponents}
### `entryComponents` and `ANALYZE_FOR_ENTRY_COMPONENTS` no longer required
Previously, the `entryComponents` array in the `NgModule` definition was used to tell the compiler which components would be created and inserted dynamically. With Ivy, this isn't a requirement anymore and the `entryComponents` array can be removed from existing module declarations. The same applies to the `ANALYZE_FOR_ENTRY_COMPONENTS` injection token.

{@a moduleWithProviders}
### `ModuleWithProviders` type without a generic

Some Angular libraries, such as `@angular/router` and `@ngrx/store`, implement APIs that return a type called `ModuleWithProviders` (typically via a method named `forRoot()`).
This type represents an `NgModule` along with additional providers.
Angular version 9 deprecates use of `ModuleWithProviders` without an explicitly generic type, where the generic type refers to the type of the `NgModule`.
In a future version of Angular, the generic will no longer be optional.


If you're using the CLI, `ng update` should [migrate your code automatically](guide/migration-module-with-providers).
If you're not using the CLI, you can add any missing generic types to your application manually.
For example:

**Before**
```ts
@NgModule({...})
export class MyModule {
  static forRoot(config: SomeConfig): ModuleWithProviders {
    return {
      ngModule: SomeModule,
      providers: [
        {provide: SomeConfig, useValue: config}
      ]
    };
  }
}
```

**After**

```ts
@NgModule({...})
export class MyModule {
  static forRoot(config: SomeConfig): ModuleWithProviders<SomeModule> {
    return {
      ngModule: SomeModule,
      providers: [
        {provide: SomeConfig, useValue: config }
      ]
    };
  }
}
```


{@a ie-9-10-and-mobile}
### IE 9, 10, and IE mobile support

Support for IE 9 and 10 has been deprecated, as well as support for IE Mobile. These will be dropped in a future version.
Supporting outdated browsers like these increases bundle size, code complexity, and test load, and also requires time and effort that could be spent on improvements to the framework.
For example, fixing issues can be more difficult, as a straightforward fix for modern browsers could break old ones that have quirks due to not receiving updates from vendors.

The final decision was made on three key points:
* __Vendor support__: Microsoft dropped support of IE 9 and 10 on 1/12/16, meaning they no longer provide security updates or technical support. Additionally, Microsoft dropped support for Windows 10 Mobile in December 2019.
* __Usage statistics__: We looked at usage trends for IE 9 and 10 (as well as IE Mobile) from various sources and all indicated that usage percentages were extremely small (fractions of 1%).
* __Feedback from partners__: We also reached out to some of our Angular customers and none expressed concern about dropping IE 9, 10, nor IE Mobile support.


{@a wrapped-value}
###  `WrappedValue` 

The purpose of `WrappedValue` is to allow the same object instance to be treated as different for the purposes of change detection.
It is commonly used with the `async` pipe in the case where the `Observable` produces the same instance of the value.

Given that this use case is relatively rare and special handling impacts application performance, we have deprecated it in v10.
No replacement is planned for this deprecation.

If you rely on the behavior that the same object instance should cause change detection, you have two options:
- Clone the resulting value so that it has a new identity.
- Explicitly call [`ChangeDetectorRef.detectChanges()`](api/core/ChangeDetectorRef#detectchanges) to force the update. 

{@a removed}
## Removed APIs

The following APIs have been removed starting with version 10.0.0*:

| Package          | API            | Replacement | Notes |
| ---------------- | -------------- | ----------- | ----- |
| `@angular/core`  | Undecorated base classes that use Angular features | Add Angular decorator | See [migration guide](guide/migration-undecorated-classes) for more info |
| `@angular/core`  | `ModuleWithProviders` without a generic             | `ModuleWithProviders` with a generic | See [migration guide](guide/migration-module-with-providers) for more info |
| `@angular/core`  | Style Sanitization | no action needed | See [style sanitization API removal](#style-sanitization) for more info

*To see APIs removed in version 9, check out this guide on the [version 9 docs site](https://v9.angular.io/guide/deprecations#removed).


{@a esm5-fesm5}
### `esm5` and `fesm5` code formats in @angular/* npm packages

As of Angular v8, the CLI primarily consumes the `fesm2015` variant of the code distributed via `@angular/*` npm packages.
This renders the `esm5` and `fesm5` distributions obsolete and unnecessary, adding bloat to the package size and slowing down npm installations.

This removal has no impact on CLI users, unless they modified their build configuration to explicitly consume these code distributions.

Any application still relying on the `esm5` and `fesm5` as the input to its build system will need to ensure that the build pipeline is capable of accepting JavaScript code conforming to ECMAScript 2015 (ES2015) language specification.

Note that this change doesn't make existing libraries distributed in this format incompatible with the Angular CLI.
The CLI will fall back and consume libraries in less desirable formats if others are not available.
However, we do recommend that libraries ship their code in ES2015 format in order to make builds faster and build output smaller.

In practical terms, the `package.json` of all `@angular` packages has changed in the following way:

**Before**:
```
{
  "name": "@angular/core",
  "version": "9.0.0",
  "main": "./bundles/core.umd.js",
  "module": "./fesm5/core.js",
  "es2015": "./fesm2015/core.js",
  "esm5": "./esm5/core.js",
  "esm2015": "./esm2015/core.js",
  "fesm5": "./fesm5/core.js",
  "fesm2015": "./fesm2015/core.js",
  ...
}
```

**After**:
```
{
  "name": "@angular/core",
  "version": "10.0.0",
  "main": "./bundles/core.umd.js",
  "module": "./fesm2015/core.js",
  "es2015": "./fesm2015/core.js",
  "esm2015": "./esm2015/core.js",
  "fesm2015": "./fesm2015/core.js",
  ...
}
```

For more information about the npm package format, see the [Angular Package Format spec](https://goo.gl/jB3GVv).

{@a removed}
## Removed APIs

The following APIs have been removed starting with version 10.0.0*:

| Package          | API            | Replacement | Notes |
| ---------------- | -------------- | ----------- | ----- |
| `@angular/core`  | Undecorated base classes that use Angular features | Add Angular decorator | See [migration guide](guide/migration-undecorated-classes) for more info |
| `@angular/core`  | `ModuleWithProviders` without a generic             | `ModuleWithProviders` with a generic | See [migration guide](guide/migration-module-with-providers) for more info |

*To see APIs removed in version 9, check out this guide on the [version 9 docs site](https://v9.angular.io/guide/deprecations#removed).

{@a style-sanitization}
### Style Sanitization for `[style]` and `[style.prop]` bindings
Angular used to sanitize `[style]` and `[style.prop]` bindings to prevent malicious code from being inserted through `javascript:` expressions in CSS `url()` entries. However, most modern browsers no longer support the usage of these expressions, so sanitization was only maintained for the sake of IE 6 and 7. Given that Angular does not support either IE 6 or 7 and sanitization has a performance cost, we will no longer sanitize style bindings as of version 10 of Angular.