$(document).ready(
    function()
    {
        switch (Number($m.getView()))
        {
            case 0:
            $m.extend(
                'sandbox_theme_outer',
                DigitalSandboxThemeOuter,
                {},
                function() {
                    if (this.onload) this.onload()
                    }
                );
            break;

            case 1:
            $m.extend(
                'sandbox_theme_inner',
                DigitalSandboxThemeInner,
                {},
                function() {
                    if (this.onload) this.onload()
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

function DigitalSandboxThemeOuter(meta)
{
    this._options();
    this._html();
    this._vars();
    this._init();
};

DigitalSandboxThemeOuter.prototype =
{
    _options : function(){},
    _html    : function(){},
    _vars    : function(){},
    _init    : function(){},
    onload   : function(){},
};

/*
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
*/

function DigitalSandboxThemeInner(meta)
{
    this._options();
    this._html();
    this._vars();
    this._init();
};

DigitalSandboxThemeInner.prototype =
{
    _options : function(){},
    _html    : function(){},
    _vars    : function(){},
    _init    : function(){},
    onload   : function(){},
};
