import { PreferencesRepository, getSettings } from "./Repositories";

const hosts: { [name: string]: Element } = {};

export function getHost(name: string)
{
    if (!hosts[name])
    {
        hosts[name] = document.getElementById(name);
        if (!hosts[name])
        {
            hosts[name] = document.createElement('div');
            document.body.appendChild(hosts[name]);
        }
    }

    return hosts[name];
}

export function setHost(name: string, host: Element)
{
    hosts[name] = host;
}

export function applyPreferences()
{
    const preferences = PreferencesRepository.load();
    const categories = getSettings().categories;
    for (let type in preferences)
    {
        if (preferences[type])
        {
            enableScripts(type);
        }
        else
        {
            for(let cookieName of categories.find(c => c.code === type)?.cleaning ?? [])
            {
                document.cookie = `${cookieName}=;path=/;max-age=0`;
            }
        }
    }
}

function enableScripts(type: string)
{
    for (const script of document.querySelectorAll<HTMLScriptElement>(`script[data-consent="${type}"]`))
    {
        script.parentNode.replaceChild(enableScript(script), script);
    }
}

function enableScript(script: HTMLScriptElement)
{
    let result: HTMLElement;
    if (script.type !== "text/html")
    {
        let newScript = result = document.createElement('script');
        newScript.text = script.text;
    }
    else
    {
        result = document.createElement('cookielaw-placeholder');
        result.innerHTML = script.text;
    }

    // copy attributes.
    for(const {name, value} of script.attributes)
    {
        result.setAttribute(name, value);
    }

    result.removeAttribute('data-consent')
    result.removeAttribute('type');
    result.setAttribute('data-original-consent', script.dataset.consent);
    return result;
}