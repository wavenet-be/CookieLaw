import { Labels, getLabels, getCategories } from "../../labels";

export interface CookieCategory
{
    code: string;
    title: string;
    tabTitle?: string;
    description: string[];
    cookies?: { [name: string]: string };
    consent?: boolean;
    required?: boolean;
    cleaning?: string[];
}

export interface Links
{
    [link: string]: string;
}

export interface CookieLawSettings
{
    locale?: string;
    labels: Labels;
    changePreferences?: string;
    categories: CookieCategory[];
    links: Links;
    storage?: 'local' | 'cookie';
    isOptOut?: boolean;
    licence?: boolean;
    defaultCheckboxState?: boolean;
}

let settings: CookieLawSettings;
const defaultCategories = ['introduction', 'strictly-necessary', 'functionality', 'tracking', 'more_information'];
export function loadSettings(cb: (settings:CookieLawSettings)=>void)
{
    function fill()
    {
        settings.defaultCheckboxState = settings.defaultCheckboxState ?? true;
        settings.locale = settings.locale || document.querySelector('html').lang;
        settings.labels = {...getLabels(settings.locale), ...settings.labels};
        settings.categories = getCategories(settings.locale, settings.categories || defaultCategories);
        settings.storage == settings.storage || 'local';
        cb(settings);
    }

    if (!settings)
    {
        const settingsElement = document.getElementById('CookieLaw') as HTMLScriptElement;
        if (settingsElement && settingsElement.src)
        {
            fetch(settingsElement.src)
                .then(r => r.json())
                .then(s => 
                {
                    settings = s;
                    fill();
                });
        }
        else if (settingsElement)
        {
            settings = JSON.parse(settingsElement.textContent);
            fill();
        }
    }
    else
    {
        cb(settings);
    }
}

export function getSettings(): CookieLawSettings
{
    if (settings)
    {
        return settings;
    }

    throw Error("No CookieLaw settings loaded.");
}