import { Banner, PreferencesDialog } from './Components';
import { PreferencesRepository, getSettings, loadSettings, IUserConsent } from './Repositories';
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
    loadSettings(settings =>
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
    
        const userConsent: IUserConsent = {stored:false};
        PreferencesRepository.load(userConsent);
        if (!userConsent.stored)
        {
            Banner.show();
        }
    
        applyCookieScripts();
    });
});