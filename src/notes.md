#Developer notes
I'll try to note down some things I found building this app in order to make it more understandable and maintainable. Also I may reuse this in a later case of need.

##Basic Architecture and Structural Things

###baseUrl & Path Mapping - 16.05.2018
To avoid the usage of relative paths and further stacking of '../../' I followed the suggestions offered here:
[stackoverflow - Avoiding Relative Paths in Angular](https://stackoverflow.com/questions/41460810/avoiding-relative-paths-in-angular-cli)
[TypeScript - Path Mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)
Currently active paths are:
- @components
- @helpers
- @models

###canActivate on all Routes
[stackoverflow - How To Apply canActivate On All Routes](https://stackoverflow.com/questions/43487827/how-to-apply-canactivate-guard-on-all-the-routes)


##Angular & Laravel ❤️

###Pagination - 16.05.2018
To use paginated results from Laravel I followed these suggestions:
[stackoverflow - How Pagination Works ... Angular 2 ... Laravel](https://stackoverflow.com/questions/44492577/how-pagination-works-in-api-system-frontend-is-angular2-and-backend-is-laravel5/44619406)
- [robotmonster.ca - Example](http://demo1.robotmonster.ca/laravel-angular/basic-pagination)

##Other links
- [stackoverflow - POST & GET in Angular 6](https://stackoverflow.com/questions/50196282/http-post-and-get-request-in-angular-6)
