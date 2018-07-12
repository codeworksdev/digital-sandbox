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

function mochi_load()       { this.extend( 'master', DigitalSandboxMaster ) };
function mochi_load_view0() { this.extend( 'wrap',   DigitalSandboxWrap   ) };
function mochi_load_view1() { this.extend( 'apps',   DigitalSandboxApps   ) };

/*
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
*/

function DigitalSandboxMaster()
{
    this._vars();
};

DigitalSandboxMaster.prototype =
{
    _vars : function()
    {
        this.ver = {
            date    : '2018-06-18',
            number  : '2.0',
            product : 'Digital Sandbox',
            type    : 'stable'
            };

        this.ver.str = 'v'+this.ver.number+'-'+this.ver.date.replace(/\D/g,'')+'-'+this.ver.type;
        this.regex   = /^([^\?]+)(?:\?([^\?~\|]*))?(?:~(([a-z]\w*)(?::([lp]))?))?(?:\|([a-z\d\-]*))?$/i;
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
            meta.url.bucket      = (function(b){return /^[a-z\d]+(\-[a-z\d]+)*$/i.test(b)?b.toLowerCase():''})(RegExp.$6);
            meta.url.base        = decodeURI($m.__href).replace(/\/[^\/]*$/, '/');
            meta.url.external    = Boolean(/^https?:\/\//i.test(meta.url.query));
            meta.url.src         = 'apps.html'+(meta.url.bucket?('?'+meta.url.bucket):'');

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
        (function()
        {
            var i = 'DigitalSandboxModalAbout',
                h = [
                '<div class="modal fade" id="'+i+'" tabindex="-1" role="dialog" aria-labelledby="'+i+'Label" aria-hidden="true">',
                  '<div class="modal-dialog modal-dialog-centered" role="document">',
                    '<div class="modal-content">',
                      '<div class="modal-header">',
                        '<h5 class="modal-title" id="'+i+'Label">',
                          '<span class="text-muted"><i class="fas fa-info-circle"></i></span>',
                        '</h5>',
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">',
                          '<span aria-hidden="true">&times;</span>',
                        '</button>',
                      '</div>',
                      '<div class="modal-body text-center py-5">',
                        '<p><strong>'+$m.master.ver.product+'</strong> <span class="text-muted">v'+$m.master.ver.number+'</span></p>',
                        '<img src="frontend/img/brand/launcher-icon-4x.png" alt="Logo">',
                      '</div>',
                      '<div class="modal-footer text-right">',
                        '<small class="text-muted">'+$m.master.ver.str+'</small>',
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
        $m.__container.prepend(
              '<div id="toolbar">'
            +   '<div id="inner-toolbar"></div>'
            + '</div>'
            );

        _.each(
            this.options.buttons,
            function(o)
            {
                var t = $('#inner-toolbar'),
                    h = '<div data-button="'+o.slug+'" title="'+o.label+'">'
                      +   '<i class="fa-fw '+o.icon+'"></i>'
                      + '</div>';

                t.append(h)
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
                this.inner.append(
                      '<span data-button="'+k+'">'
                    +   '<span>'+v+'</span>'
                    + '</span>'
                    );

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

        $m.onClick(this.inner.find('[data-button]'), function(){$m.device.select(this)});
        $m.onClick(this.inner.find('[data-action]'), function(){$m.device.action(this)});
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
    this._init();
};

DigitalSandboxApps.prototype =
{
    _vars : function(data)
    {
        this.bucket     = /\?([a-z\d]+(\-[a-z\d]+)*)$/.test(decodeURI($m.__href)) ? RegExp.$1 : '';
        this.container  = $m.__container.find('#apps');
        this.widgetName = this.container.attr('data-widget');
        this.cols       = this.container.find('[class^="col-"]');
    },

    _init : function()
    {
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
            }
        }

        $m.__body.attr('data-ready', 'yes')
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
                        u = (
                            function(u, instance)
                            {
                                var o = {
                                    internal : null,
                                    external : null,
                                    };

                                if (!/^\.\/\?(.+)$/.test(u)) o.external = u;
                                else
                                {
                                    o.internal = './index.html?' + RegExp.$1;
                                    o.meta     = $m.master.getMeta(o.internal).url;
                                    o.external = _.size(o.meta)
                                        ? (/^https?:\/\//i.test(o.meta.src) ? o.meta.src : (o.meta.base + o.meta.src))
                                        : null;

                                    if (
                                      instance.bucket
                                      && !/\|.*$/.test(o.internal))
                                    {
                                        o.internal += '|'+instance.bucket
                                    }
                                }

                                return o
                            }
                            )(a.attr('href'), this),
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
                this
                );

        return h + r.join('') + f
    },
};
