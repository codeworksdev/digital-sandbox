/*!
 * Digital Sandbox v1.3.1 (https://github.com/codeworksdev/digital-sandbox)
 * Copyright (c) 2016 CODEWORKS <guru@codeworksnyc.com>
 * Licensed under the MIT license
 */

Mochi_init = function(instance)
{
};

/*
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
*/

$(document).ready(
    function(event)
    {
        switch (Number($m.getView()))
        {
            case 0:
            $m.extend(
                'wrapper',
                DigitalSandboxWrapper
                );
            break;

            case 1:
            $m.extend(
                'apps',
                DigitalSandboxApps,
                function() {
                    this.onload()
                    }
                );
            break;
        }
    }
    );

/*
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
*/

function DigitalSandboxWrapper()
{
    this._vars();
    this._toolbar();
    this._init();
};

DigitalSandboxWrapper.prototype =
{
    _vars : function()
    {
        this.ver = {
            date    : '2016-08-17',
            number  : '1.3.1',
            product : 'Digital Sandbox',
            type    : 'final'
            };

        this.ver.str = this.ver.product+' v'+this.ver.number+'-'+this.ver.date.replace(/\D/g,'')+'-'+this.ver.type;
        this.href    = window.location.href;
        this.url     = {};
        this.iframe  = $('#inner-content > iframe');

        if (/^([^\?]+)(?:\?([^\?]*))?$/.test(this.href))
        {
            this.url.dir   = RegExp.$1;
            this.url.query = RegExp.$2;
            this.url.type  = /^https?:\/\//i.test(this.url.query) ? 'ext' : 'int';
            this.url.src   = './apps.html';

            switch (this.url.type)
            {
                case 'ext':
                this.url.src = this.url.query;
                break;

                case 'int':
                if (/^([\w-:]+)(?:\/([\w-:]*))?$/.test(this.url.query))
                {
                    this.url.index = RegExp.$2 || 'index';
                    this.url.app   = RegExp.$1.replace(/\:/g,'/');
                    this.url.ext   = 'html';
                    this.url.src   = './frontend/apps/'+this.url.app+'/'+this.url.index+'.'+this.url.ext;
                }
                break;
            }
        }
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
        this.iframe.attr(
            'src',
            this.url.src
            );
    }
};

/*
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
*/

function DigitalSandboxApps()
{
    this._vars();
};

DigitalSandboxApps.prototype =
{
    _vars : function()
    {
        this.container = $m.content.find('#apps');
        this.cols      = this.container.find('.row > [class^="col-"][data-widgetize="yes"]');
        this.widget    = this.container.attr('data-widget');
    },

    onload : function()
    {
        this.cols.each(
            function(i)
            {
                if (
                  $m.apps.widget
                  && /^\w+$/.test($m.apps.widget))
                {
                    $m.apps['widget_'+$m.apps.widget](this,i)
                }
            }
            );
    },

    widget_accordion : function(col,i)
    {
        var col     = $(col),
            id      = 'accordion'+i,
            wrapper = ['<div class="panel-group" id="'+id+'" role="tablist" aria-multiselectable="true">','</div>'],
            groups  = col.find('ul[title]'),
            h       = [],
            i       = 0,
            g;

        while (g = groups[i++])
        {
            h.push(
                this.widget_accordion_group2html(
                    g, id, i
                    )
                );
        }

        col.html(
              wrapper[0]
            + h.join('')
            + wrapper[1]
            );
    },

    widget_accordion_group2html : function(group,id,n)
    {
        var g = $(group),
            i = 0,
            l = g.length,
            h = [],
            o;

        while (i < l)
        {
            o           = {};
            o.container = $(g[i++]);
            o.title     = o.container.attr('title');
            o.apps      = o.container.find('a[href]');
            o.n         = n;

            h.push(
                  '<div class="panel panel-default">'
                +   '<div class="panel-heading" role="tab" id="'+id+'-heading'+o.n+'">'
                +     '<h4 class="panel-title">'
                +       '<a class="collapsed" role="button" data-toggle="collapse" data-parent="#'+id+'" href="#'+id+'-collapse'+o.n+'" aria-expanded="false" aria-controls="'+id+'-collapse'+o.n+'">'
                +         o.title
                +       '</a>'
                +     '</h4>'
                +   '</div>'
                +   '<div id="'+id+'-collapse'+o.n+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="'+id+'-heading'+o.n+'">'
                +     '<div class="panel-body">'
                +       '<table class="table table-striped table-condensed">'
                +         '<tbody>'
                );

            _.each(
                o.apps,
                function(e)
                {
                    e = $(e);

                    h.push(
                          '<tr>'
                        +   '<td>'
                        +     '<a target="'+(e.attr('target')?e.attr('target'):'_top')+'" title="'+e.text()+'" href="'+e.attr('href')+'">'
                        +       e.html()
                        +     '</a>'
                        +   '</td>'
                        +   '<td class="text-right">'
                        +     '<a target="_top" title="Launch" href="'+e.attr('href')+'"><i class="fa fa-fw fa-external-link"></i></a>'
                        +   '</td>'
                        + '</tr>'
                        );
                }
                );

            h.push(
                          '</tbody>'
                +       '</table>'
                +     '</div>'
                +   '</div>'
                + '</div>'
                );
        }

        return h.join('')
    }
};

/*
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
*/

function DigitalSandboxToolbar()
{
    this._vars();
    this._html();
};

DigitalSandboxToolbar.prototype =
{
    _vars : function()
    {
        this.options = {

            buttons : {
                refresh  : 'Refresh Window',
                qrefresh : 'Quick Refresh',
                reload   : 'Refresh App',
                device   : 'Device Mode',
                rotate   : 'Orientation',
                launch   : 'Index',
                about    : 'About'
                }
            };
    },

    _html : function()
    {
        $m.container.prepend(
              '<div id="toolbar">'
            + '  <div id="inner-toolbar"></div>'
            + '</div>'
            );
    },

    onload : function()
    {
        _.each(
            this.options.buttons,
            function(v,k)
            {
                $('#inner-toolbar').append(
                    '<span data-button="'+k+'" title="'+v+'"></span>'
                    );

                switch (k)
                {
                    case 'device':
                    $m.extend(
                        k,
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
            $('#inner-toolbar').find('> [data-button]'),
            function() {
                $m.toolbar.select(this)
                }
            );
    },

    select : function(button)
    {
        var b = _.isElement(button) ? $(button) : button,
            k = b.attr('data-button'),
            f = 'do'+window.s.capitalize(k);

        this[f](b)
    },

    doRefresh  : function(b){window.location.reload(true)},
    doReload   : function(b){$m.wrapper.iframe.attr('src',$m.wrapper.iframe.attr('src'))},
    doQrefresh : function(b){try{$m.wrapper.iframe[0].contentWindow.location.reload()}catch(e){alert('This feature is not available in offline mode.')}},
    doLaunch   : function(b){window.location.href=window.location.href.replace(/^([^\?]+)(\?.*)?$/,'$1');$m.wrapper.iframe.attr('src','./apps.html')},
    doDevice   : function(b){$m.device.open(b)},
    doRotate   : function(b){$m.device.rotate()},
    doAbout    : function(b){alert($m.wrapper.ver.str)}
};

/*
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
*/

function DigitalSandboxDevice()
{
    this._vars();
    this._html();
};

DigitalSandboxDevice.prototype =
{
    _vars : function()
    {
        this.options = {

            buttons : {
                default       : 'Default',
                fullscreen    : 'Full Screen',
                ipad          : 'iPad',
                ipad_air      : 'iPad Air',
                ipad_mini     : 'iPad Mini',
                ipad_pro_9_7  : 'iPad Pro 9.7-inch',
                ipad_pro_12_9 : 'iPad Pro 12.9-inch',
                iphone_5s     : 'iPhone 5',
                iphone_6plus  : 'iPhone 6 Plus',
                galaxy_s5     : 'Galaxy S5',
                nexus_7       : 'Nexus 7',
                nexus_10      : 'Nexus 10'
                },

            container_id : 'device-menu'
            };
    },

    _html : function()
    {
        this.container = $('#inner-toolbar [data-button="device"]').append(
              '<div id="'+this.options.container_id+'">'
            + '  <div id="inner-'+this.options.container_id+'">'
            + '    <span data-action="exit"></span>'
            + '  </div>'
            + '</div>'
            ).find('#'+this.options.container_id);
    },

    onload : function()
    {
        _.each(
            this.options.buttons,
            function(v,k)
            {
                var id = 'inner-'+$m.device.options.container_id;

                $('#'+id).append(
                    '<span data-button="'+k+'"><span>'+v+'</span></span>'
                    );

                switch (k)
                {
                    case 'default':
                    $('#'+id+' [data-button="'+k+'"]').addClass('selected');
                    break;
                }
            }
            );

        $m.onClick(
            $('#inner-'+this.options.container_id).find('[data-button]'),
            function() {
                $m.device.select(this)
                }
            );

        $m.onClick(
            $('#inner-'+this.options.container_id).find('[data-action]'),
            function() {
                $m.device.action(this)
                }
            );
    },

    select : function(button)
    {
        var b = _.isElement(button) ? $(button) : button,
            k = b.attr('data-button'),
            f = 'do_'+k,
            s = b.hasClass('selected');

        if (!s)
        {
            $('#inner-'+this.options.container_id+' [data-button="'+k+'"]').addClass('selected');
            $('#inner-'+this.options.container_id+' :not([data-button="'+k+'"])').removeClass('selected');
            $m.body.attr('data-device',k);
        }
    },

    action : function(button)
    {
        var b = _.isElement(button) ? $(button) : button,
            k = b.attr('data-action'),
            f = k;

        this[f]()
    },

    rotate : function()
    {
        var a = 'data-orientation',
            o = $m.body.attr(a),
            v = !o ? 'l' : (o == 'l' ? 'p' : 'l');

        $m.body.attr(a,v)
    },

    open  : function(){if(!this.container.hasClass('open'))this.container.addClass('open')},
    close : function(){this.container.removeClass('open')},
    exit  : function(){setTimeout(function(){$m.device.close()},50)}
};
