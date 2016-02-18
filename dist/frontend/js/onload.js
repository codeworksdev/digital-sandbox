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
    this._init();
};

DigitalSandboxWrapper.prototype =
{
    _vars : function()
    {
        this.href   = window.location.href;
        this.url    = {};
        this.iframe = $('#content > iframe');

        if (/^([^#]+)(?:#([^#]*))?$/.test(this.href))
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
                if (/^(\w+)(?:\/(\w*))?$/.test(this.url.query))
                {
                    this.url.app   = RegExp.$1;
                    this.url.index = RegExp.$2 || 'index';
                    this.url.ext   = 'html';
                    this.url.src   = './frontend/apps/'+this.url.app+'/'+this.url.index+'.'+this.url.ext;
                }
                break;
            }
        }
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
                $(this)
                  .attr('target','_top')
                  .on(
                    'click',
                    function(event)
                    {
                        event.preventDefault();

                        var e = $(this),
                            h = e.attr('href');

                        if (window.frameElement)
                        {
                            window.parent.location.replace(h);
                            window.parent.location.reload(true);
                        }
                        else
                        {
                            window.location.replace(h)
                        }
                    }
                    );
            }
            );
    }
};
