import { PreferencesRepository } from "./Repositories";

const hosts: { [name: string]: Element } = {};

export function getHost(name: string)
{
    if (!hosts[name])
    {
        hosts[name] = document.createElement('div');
        document.body.appendChild(hosts[name]);
    }

    return hosts[name];
}

export function setHost(name: string, host: Element)
{
    hosts[name] = host;
}

export function applyCookieScripts()
{
    const preferences = PreferencesRepository.load();
    for (let type in preferences)
    {
        if (preferences[type])
        {
            enableScripts(type);
        }
    }
}
export function enableScripts(type: string)
{
    for (const script of document.querySelectorAll<HTMLScriptElement>(`script[data-consent="${type}"]`))
    {
        script.parentNode.replaceChild(enableScript(script), script);
    }
}

function enableScript(script: HTMLScriptElement)
{
    const result = document.createElement('script');
    for(let i = script.attributes.length - 1; i >= 0; i--)
    {
        const {name, value} = script.attributes[i];
        result.setAttribute(name, value);
    }

    result.text = script.text;
    result.setAttribute('data-original-consent', result.getAttribute('data-consent'));
    result.removeAttribute('data-consent')
    result.removeAttribute('type');
    return result;
}