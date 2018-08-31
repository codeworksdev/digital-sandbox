/*!
 * Digital Sandbox v2.1 (https://github.com/codeworksdev/digital-sandbox)
 * Copyright (c) 2014-2018 CODEWORKS <support@codeworksnyc.com>
 * Licensed under the MIT license
 */
function mochi_init()
{
    if (
      this.__page_name == 'index'
      && /^https:\/\//.test(this.__href))
    {
        this.setOption(
            'ENABLE_SERVICE_WORKER',
            false
            );
    }
};

/*
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
*/

function mochi_load_page0(responseData)
{
    this.extend( 'clipboard', MyClipboard          );
    this.extend( 'master',    DigitalSandboxMaster );

    window.self == window.top
      ? this.extend('wrap', DigitalSandboxWrap)
      : this.extend('apps', DigitalSandboxApps);
};

/*
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
*/

function MyClipboard()
{
};

MyClipboard.prototype =
{
    _copyFallback : function(text)
    {
        var textArea = document.createElement('textarea');

        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try
        {
            document.execCommand('copy');
            this.onSuccess()
        }
        catch (err)
        {
            this.onError(err)
        }

        document.body.removeChild(textArea)
    },

    copy : function(text)
    {
        if (!navigator.clipboard) this._copyFallback(text);
        else
        {
            navigator
              .clipboard
              .writeText(text)
              .then(
                function(){$m.clipboard.onSuccess()},
                function(err){$m.clipboard.onError(err)}
                );
        }
    },

    onError : function(err)
    {
        alert(err)
    },

    onSuccess : function()
    {
    },
};

/*
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
*/

function DigitalSandboxMaster()
{
    this._options();
    this._html();
    this._vars();
};

DigitalSandboxMaster.prototype =
{
    _options : function()
    {
        this.options = JSON.parse(
            JSON.stringify(
                _.defaults(
                    DigitalSandboxOptions,
                    {
                        BODY                             : '',
                        BROWSER_TAB_AUTO_LABEL           : true,
                        BROWSER_TAB_SUFFIX               : 'Digital Sandbox',
                        BROWSER_TAB_SUFFIX_DELIMITER     : '|',
                        BROWSER_TAB_SUFFIX_ENABLED       : true,
                        LAUNCHER_AUTOGEN_TITLE_VARS      : true,
                        LAUNCHER_ENABLE_FOLDER_SWITCHING : true,
                        LAUNCHER_ENABLE_TITLE_VAR        : true,
                        LAUNCHER_HTML_HEADER_BODY        : '',
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
                    }
                    )
                )
            );
    },

    _html : function()
    {
        var insertHTML = function(h)
            {
                $m.__body.prepend(h.join(''));
                $m.__container = $m.__body.find('#container')
            };

        if (window.self == window.top)
        {
            insertHTML([
                '<div id="container">',
                    '<table>',
                        '<tbody>',
                            '<tr>',
                                '<td class="align-middle">',
                                    '<div id="content">',
                                        '<iframe src="about:blank"></iframe>',
                                    '</div>',
                                '</td>',
                            '</tr>',
                        '</tbody>',
                    '</table>',
                '</div>',
                ]);
        }
        else
        {
            insertHTML([
                '<div id="container" class="container my-4">',
                    '<div class="row">',
                        '<div class="col-xl">',
                            '<div id="header" class="d-none">',
                                '<h1 class="display-4"></h1>',
                                '<p class="lead"></p>',
                                '<hr>',
                            '</div>',
                            '<div id="apps"></div>',
                        '</div>',
                    '</div>',
                '</div>',
                ]);

            $m.setView(1)
        }

        if (
          this.options.THEME_NAME
          && /^\w+$/.test(this.options.THEME_NAME))
        {
            (function(instance)
            {
                var t = +new Date(),
                    j = 'frontend/themes/'+instance.options.THEME_NAME+'/onload.js',
                    c = [
                        'frontend/themes/default/css/style.css?_='+t,
                        'frontend/themes/default/css/print.css?_='+t,
                        ];

                $m
                .__head
                .append(
                      '<link rel="stylesheet" href="'+c[0]+'" media="all">'
                    + '<link rel="stylesheet" href="'+c[1]+'" media="print">'
                    );

                if (/^https?:\/\//.test($m.__href))
                {
                    $
                    .getScript(j)
                    .fail(
                        function(jqxhr, settings, exception) {
                            console.error('Unable to load theme scripts.')
                            }
                        );
                }
                else
                {
                    var script = document.createElement('script');
                        script.src = j+'?_='+t;

                    document
                      .getElementsByTagName('body')[0]
                      .appendChild(script);
                }
            }
            )(this);
        }
    },

    _vars : function()
    {
        this.ver = {
            date    : '2018-08-31',
            number  : '2.1',
            product : 'Digital Sandbox',
            type    : 'final',
            };

        this.ver.str = '<strong>v'+this.ver.number+'-'+this.ver.type+'</strong> '+this.ver.date;
        this.regex   = /^([^\?]+)(?:\?([^\?~\|&]*))?(?:~(([a-z]\w*)(?::([lp]))?))?(?:\|([a-z\d\-]*))?(?:&title=(.*))?$/i;
        this.iframe  = $('iframe');
        this.href    = decodeURI($m.__href);
        this.url     = this.getMeta(this.href).url;
    },

    getMeta : function(url)
    {
        var meta = { url : {}, },
            href = decodeURI(url || $m.__href);

        if (this.regex.test(href))
        {
            meta.url.dir         = RegExp.$1;
            meta.url.query       = RegExp.$2;
            meta.url.device      = RegExp.$4;
            meta.url.orientation = RegExp.$5;
            meta.url.title       = RegExp.$7;
            meta.url.bucket      = (function(b){return /^[a-z\d]+(\-[a-z\d]+)*$/i.test(b)?b.toLowerCase():''})(RegExp.$6);
            meta.url.base        = decodeURI($m.__href).replace(/\/[^\/]*$/, '/');
            meta.url.external    = Boolean(/^https?:\/\//i.test(meta.url.query));
            meta.url.src         = 'index.html'+(meta.url.bucket?('?'+meta.url.bucket):'');

            if (meta.url.external) meta.url.src = meta.url.query;
            else
            {
                if (/^([\w-\.:]+)(?:\/([\w-\.:]*))?$/.test(meta.url.query))
                {
                    meta.url.index = RegExp.$2 || 'index';
                    meta.url.app   = RegExp.$1.replace(/\:/g,'/');
                    meta.url.ext   = 'html';
                    meta.url.src   = 'frontend/apps/'+meta.url.app+'/'+meta.url.index+'.'+meta.url.ext;
                }
            }
        }

        return meta
    },
};

/*
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
*/

function DigitalSandboxWrap()
{
    this._html();
    this._toolbar();
    this._init();
};

DigitalSandboxWrap.prototype =
{
    _html : function()
    {
        if ($m.master.options.LAUNCHER_ENABLE_TITLE_VAR)
        {
            (function(url)
            {
                var newTitle = null;

                if (
                  _.has(url, 'title')
                  && /\S/.test(url.title))
                {
                    newTitle = url.title
                }
                else if (_.has(url, 'app'))
                {
                    if ($m.master.options.BROWSER_TAB_AUTO_LABEL)
                    {
                        var slug = /([^\/]+)$/.exec(url.app)[1],
                            func = function(word){return $.trim(window.s.capitalize(word, true))};

                        if (/\S/.test(newTitle = _.compact(_.map(slug.split(/[^a-z\d]/i), func)).join(' ')))
                        {
                            newTitle = newTitle.replace(/(\d)\s+(\d)/g, '$1.$2');
                            newTitle = newTitle.toUpperCase();
                            newTitle = newTitle.replace(/\sV(\d+)/, ' v$1');
                        }
                    }
                }
                else if (/^https?:\/\/([^\/]+)/i.test(url.src))
                {
                    if ($m.master.options.BROWSER_TAB_AUTO_LABEL)
                    {
                        newTitle = RegExp.$1.toLowerCase()
                    }
                }

                if (
                  newTitle !== null
                  && /\S/.test(newTitle))
                {
                    if ($m.master.options.BROWSER_TAB_SUFFIX_ENABLED)
                    {
                        newTitle += ' '+$.trim($m.master.options.BROWSER_TAB_SUFFIX_DELIMITER || '|')+' ';
                        newTitle += /\S/.test($m.master.options.BROWSER_TAB_SUFFIX) ? $m.master.options.BROWSER_TAB_SUFFIX : $m.master.ver.product;
                    }

                    $m.__html.find('title').text(newTitle)
                }
            }
            )($m.master.url);
        }

        if (/^\w+$/.test($m.master.options.THEME_DEFAULT_DEVICE))
        {
            $m.__body.attr(
                'data-device',
                $m.master.options.THEME_DEFAULT_DEVICE
                );
        }

        if (/^\w+$/.test($m.master.options.THEME_DEFAULT_ORIENTATION))
        {
            $m.__body.attr(
                'data-orientation',
                $m.master.options.THEME_DEFAULT_ORIENTATION
                );
        }

        if (/^\w+$/.test($m.master.options.THEME_DEFAULT_WALLPAPER_NAME))
        {
            $m.__body.attr(
                'data-wall',
                $m.master.options.THEME_DEFAULT_WALLPAPER_NAME
                );
        }

        (function()
        {
            var i = 'DigitalSandboxModalAbout',
                h = [
                '<div class="modal fade" id="'+i+'" tabindex="-1" role="dialog" aria-labelledby="'+i+'Label" aria-hidden="true">',
                  '<div class="modal-dialog modal-dialog-centered" role="document">',
                    '<div class="modal-content">',
                      '<div class="modal-header">',
                        '<h5 class="modal-title" id="'+i+'Label">',
                          '<span><strong>'+$m.master.ver.product+' <span class="text-muted">v'+$m.master.ver.number+'</span></strong></span>',
                        '</h5>',
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">',
                          '<span aria-hidden="true">&times;</span>',
                        '</button>',
                      '</div>',
                      '<div class="modal-body text-center py-5">',

                        '<img src="frontend/img/brand/launcher-icon-4x.png" alt="Logo">',
                      '</div>',
                      '<div class="modal-footer text-right">',
                        '<small class="text-muted">'+$m.master.ver.str+'</small>',
                        '<a target="_blank" href="https://github.com/codeworksdev/digital-sandbox" title="GitHub">',
                          '<span class="text-info"><i class="fab fa-lg fa-github"></i></span>',
                        '</a>',
                      '</div>',
                    '</div>',
                  '</div>',
                '</div>',
                ];

            $m.__body.append(h.join(''))
        }
        )();
    },

    _toolbar : function()
    {
        $m.extend(
            'toolbar',
            DigitalSandboxToolbar,
            function() {
                this.onload()
                }
            );
    },

    _init : function()
    {
        if ($m.master.url.device)
        {
            var s = '[data-button="'+$m.master.url.device+'"]',
                b = $m.device.inner.find(s);

            $m.device.select(b.get(0))
        }

        if ($m.master.url.orientation)
        {
            $m.device.rotate(
                $m.master.url.orientation
                );
        }

        $m.master.iframe.attr(
            'src',
            $m.master.url.src
            );
    },
};

/*
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
*/

function DigitalSandboxToolbar()
{
    this._options();
    this._html();
    this._vars();
};

DigitalSandboxToolbar.prototype =
{
    _options : function()
    {
        this.options = {
            buttons : [
                { slug : 'home',      icon : 'fas fa-home',         label : 'Home'                  },
                { slug : 'refresh',   icon : 'fas fa-sync-alt',     label : 'Refresh Parent Window' },
                { slug : 'qrefresh',  icon : 'fas fa-redo-alt',     label : 'Refresh Framed Window' },
                { slug : 'reload',    icon : 'fas fa-bolt',         label : 'Reload Frame'          },
                { slug : 'device',    icon : 'fas fa-desktop',      label : 'Device Mode'           },
                { slug : 'rotate',    icon : 'fas fa-arrows-alt-v', label : 'Orientation'           },
                { slug : 'wallpaper', icon : 'fas fa-image',        label : 'Wallpaper'             },
                { slug : 'launch',    icon : 'fas fa-th-list',      label : 'Launcher'              },
                { slug : 'about',     icon : 'fas fa-info-circle',  label : 'About'                 },
                { slug : 'collapse',  icon : 'far fa-times-circle', label : 'Collapse'              },
                { slug : 'expand',    icon : 'fas fa-angle-left',   label : 'Expand'                },
                ],

            walls : [
                'default',
                'desk',
                'landscape',
                'bulbs',
                ],
            };
    },

    _html : function()
    {
        var h = [
            '<div id="toolbar">',
              '<div id="inner-toolbar"></div>',
            '</div>',
            ];

        if ( !$m.master.options.TOOLBAR_ENABLED        ) h[0] = h[0].replace( />$/, ' class="d-none">'       );
        if ( $m.master.options.TOOLBAR_START_COLLAPSED ) h[0] = h[0].replace( />$/, ' data-collapsed="yes">' );

        $m.__container.prepend(h.join(''));

        _.each(
            this.options.buttons,
            function(o)
            {
                var t = $('#inner-toolbar'),
                    e = Boolean($m.master.options['TOOLBAR_ENABLE_'+o.slug.toUpperCase()]),
                    h = [
                        '<div data-button="'+o.slug+'" title="'+o.label+'">',
                          '<i class="fa-fw '+o.icon+'"></i>',
                        '</div>',
                        ];

                switch (o.slug)
                {
                    case 'expand':
                    e = Boolean($m.master.options.TOOLBAR_ENABLE_COLLAPSE);
                    break;
                }

                if (!e) h[0] = h[0].replace(/>$/, ' class="d-none">');
                t.append(h.join(''))
            }
            );
    },

    _vars : function()
    {
        this.container = $('#toolbar');
        this.inner     = $('#inner-toolbar');
        this.buttons   = this.inner.find('[data-button]');
    },

    do : function(button)
    {
        var b = _.isElement(button) ? $(button) : button,
            k = b.attr('data-button'),
            f = 'do'+window.s.capitalize(k);

        this[f](b);
        return this
    },

    doAbout     : function(b){$('#DigitalSandboxModalAbout').modal()},
    doCollapse  : function(b){this.container.attr('data-collapsed','yes')},
    doDevice    : function(b){$m.device.open(b)},
    doExpand    : function(b){this.container.removeAttr('data-collapsed')},
    doHome      : function(b){window.location.href=$m.master.url.dir},
    doLaunch    : function(b){var u=window.location.href.replace($m.master.regex,'$1?|$6');window.location.href=/\|.+$/.test(u)?u:u.replace(/\?\|$/,'')},
    doQrefresh  : function(b){try{$m.master.iframe[0].contentWindow.location.reload()}catch(e){this.doRefresh()}},
    doRefresh   : function(b){window.location.reload(true)},
    doReload    : function(b){$m.master.iframe.attr('src',$m.master.iframe.attr('src'))},
    doRotate    : function(b){$m.device.rotate()},
    doWallpaper : function(b){$m.toolbar.toggleWallpaper()},

    onload : function()
    {
        _.each(
            this.options.buttons,
            function(o)
            {
                switch (o.slug)
                {
                    case 'device':
                    $m.extend(
                        o.slug,
                        DigitalSandboxDevice,
                        function() {
                            this.onload()
                            }
                        );
                    break;
                }
            }
            );

        $m.onClick(
            this.buttons,
            function() {
                $m.toolbar.do(this)
                }
            );

        return this
    },

    toggleWallpaper : function()
    {
        var cur_w       = $m.__body.attr('data-wall') || 'default',
            cur_w_index = _.indexOf(this.options.walls, cur_w);
            new_w_index = cur_w_index+1;
            new_w       = this.options.walls[new_w_index < this.options.walls.length ? new_w_index : 0];

        $m.__body.attr('data-wall', new_w);
        return this
    },
};

/*
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
*/

function DigitalSandboxDevice()
{
    this._options();
    this._html();
    this._vars();
};

DigitalSandboxDevice.prototype =
{
    _options : function()
    {
        this.options = {

            buttons : {
                default       : 'Default',
                fullscreen    : 'Full Screen',
                ipad          : 'iPad',
                ipad_mini     : 'iPad Mini',
                ipad_air      : 'iPad Air',
                ipad_pro_9_7  : 'iPad Pro 9.7-inch',
                ipad_pro_12_9 : 'iPad Pro 12.9-inch',
                iphone_5s     : 'iPhone 5',
                iphone_6plus  : 'iPhone 6 Plus',
                galaxy_s5     : 'Galaxy S5',
                nexus_7       : 'Nexus 7',
                nexus_10      : 'Nexus 10',
                },

            container_id : 'device-menu',
            };
    },

    _html : function()
    {
        $m
        .toolbar
        .buttons
        .filter('[data-button="device"]')
        .append(
              '<div id="'+this.options.container_id+'">'
            +   '<div id="inner-'+this.options.container_id+'">'
            +     '<span data-action="exit">'
            +       '<i class="fas fa-times-circle"></i>'
            +     '</span>'
            +   '</div>'
            + '</div>'
            );
    },

    _vars : function()
    {
        this.def       = $m.__body.attr('data-device');
        this.container = $('#'+this.options.container_id);
        this.inner     = $('#inner-'+this.options.container_id);
    },

    action : function(button)
    {
        var b = _.isElement(button) ? $(button) : button,
            f = 'action__'+b.attr('data-action');

        this[f](b);
        return this
    },

    action__exit : function(b)
    {
        setTimeout("$m.device.close()", 50);
        return this
    },

    close : function()
    {
        this.container.removeClass('open');
        return this
    },

    onload : function()
    {
        _.each(
            this.options.buttons,
            function(v, k)
            {
                var h = [
                    '<span data-button="'+k+'">',
                      '<span title="'+v+'">'+v+'</span>',
                      '<span class="float-right">',
                        '<span data-option="launch-internal" title="Launch Internal"><i class="fas fa-fw fa-sign-in-alt"></i></span>',
                        '<span data-option="launch-external" title="Launch External"><i class="fas fa-fw fa-link"></i></span>',
                        '<span data-option="copy-url">',
                          '<span data-toggle="popover" data-content="Copied!"><i title="Copy URL" class="far fa-copy"></i></span>',
                        '</span>',
                      '</span>',
                    '</span>',
                    ];

                this.inner.append(h.join(''));

                if (k == this.def)
                {
                    this
                      .inner
                      .find('[data-button="'+k+'"]')
                      .addClass('selected');
                }
            },
            this
            );

        $m.onClick(this.inner.find('[data-action]'), function(){$m.device.action(this)});
        $m.onClick(this.inner.find('[data-button] > span:nth-child(1)'), function(){$m.device.select($(this).parent())});

        $m.onClick(
            this.inner.find('[data-button] > span:last-child > span'),
            {
                getURLbyDeviceName : function(newDeviceName)
                {
                    var u_old = $m.__href,
                        u_new = null;

                    if (/\~[a-z][a-z\d_]*/.test(u_old))
                    {
                        u_new = u_old.replace(
                            /\~[a-z][a-z\d_]*/,
                            '~'+newDeviceName
                            );
                    }
                    else
                    {
                        u_new = /\S/.test($m.master.url.query)
                          ? u_old.replace($m.master.url.query, $m.master.url.query+'~'+newDeviceName)
                          : (u_old+'?~'+newDeviceName);
                    }

                    return u_new
                },
            },
            function(event)
            {
                var o = $(this),
                    b = o.parents('[data-button]:eq(0)'),
                    d = b.attr('data-button'),
                    k = o.attr('data-option');

                switch (k)
                {
                    case 'copy-url':
                    $m.clipboard.copy(event.data.getURLbyDeviceName(d));

                    setTimeout(
                        function() {
                            $('.popover[role="tooltip"]').popover('hide')
                            },
                        1500
                        );
                    break;

                    case 'launch-external':
                    window.location.assign(event.data.getURLbyDeviceName(d));
                    break;

                    case 'launch-internal':
                    b.find('> span:nth-child(1)').trigger($m.getOnClickName());
                    break;
                }
            }
            );

        $('[data-toggle="popover"]').popover({placement : 'left'});
        return this
    },

    open : function()
    {
        if (!this.container.hasClass('open')) this.container.addClass('open');
        return this
    },

    rotate : function(or)
    {
        var a = 'data-orientation',
            o,
            v;

        if (/^[lp]$/.test(or)) v = or;
        else
        {
            o = $m.__body.attr(a);
            v = !o ? 'l' : (o == 'l' ? 'p' : 'l');
        }

        $m.__body.attr(a, v);
        return this
    },

    select : function(button)
    {
        var b = _.isElement(button) ? $(button) : button,
            k = b.attr('data-button'),
            c = 'selected',
            s = b.hasClass(c);

        if (!s)
        {
            this.inner.find('[data-button="'+k+'"]').addClass(c);
            this.inner.find(':not([data-button="'+k+'"])').removeClass(c);
            $m.__body.attr('data-device', k);
        }

        return this
    },
};

/*
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
*/

function DigitalSandboxApps()
{
    this._vars();
    this._html();
    this._init();
};

DigitalSandboxApps.prototype =
{
    _vars : function()
    {
        this.bucket     = /\?([a-z\d]+(\-[a-z\d]+)*)$/.test(decodeURI($m.__href)) ? RegExp.$1 : '';
        this.header     = $m.__container.find('#header');
        this.container  = $m.__container.find('#apps');
        this.widgetName = this.container.attr('data-widget');
        this.cols       = this.container.find('[class^="col-"]');
    },

    _html : function()
    {
        if (
          $m.master.options.LAUNCHER_WIDGET_NAME
          && /^\w+$/.test($m.master.options.LAUNCHER_WIDGET_NAME))
        {
            this.container.attr(
                'data-widget',
                $m.master.options.LAUNCHER_WIDGET_NAME
                );

            this.widgetName = $m.master.options.LAUNCHER_WIDGET_NAME
        }

        if ($m.master.options.LAUNCHER_HTML_HEADER_ENABLED)
        {
            if (
              $m.master.options.LAUNCHER_HTML_HEADER_H1
              && /\S/.test($m.master.options.LAUNCHER_HTML_HEADER_H1))
            {
                this.header.find('> h1').html(
                    $m.master.options.LAUNCHER_HTML_HEADER_H1
                    );
            }

            if (
              $m.master.options.LAUNCHER_HTML_HEADER_H2
              && /\S/.test($m.master.options.LAUNCHER_HTML_HEADER_H2))
            {
                this.header.find('> p.lead').html(
                    $m.master.options.LAUNCHER_HTML_HEADER_H2
                    );
            }

            this.header.removeClass('d-none')
        }

        if (
          _.has($m.master.options, 'LAUNCHER_HTML_HEADER_BODY')
          && $m.master.options.LAUNCHER_HTML_HEADER_BODY)
        {
            this.header.find('> p.lead').after(
                $m.master.options.LAUNCHER_HTML_HEADER_BODY
                );

            this.cols = this.container.find('[class^="col-"]')
        }

        if (
          _.has($m.master.options, 'BODY')
          && $m.master.options.BODY)
        {
            this
              .container
              .empty()
              .html($m.master.options.BODY);

            this.cols = this.container.find('[class^="col-"]')
        }

        if (this.cols.length)
        {
            if (
              !this.widgetName
              || !/^[a-z][a-z\d]*$/.test(this.widgetName))
            {
                this.container.attr(
                    'data-widget',
                    this.widgetName = 'simple'
                    );
            }

            if (this['__widget_'+this.widgetName])
            {
                _.each(
                    this.cols,
                    function(col, i)
                    {
                        var meta        = {};
                            meta.col    = $(col);
                            meta.groups = meta.col.find('div[data-title]');
                            meta.length = meta.groups.length;

                        if (meta.length)
                        {
                            meta.classNames = ['ds-widget', 'ds-widget-'+this.widgetName];
                            meta.id        = meta.classNames[1]+'-'+i;

                            meta.col.html(
                                  '<div class="'+meta.classNames.join(' ')+'" id="'+meta.id+'">'
                                +   this['__widget_'+this.widgetName](meta)
                                + '</div>'
                                );
                        }
                    },
                    this
                    );

                $m.onClick(
                    this.cols.find('[data-obj]'),
                    function(event)
                    {
                        var b = $(this),
                            f = 'do__'+b.attr('data-obj');

                        if ($m.apps[f])
                        {
                            event.preventDefault();
                            $m.apps[f](b)
                        }
                    }
                    );
            }
        }
    },

    _init : function()
    {
        $m.__body.attr(
            'data-ready',
            'yes'
            );
    },

    __widget_accordion : function(meta)
    {
        var i = 0,
            h = [];

        do
        {
            h.push(
                (function(instance, group, id, n)
                {
                    var i = 0,
                        l = group.length,
                        h = [],
                        g,
                        t,
                        s;

                    while (i < l)
                    {
                        g = group.eq(i++);
                        t = g.attr('data-title');
                        s = $m.sanitizeTitle(t);

                        if (
                          !instance.bucket
                          || s == instance.bucket)
                        {
                            h.push(
                                  '<div class="card bg-light" data-bucket="'+s+'">'
                                +   '<div class="card-header" id="'+id+'-heading'+n+'">'
                                +     '<h5 class="mb-0">'
                                +       '<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#'+id+'-collapse'+n+'" aria-expanded="false" aria-controls="'+id+'-collapse'+n+'">'
                                +         t
                                +       '</button>'
                                +     '</h5>'
                                +     '<a'
                                +       ' data-enabled="'+($m.master.options.LAUNCHER_ENABLE_FOLDER_SWITCHING?'yes':'no')+'"'
                                +       ' data-obj="folder"'
                                +       ' data-action="'+($m.master.url.query?'close':'open')+'"'
                                +       ' title="'+($m.master.url.query?'Close':'Open')+' Folder"'
                                +       ' href="'+$m.master.url.dir+($m.master.url.query?'':('?|'+s))+'"'
                                +       ' target="_top">'
                                +       '<i class="fas fa-folder-open"></i>'
                                +       '<i class="fas fa-folder"></i>'
                                +     '</a>'
                                +   '</div>'
                                +   '<div id="'+id+'-collapse'+n+'" class="collapse" aria-labelledby="'+id+'-heading'+n+'" data-parent="#'+id+'">'
                                +     '<div class="card-body">'
                                +       instance.getHTML_table(g)
                                +     '</div>'
                                +   '</div>'
                                + '</div>'
                                );
                        }
                    }

                    return h.join('')
                }
                )(this, meta.groups.eq(i), meta.id, i)
                );
        }
        while (++i < meta.length);

        return h.join('')
    },

    __widget_simple : function(meta)
    {
        var i = 0,
            h = [];

        do
        {
            h.push(
                (function(instance, group, id, n)
                {
                    var i = 0,
                        l = group.length,
                        h = [],
                        g,
                        t,
                        s;

                    while (i < l)
                    {
                        g = group.eq(i++);
                        t = g.attr('data-title');
                        s = $m.sanitizeTitle(t);

                        if (
                          !instance.bucket
                          || s == instance.bucket)
                        {
                            h.push(
                                  '<div data-bucket="'+s+'">'
                                +   '<h1>'+t+'</h1>'
                                +     '<a'
                                +       ' data-enabled="'+($m.master.options.LAUNCHER_ENABLE_FOLDER_SWITCHING?'yes':'no')+'"'
                                +       ' data-obj="folder"'
                                +       ' data-action="'+($m.master.url.query?'close':'open')+'"'
                                +       ' title="'+($m.master.url.query?'Close':'Open')+' Folder"'
                                +       ' href="'+$m.master.url.dir+($m.master.url.query?'':('?|'+s))+'"'
                                +       ' target="_top">'
                                +       '<i class="fas fa-folder-open"></i>'
                                +       '<i class="fas fa-folder"></i>'
                                +     '</a>'
                                +   instance.getHTML_table(g)
                                + '</div>'
                                );
                        }
                    }

                    return h.join('')
                }
                )(this, meta.groups.eq(i), meta.id, i)
                );
        }
        while (++i < meta.length);

        return h.join('')
    },

    getHTML_table : function(group, className)
    {
        var c = arguments.length > 1 ? className : 'table-sm table-bordered table-hover',
            h = '<table class="table'+(/\w/.test(c)?(' '+c):'')+'"><tbody>',
            f = '</tbody></table>',
            r = _.map(
                group.find('a[href]'),
                function(anchor)
                {
                    var a = $(anchor),
                        t = $.trim(a.html().replace(/\s*<\w+[^>]*>([^<]*)<\/\w+>\s*/g, ' ($1) ').replace(/\W\)/g, ')')),
                        u = this.getMetaByURL.call(this.instance, a.attr('href'), t),
                        h = [
                            '<td>',
                              '<a target="'+(u.internal?'_top':'_blank')+'" title="'+a.text()+'" href="'+(u.internal||u.external)+'">',
                                a.html(),
                              '</a>',
                            '</td>',
                            '<td title="Launch Internal">',
                              (u.internal ? '<a target="_top" href="'+u.internal+'">' : '<span class="text-muted">'),
                                '<i class="fas fa-sign-in-alt"></i>',
                              (u.internal ? '</a>' : '</span>'),
                            '</td>',
                            '<td title="Launch External">',
                              (u.external ? '<a target="_blank" href="'+u.external+'">' : '<span class="text-muted">'),
                                '<i class="fas fa-link"></i>',
                              (u.external ? '</a>' : '</span>'),
                            '</td>',
                            ];

                    return '<tr>' + h.join('') + '</tr>'
                },
                {
                    instance : this,
                    getMetaByURL : function(u, t)
                        {
                            var o = {
                                external : null,
                                internal : null,
                                meta     : null,
                                };

                            if (!/^\.\/\?(.+)$/.test(u)) o.external = u;
                            else
                            {
                                o.internal = './index.html?' + RegExp.$1;

                                o.meta     = $m.master.getMeta(o.internal).url;
                                o.external = _.size(o.meta) ? (/^https?:\/{2}/i.test(o.meta.src) ? o.meta.src : (o.meta.base + o.meta.src)) : null;

                                if (
                                  this.bucket
                                  && !/\|.*$/.test(o.internal))
                                {
                                    o.internal += '|'+this.bucket
                                }

                                if (
                                  $m.master.options.LAUNCHER_ENABLE_TITLE_VAR
                                  && $m.master.options.LAUNCHER_AUTOGEN_TITLE_VARS
                                  && !/&title=.*$/.test(o.internal))
                                {
                                    o.internal += '&title='+encodeURIComponent(t)
                                }
                            }

                            return o
                        },
                }
                );

        return h + r.join('') + f
    },
};
