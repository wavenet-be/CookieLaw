import { PreferencesRepository } from "./Repositories";

let hosts: { [name: string]: Element } = {};

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
    let preferences = PreferencesRepository.load();
    for (var type in preferences)
    {
        if (preferences[type])
        {
            enableScripts(type);
        }
    }
}

export function enableScripts(type: string)
{
    const scripts: NodeListOf<HTMLScriptElement> = document.querySelectorAll(`script[data-consent="${type}"]`);
    for (let i = 0, c = scripts.length; i < c; i++)
    {
        var script = scripts[0];
        script.parentNode.replaceChild(enableScript(script), script);
    }
}

function enableScript(script: HTMLScriptElement)
{
    const result = document.createElement('script');
    for(let i = script.attributes.length - 1; i >= 0; i--)
    {
        var attribute = script.attributes[i];
        result.setAttribute(attribute.name, attribute.value);
    }

    result.text = script.text;
    result.setAttribute('data-original-consent', result.getAttribute('data-consent'));
    result.removeAttribute('data-consent')
    result.removeAttribute('type');
    return result;
}