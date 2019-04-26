import { Banner, PreferencesDialog } from './Components';
import { PreferencesRepository, getSettings } from './Repositories';
import { applyCookieScripts } from './helper';
import './polyfills';

window.cookieLaw = Banner.show;
window.cookieLawPreferences = PreferencesDialog.show;

function isMatch(node: Element, css: string): boolean
{
    if (!node || node == document.body)
    {
        return false;
    }

    return node.matches(css) || isMatch(node.parentElement, css);
}

function ready(cb: ()=>void)
{
    if (document.readyState === "loading")
    {
        document.addEventListener('DOMContentLoaded', cb);
    }
    else
    {
        cb();
    }
}

ready(function()
{
    const settings = getSettings();
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
    
        const preferences = PreferencesRepository.load();
        if (!Object.getOwnPropertyNames(preferences).length)
        {
            Banner.show();
        }
    
        applyCookieScripts();
    }
});