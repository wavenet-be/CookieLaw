import { Banner, PreferencesDialog } from './Components';
import { PreferencesRepository, getSettings } from './Repositories';
import { applyCookieScripts } from './helper';

window.cookieLaw = Banner.show;
window.cookieLawPreferences = PreferencesDialog.show;

if (!Object.entries)
{
    Object.entries = function (obj)
    {
        var ownProps = Object.keys(obj),
            i = ownProps.length,
            resArray = new Array(i); // preallocate the Array
        while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];

        return resArray;
    };
}

if (!Element.prototype.matches) 
{
    let prototype: any = Element.prototype;
    prototype.matches = prototype.msMatchesSelector || prototype.webkitMatchesSelector;
}

function isMatch(node: Element, css: string): boolean
{
    if (!node || node == document.body)
    {
        return false;
    }

    return node.matches(css) || isMatch(node.parentElement, css);
}

let settings = getSettings();
if (settings)
{
    if (settings.changePreferences)
    {
        document.body.addEventListener('click', function (e)
        {
            if (isMatch(e.target as Element, settings.changePreferences))
            {
                e.preventDefault();
                window.cookieLawPreferences();
            }
        });
    }

    let preferences = PreferencesRepository.load();
    if (!Object.getOwnPropertyNames(preferences).length)
    {
        Banner.show();
    }

    applyCookieScripts();
}
