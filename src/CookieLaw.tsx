import { Banner, PreferencesDialog } from './Components';
import { PreferencesRepository } from './Repositories';
import { applyCookieScripts } from './helper';

window.cookieLaw = Banner.show;
window.cookieLawPreferences = PreferencesDialog.show;

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

document.body.addEventListener('click', function (e)
{
    if (isMatch(e.target as Element, '#OpenPref'))
    {
        e.preventDefault();
        window.cookieLawPreferences();
    }
});

let preferences = PreferencesRepository.load();
if (!Object.getOwnPropertyNames(preferences).length)
{
    Banner.show();
}

applyCookieScripts();