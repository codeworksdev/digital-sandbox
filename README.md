# Digital Sandbox
_Cross-browser app launcher and device toolbar for showing responsive, mobile first web applications on the web or offline. Powered by [Mochi](https://github.com/codeworksdev/mochi) and [Bootstrap](http://getbootstrap.com/)._

> [**v2.1**](https://github.com/codeworksdev/digital-sandbox/releases/latest)

The digital sandbox is a portable (i.e., cross-browser) app launcher and device toolbar that allows you to easily display a collection of applications and websites in a [programmable](#api) [iFrame](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) window. It's inspired by Chrome DevTools' [device mode](https://developers.google.com/web/tools/chrome-devtools/device-mode/) feature, but with complete portability (i.e., can be used offline or online in most Internet browsers).

## What is Mochi?
[Mochi](https://github.com/codeworksdev/mochi) is a ready-to-deploy HTML5 boilerplate framework that runs on [Bootstrap](http://getbootstrap.com/), but adds tons of new features, with a strong focus on offline web applications without all the limitations. It achieves this goal by fully integrating and maintaining offline versions of popular libraries that have been out in the wild for years.

## Usage
To use the digital sandbox, simply [download the latest distribution package](https://github.com/codeworksdev/digital-sandbox/releases/latest) and extract the contents of the included **`dist`** folder to the root of your website directory (e.g., **`/var/www/html`** in some systems). That's it! You now have a fully functioning and completely portable device toolbar installed on your website. The digital sandbox is designed to run either online or offline, depending on your desired [configuration](#api).

## What's Included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations for all libraries. You'll see something like this:

```
dist/
├── bootstrap/
│   ├── css/
│   │   ├── bootstrap.css
│   │   ├── bootstrap.min.css
│   │   ├── bootstrap-grid.css
│   │   ├── bootstrap-grid.min.css
│   │   ├── bootstrap-reboot.css
│   │   └── bootstrap-reboot.min.css
│   │
│   └── js/
│       ├── bootstrap.bundle.js
│       ├── bootstrap.bundle.min.js
│       ├── bootstrap.js
│       └── bootstrap.min.js
│
├── frontend/
│   ├── apps/
│   │   ├── demos/
│   │   │   └── starter-template/
│   │   │       └── index.html
│   │   │
│   │   └── README.txt
│   │
│   ├── css/
│   │   ├── print.css
│   │   └── style.css
│   │
│   ├── img/
│   │   ├── brand/
│   │   │   ├── launcher-icon-1x.pmg
│   │   │   └── launcher-icon-4x.pmg
│   │   │
│   │   └── web/
│   │       ├── devices/
│   │       │   ├── apple/
│   │       │   │   ├── ipad.png
│   │       │   │   ├── ipad_air.png
│   │       │   │   ├── ipad_air-l.png
│   │       │   │   ├── ipad_mini.png
│   │       │   │   ├── ipad_mini-l.png
│   │       │   │   ├── ipad_pro_9_7.png
│   │       │   │   ├── ipad_pro_9_7-l.png
│   │       │   │   ├── ipad_pro_12_9.png
│   │       │   │   ├── ipad_pro_12_9-l.png
│   │       │   │   ├── ipad-l.png
│   │       │   │   ├── iphone_5s.png
│   │       │   │   ├── iphone_5s-l.png
│   │       │   │   ├── iphone_6plus.png
│   │       │   │   └── iphone_6plus-l.png
│   │       │   │
│   │       │   ├── google/
│   │       │   │   ├── nexus_7.png
│   │       │   │   ├── nexus_7-l.png
│   │       │   │   ├── nexus_10.png
│   │       │   │   └── nexus_10-l.png
│   │       │   │
│   │       │   └── samsung/
│   │       │       ├── galaxy_s5.png
│   │       │       └── galaxy_s5-l.png
│   │       │
│   │       ├── walls/
│   │       │   ├── bulbs.png
│   │       │   ├── desk.png
│   │       │   └── landscape.png
│   │       │
│   │       └── tile.png
│   │
│   ├── js/
│   │   ├── config.js
│   │   ├── onload.js
│   │   └── onload.min.js
│   │
│   └── less/
│       ├── _2dppx_375up.less
│       ├── _2dppx_425up.less
│       ├── _2dppx_480up.less
│       ├── _2dppx_576up.less
│       ├── _2dppx_750up.less
│       ├── _2dppx_768up.less
│       ├── _2dppx_970up.less
│       ├── _2dppx_992up.less
│       ├── _2dppx_1020up.less
│       ├── _2dppx_1024up.less
│       ├── _2dppx_1170up.less
│       ├── _2dppx_1200up.less
│       ├── _2dppx_1440up.less
│       ├── _2dppx_1560up.less
│       ├── _2dppx_2560up.less
│       ├── _2dppx_base.less
│       ├── _375up.less
│       ├── _425up.less
│       ├── _480up.less
│       ├── _576up.less
│       ├── _750up.less
│       ├── _768up.less
│       ├── _970up.less
│       ├── _992up.less
│       ├── _1020up.less
│       ├── _1024up.less
│       ├── _1170up.less
│       ├── _1200up.less
│       ├── _1440up.less
│       ├── _1560up.less
│       ├── _2560up.less
│       ├── _base.less
│       ├── _mixins.less
│       ├── _notouch.less
│       ├── _print.less
│       ├── print.less
│       └── style.less
│
├── mochi/
│   ├── css/
│   │   └── helpers/
│   │       └── animate.less/
│   │           └── dist/
│   │               ├── css/
│   │               │   └── animate.css
│   │               │
│   │               └── less/
│   │                   ├── _mixins.less
│   │                   ├── _options.less
│   │                   └── animate.less
│   │
│   ├── js/
│   │   ├── helpers/
│   │   │   ├── font-awesome-free/
│   │   │   │   └── js/
│   │   │   │       └── all.min.js
│   │   │   │
│   │   │   ├── iScroll/
│   │   │   │   └── build/
│   │   │   │       ├── iscroll.js
│   │   │   │       ├── iscroll.min.js
│   │   │   │       ├── iscroll-infinite.js
│   │   │   │       ├── iscroll-infinite.min.js
│   │   │   │       ├── iscroll-lite.js
│   │   │   │       ├── iscroll-lite.min.js
│   │   │   │       ├── iscroll-probe.js
│   │   │   │       ├── iscroll-probe.min.js
│   │   │   │       ├── iscroll-zoom.js
│   │   │   │       └── iscroll-zoom.min.js
│   │   │   │
│   │   │   ├── ViewerJS/
│   │   │   │   ├── images/
│   │   │   │   │   ├── kogmbh.png
│   │   │   │   │   ├── nlnet.png
│   │   │   │   │   ├── texture.png
│   │   │   │   │   ├── toolbarButton-download.png
│   │   │   │   │   ├── toolbarButton-fullscreen.png
│   │   │   │   │   ├── toolbarButton-menuArrows.png
│   │   │   │   │   ├── toolbarButton-pageDown.png
│   │   │   │   │   ├── toolbarButton-pageUp.png
│   │   │   │   │   ├── toolbarButton-presentation.png
│   │   │   │   │   ├── toolbarButton-zoomIn.png
│   │   │   │   │   └── toolbarButton-zoomOut.png
│   │   │   │   │
│   │   │   │   ├── tools/
│   │   │   │   │   └── replaceByFileContents.js
│   │   │   │   │
│   │   │   │   ├── example.local.css
│   │   │   │   ├── HeaderCompiled.html
│   │   │   │   ├── HeaderCompiled.js
│   │   │   │   ├── index.html
│   │   │   │   ├── index-template.html
│   │   │   │   ├── ODFViewerPlugin.css
│   │   │   │   ├── ODFViewerPlugin.js
│   │   │   │   ├── PDFViewerPlugin.css
│   │   │   │   ├── PDFViewerPlugin.js
│   │   │   │   ├── PluginLoader.js
│   │   │   │   ├── viewer.css
│   │   │   │   ├── viewer.js
│   │   │   │   └── viewerTouch.css
│   │   │   │
│   │   │   ├── basil.min.js
│   │   │   ├── Chart.bundle.min.js
│   │   │   ├── holder.min.js
│   │   │   ├── modernizr-custom.js
│   │   │   ├── popper.min.js
│   │   │   ├── sprintf.min.js
│   │   │   ├── underscore.string.min.js
│   │   │   └── underscore-min.js
│   │   │
│   │   ├── jquery/
│   │   │   ├── ui/
│   │   │   │   ├── images/
│   │   │   │   │   ├── ui-icons_444444_256x240.png
│   │   │   │   │   ├── ui-icons_555555_256x240.png
│   │   │   │   │   ├── ui-icons_777620_256x240.png
│   │   │   │   │   ├── ui-icons_777777_256x240.png
│   │   │   │   │   ├── ui-icons_cc0000_256x240.png
│   │   │   │   │   └── ui-icons_ffffff_256x240.png
│   │   │   │   │
│   │   │   │   ├── jquery-ui.css
│   │   │   │   ├── jquery-ui.js
│   │   │   │   ├── jquery-ui.min.css
│   │   │   │   ├── jquery-ui.min.js
│   │   │   │   ├── jquery-ui.structure.css
│   │   │   │   ├── jquery-ui.structure.min.css
│   │   │   │   ├── jquery-ui.theme.css
│   │   │   │   └── jquery-ui.theme.min.css
│   │   │   │
│   │   │   └── jquery.min.js
│   │   │
│   │   ├── plugins/
│   │   │   ├── dialog/
│   │   │   │   └── dist/
│   │   │   │       ├── dialog.js
│   │   │   │       └── dialog.min.js
│   │   │   │
│   │   │   └── veeva/
│   │   │       └── dist/
│   │   │           ├── veeva.js
│   │   │           ├── veeva-library.js
│   │   │           ├── veeva-library.min.js
│   │   │           └── veeva.min.js
│   │   │
│   │   ├── libraries.js
│   │   ├── mochi.js
│   │   └── mochi.min.js
│   │
│   └── less/
│       ├── _2dppx_375up.less
│       ├── _2dppx_425up.less
│       ├── _2dppx_480up.less
│       ├── _2dppx_576up.less
│       ├── _2dppx_750up.less
│       ├── _2dppx_768up.less
│       ├── _2dppx_970up.less
│       ├── _2dppx_992up.less
│       ├── _2dppx_1020up.less
│       ├── _2dppx_1024up.less
│       ├── _2dppx_1170up.less
│       ├── _2dppx_1200up.less
│       ├── _2dppx_1440up.less
│       ├── _2dppx_1560up.less
│       ├── _2dppx_2560up.less
│       ├── _2dppx_base.less
│       ├── _375up.less
│       ├── _425up.less
│       ├── _480up.less
│       ├── _576up.less
│       ├── _750up.less
│       ├── _768up.less
│       ├── _970up.less
│       ├── _992up.less
│       ├── _1020up.less
│       ├── _1024up.less
│       ├── _1170up.less
│       ├── _1200up.less
│       ├── _1440up.less
│       ├── _1560up.less
│       ├── _2560up.less
│       ├── _base.less
│       ├── _mixins.less
│       ├── _notouch.less
│       └── _print.less
│
├── .htaccess
├── index.html
├── manifest.json
├── offline.html
├── project.appcache
├── robots.txt
└── sw.js
```

___
# API

## Unified Configuration File
The included unified configuration file ([**`dist/frontend/js/config.js`**](https://github.com/codeworksdev/digital-sandbox/blob/master/dist/frontend/js/config.js)) is a great way to get started with using the digital sandbox. This file acts as your digital sandbox controller, and uses special variables to organize your apps in a consistent, accessible format. Additionally, this is where you would include the basic HTML markup that allows the sandbox work to generate the app launcher screen (i.e., the inline frame). Continue reading below to learn how the standard HTML template should be structured to take full advantage of the sandbox.

_**Note:** A full list of supported variables are listed [here](https://github.com/codeworksdev/digital-sandbox/issues/95)._

## HTML Markup
First things first! After the [unified configuration file](https://github.com/codeworksdev/digital-sandbox/blob/master/dist/frontend/js/config.js) is loaded and processed, the digital sandbox will determine if the included HTML body markup matches this basic structure:

```html
<div class="row">
    <div class="col-sm-6">
        <div data-title="Demos">
            <a href="./?demos:my-first-app:v1.0/index">My First App v1.0</a>
            <a href="./?demos:my-first-app:v2.0/index">My First App v2.0</a>
            <a href="./?demos:my-first-app:v3.0/index">My First App v3.0</a>
        </div>
    </div>
    <div class="col-sm-6">
        <div data-title="Websites">
            <a href="https://google.com/">Google</a>
        </div>
    </div>
</div>
```
If it does, it will automatically be converted to something like this:

```html
<div class="row">
    <div class="col-sm-6">
        <div class="ds-widget ds-widget-simple" id="ds-widget-simple-0">
            <div data-bucket="demos">
                <h1>Demos</h1>
                <table class="table table-sm table-bordered table-hover">
                    <tbody>
                        <tr>
                            <td><a target="_top" title="My First App v1.0" href="./index.html?demos:my-first-app:v1.0/index">My First App v1.0</a></td>
                            <td title="Launch Internal"><a target="_top" href="./index.html?demos:my-first-app:v1.0/index"><i class="fas fa-sign-in-alt"></i></a></td>
                            <td title="Launch External"><a target="_blank" href="http://mydomain.com/frontend/apps/demos/my-first-app/v1.0/index.html"><i class="fas fa-link"></i></a></td>
                        </tr>
                        <tr>
                            <td><a target="_top" title="My First App v2.0" href="./index.html?demos:my-first-app:v2.0/index">My First App v2.0</a></td>
                            <td title="Launch Internal"><a target="_top" href="./index.html?demos:my-first-app:v2.0/index"><i class="fas fa-sign-in-alt"></i></a></td>
                            <td title="Launch External"><a target="_blank" href="http://mydomain.com/frontend/apps/demos/my-first-app/v2.0/index.html"><i class="fas fa-link"></i></a></td>
                        </tr>
                        <tr>
                            <td><a target="_top" title="My First App v3.0" href="./index.html?demos:my-first-app:v3.0/index">My First App v3.0</a></td>
                            <td title="Launch Internal"><a target="_top" href="./index.html?demos:my-first-app:v3.0/index"><i class="fas fa-sign-in-alt"></i></a></td>
                            <td title="Launch External"><a target="_blank" href="http://mydomain.com/frontend/apps/demos/my-first-app/v3.0/index.html"><i class="fas fa-link"></i></a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="col-sm-6">
        <div class="ds-widget ds-widget-simple" id="ds-widget-simple-1">
            <div data-bucket="websites">
                <h1>Websites</h1>
                <table class="table table-sm table-bordered table-hover">
                    <tbody>
                        <tr>
                            <td><a target="_blank" title="Google" href="https://google.com/">Google</a></td>
                            <td title="Launch Internal"><span class="text-muted"><i class="fas fa-sign-in-alt"></i></span></td>
                            <td title="Launch External"><a target="_blank" href="https://google.com/"><i class="fas fa-link"></i></a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
```

And there you have it! We call this type of conversion *"widgetization of the app directory"*. Once widgetized, the digital sandbox will organize your apps in a structured format that's usable by most modern browsers. You can define which widget you'd like to use by modifying the [`LAUNCHER_WIDGET_NAME`](https://github.com/codeworksdev/digital-sandbox/issues/105) variable in the unified configuration file. See below for a list of supported widgets.

## Supported Widgets
The following widgets are supported in the [standard distribution package](https://github.com/codeworksdev/digital-sandbox/releases/latest):

| Widget Name | Description |
|--|--|
| `simple` | Organizes your apps in a basic table structure. This is the default widget. |
| `accordion` | Organizes your apps as Bootstrap-powered [accordions](http://getbootstrap.com/docs/4.1/components/collapse/#accordion-example). |

## Query String Parameters
In addition to allowing you to widgetize the app directory, the digital sandbox also supports a unique query string format for customizing the way your apps are appear within the [iFrame](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) window. Consider the following example:

### FOR EXAMPLE
To launch **`dist/frontend/apps/demos/my-first-app/v1.0/home.html`** as an iPad device in portrait orientation, you would navigate to the following URL:
```
./index.html?demos:my-first-app:v1.0/home~ipad:p|demos
```
The URL above would produce an iFrame window configured as:

1. wrapped in a device image referenced as `ipad` (i.e., a standard iPad), and
2. with the `ipad` device image set to `portrait` orientation, and
3. ensuring the digital sandbox is aware that the app is categorized under `demos`, which would
4. allow the sandbox to refer back to the category when the user interacts with the toolbar, and
5. making sure the app link always refreshes the iFrame parent window, and
6. that the `home.html` file in **`dist/frontend/apps/demos/my-first-app/v1.0`** is opened.

___
# Further Reading
Because the digital sandbox is built with Bootstrap, learning to use it is as easy as digging into their official docs and mastering the awesome features provided by the framework. We encourage you to head on over to the [official Bootstrap documentation](https://getbootstrap.com/docs/4.1/getting-started/introduction/) to learn like a pro. Happy coding!

___
# License
This project is licensed under the MIT license. (http://opensource.org/licenses/MIT)
