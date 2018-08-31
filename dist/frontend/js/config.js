/*!
 * Digital Sandbox v2.1 (https://github.com/codeworksdev/digital-sandbox)
 * Copyright (c) 2014-2018 CODEWORKS <support@codeworksnyc.com>
 * Licensed under the MIT license
 */
var DigitalSandboxOptions = {
    BROWSER_TAB_AUTO_LABEL           : true,
    BROWSER_TAB_SUFFIX               : 'Digital Sandbox',
    BROWSER_TAB_SUFFIX_DELIMITER     : '|',
    BROWSER_TAB_SUFFIX_ENABLED       : true,
    LAUNCHER_AUTOGEN_TITLE_VARS      : true,
    LAUNCHER_ENABLE_FOLDER_SWITCHING : true,
    LAUNCHER_ENABLE_TITLE_VAR        : true,
    LAUNCHER_HTML_HEADER_ENABLED     : true,
    LAUNCHER_HTML_HEADER_H1          : 'Digital Sandbox',
    LAUNCHER_HTML_HEADER_H2          : 'Please make a selection to begin.',
    LAUNCHER_WIDGET_NAME             : 'simple',
    THEME_DEFAULT_DEVICE             : 'ipad',
    THEME_DEFAULT_ORIENTATION        : 'l',
    THEME_DEFAULT_WALLPAPER_NAME     : 'desk',
    THEME_NAME                       : 'default',
    TOOLBAR_ENABLE_ABOUT             : true,
    TOOLBAR_ENABLE_COLLAPSE          : true,
    TOOLBAR_ENABLE_DEVICE            : true,
    TOOLBAR_ENABLE_EXPAND            : true,
    TOOLBAR_ENABLE_HOME              : true,
    TOOLBAR_ENABLE_LAUNCH            : true,
    TOOLBAR_ENABLE_QREFRESH          : true,
    TOOLBAR_ENABLE_REFRESH           : true,
    TOOLBAR_ENABLE_RELOAD            : true,
    TOOLBAR_ENABLE_ROTATE            : true,
    TOOLBAR_ENABLE_WALLPAPER         : true,
    TOOLBAR_ENABLED                  : true,
    TOOLBAR_START_COLLAPSED          : false,

    LAUNCHER_HTML_HEADER_BODY : `
        <div class="alert alert-warning" role="alert">
            <p class="lead"><span><i class="fa fa-info-circle"></i></span> <strong>Read Me!</strong></p>

            <p>This launcher uses <a target="_blank" href="https://getbootstrap.com/">Bootstrap</a>
            and <a target="_blank" href="https://github.com/codeworksdev/mochi">Mochi</a> components to help you get the
            most out of the digital sandbox with minimal programming necessary. Click the demos below to see these
            features in action, or click the button below to read the online documentation. You can delete this alert box
            at any time. Happy coding!</p>

            <a href="https://github.com/codeworksdev/digital-sandbox" target="_blank" class="btn btn-info active" role="button" aria-pressed="true">Online Documentation</a>
        </div>
        `,

    BODY : `
        <div class="row">
            <div class="col-sm-6">

                <div data-title="Demos">
                    <a href="./?demos:starter-template">Starter Template</a>
                </div>

            </div>
            <div class="col-sm-6">

                <div data-title="Demos (by Device Mode)">
                    <a href="./?demos:starter-template~default">Starter Template <span class="badge badge-info font-weight-normal">Default</span></a>
                    <a href="./?demos:starter-template~fullscreen">Starter Template <span class="badge badge-info font-weight-normal">Full Screen</span></a>
                    <a href="./?demos:starter-template~ipad">Starter Template <span class="badge badge-info font-weight-normal">iPad</span></a>
                    <a href="./?demos:starter-template~iphone_5s:p">Starter Template <span class="badge badge-info font-weight-normal">iPhone 5</span></a>
                    <a href="./?demos:starter-template~iphone_6plus:p">Starter Template <span class="badge badge-info font-weight-normal">iPhone 6 Plus</span></a>
                    <a href="./?demos:starter-template~galaxy_s5:p">Starter Template <span class="badge badge-info font-weight-normal">Galaxy S5</span></a>
                </div>

            </div>
        </div>
        `,
    };
