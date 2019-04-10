import { Labels, getLabels } from "../../labels";

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

export interface CookieLawSettings
{
    locale?: string;
    labels: Labels;
    changePreferences?: string;
    categories: CookieCategory[]
}

let settings: CookieLawSettings;
export function getSettings(): CookieLawSettings
{
    if (settings)
    {
        return settings;
    }

    const settingsElement = document.getElementById('CookieLaw');
    if (!settingsElement)
    {
        return null;
    }

    settings = JSON.parse(settingsElement.textContent);
    settings.locale = settings.locale || document.querySelector('html').lang;
    settings.labels = {...getLabels(settings.locale), ...settings.labels};
    return settings;
}