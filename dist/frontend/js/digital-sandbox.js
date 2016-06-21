/*!
 * Digital Sandbox v1.2 (https://github.com/precisionforvalue/digital-sandbox)
 * Copyright (c) 2016 Carlos M. Bonilla <carlos.bonilla@precisionforvalue.com>
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
                DigitalSandboxApps
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
            date    : '2016-06-20',
            number  : '1.2.0',
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
                    this.url.app   = RegExp.$1.replace(/\:/g,'/');
                    this.url.index = RegExp.$2 || 'index';
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
    this._init();
};

DigitalSandboxApps.prototype =
{
    _vars : function()
    {
        this.items = $m.content.find('.items a');
    },

    _init : function()
    {
        this.items.each(
            function()
            {
                var a = $(this),
                    u = a.attr('href');

                if (/^\.\/\?/.test(u))
                {
                    a
                    .attr('target','_top')
                    .on(
                        'click',
                        function(event)
                        {
                            var e = $(this),
                                h = {new : e.attr('href')};

                            try
                            {
                                h.old = window.parent.location.href;

                                event.preventDefault();

                                if (window.frameElement)
                                {
                                    window.parent.location.replace(h.new)
                                }
                                else
                                {
                                    window.location.replace(
                                        /^(\.\/)(.+)$/.test(h.new)
                                          ? (RegExp.$1 + 'index.html' + RegExp.$2)
                                          : h.new
                                        );
                                }
                            }
                            catch(Exception)
                            {
                                if (!/^https?:\/\//i.test(h.new))
                                {
                                    e.attr(
                                        'href',
                                        h.new = h.new.replace(/\?\d+/,'')
                                        );

                                    if (/^(\.\/)(?:index\.html)?(\?.+)$/.test(h.new))
                                    {
                                        e.attr(
                                            'href',
                                            h.new = RegExp.$1 + 'index.html?' + Math.floor(Date.now()/1000) + RegExp.$2
                                            );
                                    }
                                }
                            }
                        }
                        );
                }
            }
            );
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
                refresh : 'Refresh Window',
                reload  : 'Refresh iFrame/App',
                device  : 'Device Mode',
                rotate  : 'Orientation',
                launch  : 'Index',
                about   : 'About'
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

    doRefresh : function(b){window.location.reload(true)},
    doReload  : function(b){$m.wrapper.iframe.attr('src',$m.wrapper.iframe.attr('src'))},
    doLaunch  : function(b){$m.wrapper.iframe.attr('src','./apps.html')},
    doDevice  : function(b){$m.device.open(b)},
    doRotate  : function(b){$m.device.rotate()},
    doAbout   : function(b){alert($m.wrapper.ver.str)}
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
                default      : 'Default',
                fullscreen   : 'Full Screen',
                ipad         : 'iPad',
                iphone_5s    : 'iPhone 5',
                iphone_6plus : 'iPhone 6 Plus',
                galaxy_s5    : 'Galaxy S5',
                nexus_7      : 'Nexus 7',
                nexus_10     : 'Nexus 10'
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
