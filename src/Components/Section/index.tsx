import { h } from 'preact';

type NameValue = { [name: string]: string };

interface SectionProps
{
    paragraphs: string[];
    links: NameValue;
}

function sanitize(text: string)
{
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function sanitizeAttribute(attribute: string) 
{
    return ('' + attribute) /* Forces the conversion to string. */
        .replace(/&/g, '&amp;') /* This MUST be the 1st replacement. */
        .replace(/'/g, '&#39;') /* The 4 other predefined entities, required. */
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function markdown(template: string, links: NameValue)
{
    const IS_URL = '(';
    const expression = /\[(.+?)\](\[|\()(.+?)[\]\)]/g;
    if (template == null)
    {
        return template;
    }

    return sanitize(template).replace(expression, (_, text: string, type: string, link: string) =>
    {
        if (type !== IS_URL)
        {
            link = links && links[link];
        }

        if (link)
        {
            return `<a href="${sanitizeAttribute(link)}">${text}</a>`;
        }
        else
        {
            return text;
        }
    });
}

function getParagraph(text: string, links: NameValue)
{
    const IS_HTML = "!HTML!"
    if (text.substr(0, IS_HTML.length) === IS_HTML)
    {
        text = text.substr(IS_HTML.length);
    }
    else
    {
        text = markdown(text, links);
    }

    return <p dangerouslySetInnerHTML={{ __html: text }} />;
}

export function Section({ paragraphs, links }: SectionProps)
{
    return <section>
        {paragraphs.map(t => getParagraph(t, links))}
    </section>;
}