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
    licence?: boolean;
}

let settings: CookieLawSettings;
const defaultCategories = ['introduction', 'strictly-necessary', 'functionality', 'tracking', 'more_information'];
export function getSettings(): CookieLawSettings
{
    if (settings)
    {
        return settings;
    }

    const settingsElement = document.getElementById('CookieLaw');
    settings = settingsElement ? JSON.parse(settingsElement.textContent) : {};
    settings.locale = settings.locale || document.querySelector('html').lang;
    settings.labels = {...getLabels(settings.locale), ...settings.labels};
    settings.categories = getCategories(settings.locale, settings.categories || defaultCategories);
    return settings;
}